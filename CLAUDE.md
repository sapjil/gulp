# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static-site build pipeline built on Gulp 5 for `sapjil.net`. There is no backend/server code and no JS framework — pages are HTML/CSS/JS assembled from Nunjucks templates, Sass, and Tailwind, all orchestrated by a single `gulpfile.js`. There is no runtime `dependencies` entry in `package.json`; everything is a devDependency used only at build time.

Package manager is **pnpm** (`pnpm-lock.yaml` + `pnpm-workspace.yaml` are the source of truth; there is no `package-lock.json`). Use `pnpm install` / `pnpm add` / `pnpm audit`, not `npm`/`npx` for dependency management — `npx gulp ...` is still fine for running gulp tasks themselves.

## Commands

- `npx gulp` — full build + dev server (default task): copies fonts/images/js libs, compiles Sass, bundles/minifies JS, renders HTML, starts browser-sync on `./dist` with file watchers, then reload on change.
- `npx gulp minimage` — compress `src/images/**/*` (jpg/jpeg/png via `sharp`) into `dist/common/images/`; other extensions pass through uncompressed. A compressed output is only written if it's smaller than the source (see `compressImage` in `gulpfile.js`).
- `npx gulp sitemap` — generate `dist/sitemap.xml` from built HTML (siteUrl is hardcoded to `https://sapjil.net` in `gulpfile.js`).
- `npx gulp cacheBust` — rewrite `cache_bust=<n>` query params in `dist/**/*.html` to the current timestamp; not part of the default series, run manually after a build.
- `npx gulp lintHtml` — HTML lint with `markuplint` 4.x (Node API `exec`) over the **built** `dist/**/*.html`, so run `npx gulp html` first (listing both in one `npx gulp a b` call runs them in parallel). Config: `.markuplintrc.json` (`markuplint:recommended` + `@markuplint/nunjucks-parser` + `img` requires `src`/`alt`). Prints `file:line:col severity message (rule)` and fails the task on any `error`. It is deliberately NOT in the default series: the current templates still have 5 known findings (`index.njk` `<img width="200px" height="auto">`; no `<h1>` in `component`, `base`, `info`), kept as-is on purpose. `npx markuplint "dist/**/*.html"` runs the same check from the CLI. Do not lint `src/**/*.njk` (layout/include fragments give false positives such as orphaned end tags). `markuplint` 5.x needs Node >=24, so stay on 4.x for Node 20/22. Tune `invalid-attr` through `nodeRules` (per selector) or `options.attrs`; a top-level `rules: { "invalid-attr": false }` does not turn it off. The old `markuplintTask` (`gulp-markuplint`, last release 2022, peer `markuplint@0.x`) was removed.
- There is no real test suite — `npm test` is the npm placeholder (`echo "Error: no test specified" && exit 1`). Do not add a testing framework unless asked; there's no existing convention to follow.
- No lint/format npm scripts exist; stylelint, csscomb, jshint, and prettier all run only as gulp pipeline steps or via editor integration, not standalone CLI commands.

## Architecture: task pipeline and path mapping

Everything lives in one file, `gulpfile.js`. Source is `src/`, output is `dist/` (gitignored, not present until built). Task → path mapping:

| Task | Source | Destination | Notes |
|---|---|---|---|
| `compileSass` | `src/scss/**/*.scss` | `dist/common/css/` (+ `.min.css`, map in `dist/common/css/maps`) | Pipeline: `gulp.src(..., { sourcemaps: true })` (gulp 5 built-in; `gulp-sourcemaps` was removed) → `compileScss` (custom `Transform` calling modern `sass.compileString()` directly, not `gulp-sass` — see below) → `csscomb` (property ordering, see `.csscomb.json`) → `postcss([tailwindcss, autoprefixer])` → write unminified `.css` (no map) → `postcss([cssnano])` (via `gulp-postcss` + the plain `cssnano` package, not `gulp-cssnano`) → rename `.min.css` → `dest(..., { sourcemaps: 'maps' })` writes `.min.css` + map. Stylelint is NOT in this PostCSS chain anymore (see `lintSass`). Note `postcss.config.js` is NOT used by this task; the gulp pipeline builds its own PostCSS plugin array inline. |
| `lintSass` | `src/scss/**/*.scss` | (none) | Runs stylelint on the SCSS sources via its Node API, prints the report, and fails the task on any error (so the default build stops). Empty placeholder partials are allowed (`block-no-empty`, `no-empty-source` are off in `.stylelintrc.json`). Also run before `compileSass` in the scss watcher. |
| `html` | `src/html/pages/**/*.njk` (excludes `_templates`) | `dist/*.html` (flat) | Data comes from `src/html/_templates/_json/_sitedata.json`. Nunjucks include path is `src/html/_templates`. Also runs `htmlhint` and `gulp-pretty-html`. |
| `copyImage` / `minimage` | `src/images/**/*` | `dist/common/images/` | `copyImage` is a plain copy of files newer than `dist/common/images/` (`newer({ dest })`) (used in the default series); `minimage` additionally runs `sharp`-based compression for jpg/jpeg/png via the `compressImage` transform. |
| `minifyScripts` | `src/js/*.js` (top-level only, not `lib/`) | `dist/common/js/` (+ `.min.js`, maps in `dist/common/js/maps`) | Concats all top-level scripts into `all.js`, runs `jshint` (build fails on lint errors — see `.jshintrc`), then terser for the `.min.js` (terser errors fail the task). |
| `copyScript` | `src/js/lib/**/*` | `dist/common/js/lib/` | Raw copy, no processing — third-party bundles (jQuery, Swiper, Chart.js, AOS, etc). |
| `copyFont` | `src/fonts/*` | `dist/common/fonts/` | Raw copy. |
| `cacheBust` / `sitemap` | `dist/**/*.html` | `dist/` | Self-referential post-build passes; must run after `html`/full build, not part of default series. |

