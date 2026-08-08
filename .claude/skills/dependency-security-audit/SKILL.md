---
name: dependency-security-audit
description: Triage and fix pnpm/Dependabot dependency vulnerabilities in this gulp build-tool repo — root-cause each finding, decide override vs. replace vs. accept, and verify the build still works.
---

Use this when the user pastes a Dependabot alert, asks to run a security audit, or asks to fix a `pnpm audit` finding in this repo.

## Context specific to this project

- Package manager is **pnpm** (`pnpm-lock.yaml` + `pnpm-workspace.yaml`). There is no `package-lock.json` anymore.
- Dependabot alerts frequently reference the *old, deleted* `package-lock.json`. Before doing anything else, check whether the finding is already resolved in the current `pnpm-lock.yaml` — most pasted alerts turn out to be stale.
- This is a devDependency-only static-site build tool (no `dependencies`, nothing shipped to end users). Real-world exploitability of a finding should factor in whether it's build-time-only, local-dev-only (e.g. `browser-sync`), or genuinely reachable.

## Workflow

1. **Check if it's already fixed.** For the flagged package, run:
   ```
   pnpm why <package>
   ```
   Compare the resolved version(s) against the alert's "Patched version". If everything resolved is already >= patched, the alert is stale (old lockfile) — say so, don't touch anything, and suggest the user commit/push so GitHub re-scans and auto-closes it.

2. **If genuinely vulnerable, find the root cause**, not just the symptom:
   - `pnpm why <package>` shows the dependency chain(s) pulling it in.
   - If it's pulled in by a thin/abandoned wrapper package that has a modern direct alternative already used elsewhere in the stack (e.g. `gulp-cssnano` → replaced with `cssnano` + the already-present `gulp-postcss`; `gulp-imagemin` → replaced with `sharp` via a custom `Transform`; `gulp-sass` → replaced with `sass.compileString()` directly), prefer that replacement over a version override — it eliminates the whole vulnerable subtree instead of patching one leaf.
   - If it's a direct devDependency in `package.json` with a loose `>=` range that isn't actually imported anywhere in `gulpfile.js`/`src/` (`grep -rn "<pkg>" gulpfile.js src/`), it's likely a stale "pin a top-level package just to force resolution" fix from a past commit (see `git log -S'"pkg": ">=..."' -- package.json` to confirm the pattern). Remove it — dead weight, not needed.

3. **If a version bump is the right fix**, check compatibility before overriding:
   - Check `npm view <pkg>@<version> type main --json` for both the vulnerable and target version — a jump from CJS to `"type": "module"` (ESM-only) will break old `require()`-based consumers with `ERR_REQUIRE_ESM` (this happened with `@xhmikosr/decompress`, which is why `gulp-imagemin` was replaced instead of patched).
   - Add the fix to `pnpm-workspace.yaml`'s `overrides:` block (NOT `package.json`'s `pnpm.overrides` — this repo's pnpm version only honors overrides in `pnpm-workspace.yaml` once that file exists). Scope the override to just the vulnerable range when other parts of the tree intentionally use a newer major, e.g.:
     ```yaml
     overrides:
       postcss@<8.5.26: ^8.5.26
       minimatch@<3.1.4: ^3.1.4
     ```
   - Run `pnpm install`, then `pnpm why <pkg>` again to confirm the override actually took effect (it silently won't if placed in the wrong file).

4. **Verify nothing broke** — `pnpm audit` passing is not sufficient proof. Actually run the affected gulp tasks:
   ```
   rm -rf dist
   npx gulp compileSass && npx gulp html && npx gulp minifyScripts && npx gulp sitemap && npx gulp minimage
   ```
   For changes touching `browser-sync` specifically, start `syncFiles` in the background for a few seconds and confirm it doesn't crash (see the `immutable` override attempt below for why this matters — a clean `pnpm audit` said nothing about the runtime crash).
   For CSS/output-affecting changes, diff file sizes/content against a known-good baseline where feasible (e.g. via `git stash` to rebuild the pre-change state) rather than assuming "no errors printed" means "unchanged output".

5. **If the safe fix breaks something and no upstream release exists**, revert the override and accept the risk explicitly — don't leave it silently unfixed. Document in `CLAUDE.md`'s "Config quirks" section: what's vulnerable, why it can't be fixed, and why the residual risk is acceptable. Example already in this repo: `browser-sync`'s bundled `immutable@3.8.3` — overriding to v4 crashes browser-sync's server (`server.get is not a function`); browser-sync's latest release still hard-pins `immutable: ^3`; accepted because it's a localhost-only dev server with no untrusted-input path into the vulnerable code.

6. **Update `CLAUDE.md`** whenever a fix changes a task's implementation, a template/config file format requirement (e.g. gulp-notify v5 dropping support for `<%== %>` delimiters), or adds a new override — future sessions (and future Dependabot alerts) need that context to avoid re-litigating the same investigation.

## Don't

- Don't blanket-override a package version without checking who else in the tree depends on the *old* major intentionally.
- Don't add a new direct `package.json` devDependency just to nudge transitive resolution — use `pnpm-workspace.yaml overrides` instead (see step 3 for why the old direct-pin approach was removed from this repo).
- Don't report a fix as done without re-running the actual gulp tasks.