Default task (`npx gulp`) = `series(copyFont, copyImage, copyScript, lintSass, compileSass, minifyScripts, html, syncFiles)`. `syncFiles` starts browser-sync serving `./dist` (unmatched routes 302 to `/404.html`) and wires `gulp.watch` for images/scss+njk/js back into the relevant task + reload.

When adding a new asset type or page, follow this same source→gulp-task→dist pattern rather than introducing a new build tool.

## Project policies (deliberate decisions — don't revert without asking)

- **Browser support**: `browserslist` in `package.json` is `defaults, not dead`. IE11 and Android 4 are NOT supported; autoprefixer no longer emits `-ms-` / old `-webkit-` prefixes. A project that still needs them must add `ie >= 11` / `Android >= 4` back to `browserslist` and rebuild.
- **Lint fails the build**: `lintSass` (stylelint) and `jshint` errors stop the build; they are not warnings. Empty placeholder SCSS partials are allowed (`block-no-empty`, `no-empty-source` are off in `.stylelintrc.json`).
- **Task contract**: every gulp task returns its stream/promise (see quirks below); never go back to `done()`-immediately tasks.
- **Nunjucks `autoescape: false`**: intentional (trusted repo content, raw HTML allowed in variables). Never feed untrusted/external input into templates.
- **Third-party libs (`src/js/lib/`)**: only versions without known advisories are kept. jQuery: `jquery-3.5.1.min.js` only (1.x removed); jQuery UI: 1.14.2 full build (1.12.1 removed). Check any new or upgraded bundle with `npm audit` in a scratch dir before adding it.
- **Tailwind breakpoints**: `tailwind.config.js` overrides `theme.screens` with `sm 480 / md 768 / lg 976 / xl 1440`; the default `2xl` does not exist.
- **Placeholder site data**: `_sitedata.json` keys `fbAppId`, `fbAdmins`, `gtm`, `twitterSite`, `optImage` are unused by the templates, and `base_url` (`localhost`) is rendered into `<base href>`. Replace them per project.
- **Dependency policy**: pnpm only; transitive CVEs are handled via `pnpm-workspace.yaml` `overrides`, not by adding top-level pins.

## Config quirks worth knowing before touching build config

- `minifyScripts` merges `src/js/*.js` into `all.js` in file-path order (`sortByPath`); prefix filenames with `01_`, `02_` when order matters. `src/js/lib/` is never merged.

- Every task must `return` its gulp stream (or a promise). Calling `done()` right after starting a stream makes `series` proceed before the stream finishes and hides errors.

- `postcss.config.js` (ESM `export default`) exists standalone but is not the config actually used during the gulp build (see `compileSass` above) — it's likely only consulted by editor tooling.
- Tailwind's `content` globs `./src/html/**/*.{html,njk}`, so new Tailwind class usage must live under `src/html/`.
- `gulpfile.js` does NOT use `gulp-sass` — it's stuck on Dart Sass's deprecated legacy JS API (`render`/`renderSync`) with no fixed release, so `compileScss` (in `gulpfile.js`) is a custom `Transform` calling `sass.compileString()` directly, feeding the result through `vinyl-sourcemaps-apply` into the `file.sourceMap` that gulp 5's built-in sourcemaps create. It also skips `_`-prefixed partial files, matching `gulp-sass`'s old behavior.
- `src/scss/style.scss` uses `@use`, not `@import`, for its component partials — Sass requires `@use`/`@forward` to be the first statements in a file, so the three `@tailwind base/components/utilities;` directives that used to sit above the imports were moved into their own partial (`src/scss/components/_tailwind.scss`) and pulled in via `@use './components/tailwind';` as the *first* `@use` line, to preserve the original Tailwind-then-components cascade order. Keep new partials on `@use`/`@forward`, not `@import`.
- `pnpm-workspace.yaml`'s `overrides` block force-bumps several old transitive devDependencies (`lodash`, `minimatch`, `node-uuid`, `postcss`, `uuid`, `postcss-selector-parser@<7.1.6`) pulled in by unmaintained packages (`csscomb`, `jshint`, `gulp-notify`'s `node-notifier`, `tailwindcss` 3) or by `markuplint` (`@markuplint/selector` brings `postcss-selector-parser@7.1.1`, which has two advisories — the widened `<7.1.6` range covers it) to patch known CVEs (checked CJS/ESM compatibility before overriding; the `postcss-selector-parser` override was verified by a byte-identical `style.css` before/after). Most other advisories are fixed just by `pnpm update` within the existing `package.json` ranges — run it first when `pnpm audit` reports something.
- `gulp-sourcemaps` was removed (gulp 5 has built-in sourcemaps via `src`/`dest` options). Reason: its `css` → `source-map-resolve` → `decode-uri-component` chain is vulnerable (GHSA-vcc3-ghjq-m6fr) and the patched `decode-uri-component@0.5.0` is ESM-only, so it could not be overridden for a CJS `require()` consumer. Side effects vs. the old output: `sourceMappingURL` comment is appended on the same line, and the map's `file` field is `style.min.css` instead of `../style.min.css` (browsers ignore it).
- **Accepted risk**: `braces@3.0.3` (high, GHSA-vfj7-8cjw-p6xm, stack exhaustion via deeply nested brace patterns) via `browser-sync` → `chokidar@3`. No patched release exists (`pnpm audit` lists none). Accepted because it only runs in the localhost dev server and glob patterns come from our own `gulpfile.js`, never from untrusted input. Re-check with `pnpm audit` periodically and drop this note once a fix ships. (`browser-sync`'s bundled `immutable` is no longer a problem: it resolves to 3.8.4 now.)
- `gulp-notify` is pinned to `^5.0.0` (not v4) specifically to drop its old `lodash.template` dependency (unpatched Command Injection CVE, no fixed version ever released) in favor of full `lodash@^4.17.21`. This changed the supported template delimiter: the `html` task's `notify.onError(...)` call must use lodash's standard `<%= error.message %>` interpolate syntax — the old `<%== error.message %>` (double `=`) syntax silently breaks under gulp-notify v5's template engine (throws inside the notifier, though the build itself doesn't crash).
- `@babel/core`, `@babel/preset-env`, and `gulp-babel` were removed — they were unused devDependencies (no babel task ever existed in `gulpfile.js`) that only added dead attack surface (Dependabot alerts on transitive babel plugins). Don't re-add babel tooling unless a task actually needs to transpile JS.
- `js-yaml`, `node-uuid`, and `ws` used to be direct devDependencies with loose `>=` ranges (all three added together in one old "Fix github security" commit) purely to nudge npm's resolver toward patched transitive copies — none were ever imported by our own code. They've been removed; the actual transitive copies (via `stylelint`/`cosmiconfig`, `csscomb`, and `browser-sync`/`socket.io` respectively) already resolve to safe versions on their own (or, for `node-uuid`, via the `pnpm-workspace.yaml` override). Don't re-add a top-level pin as a way to force a transitive version — use `pnpm-workspace.yaml`'s `overrides` instead.

## `offline` branch

`offline` is branched from `dev` and carries an `offline-store/` (pnpm content-addressable store, format `v10`, built with `pnpm fetch`) **and the pnpm 10.28.0 that built it** (`offline-tools/pnpm`), so the exact locked packages install without network and without any pnpm on the PC. Commands (run with **npm**, never with the PC's pnpm):

- `npm run offline:install` — `scripts/offline-install.mjs`: removes a `node_modules` made with another store, then runs the bundled pnpm `install --offline --frozen-lockfile --store-dir offline-store`.
- `npm run offline:fetch` — online PC only; downloads into `offline-store.tmp` and swaps it in only on success, so a failed run leaves the old store intact. Run it whenever `pnpm-lock.yaml` changes and commit `offline-store/` together with the lockfile.
- `npm run pnpm -- <args>` — runs the bundled pnpm (`update`, `add -D x`, `audit`, ...).

Why the bundled pnpm: a PC-wide pnpm 11+/12 runs `pnpm install` (online, default `v11` store, supply-chain policy check) before every `pnpm run`, which loops on registry retries offline and cannot read the `v10` store. `verifyDepsBeforeRun: false` in `pnpm-workspace.yaml` stops that auto install even when someone uses `pnpm run`. Never merge the offline setup (`offline-store/`, `offline-tools/`, `scripts/offline-*.mjs`, `scripts/_pnpm.mjs`, `scripts/pnpm.mjs`, `.gitattributes`, `supportedArchitectures` and `verifyDepsBeforeRun` in `pnpm-workspace.yaml`, `OFFLINE.md`) back into `dev`/`main`. Caveats (Node version, supported platforms, Windows path length and CRLF) and a step-by-step guide are in `OFFLINE.md`.

## Commit conventions

A commit message template is configured via `.gitmessage.txt` (wired into `.git/config`'s `[commit] template`). Follow its type prefixes, matching the existing history: `Feat`, `Fix`, `Docs`, `Style`, `Design`, `Refactor`, `Rename`, `Remove`, `Test` — e.g. `Feat sitemap`, `Fix github security`. Commit bodies in this repo's history are written in Korean; match that convention unless the user asks otherwise.
