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
- There is no real test suite — `npm test` is the npm placeholder (`echo "Error: no test specified" && exit 1`). Do not add a testing framework unless asked; there's no existing convention to follow.
- No lint/format npm scripts exist; stylelint, csscomb, jshint, and prettier all run only as gulp pipeline steps or via editor integration, not standalone CLI commands.

## Architecture: task pipeline and path mapping

Everything lives in one file, `gulpfile.js`. Source is `src/`, output is `dist/` (gitignored, not present until built). Task → path mapping:

| Task | Source | Destination | Notes |
|---|---|---|---|
| `compileSass` | `src/scss/**/*.scss` | `dist/common/css/` (+ `.min.css`, map in `dist/common/css/maps`) | Pipeline: sourcemaps init → `compileScss` (custom `Transform` calling modern `sass.compileString()` directly, not `gulp-sass` — see below) → `csscomb` (property ordering, see `.csscomb.json`) → `postcss([tailwindcss, autoprefixer])` → write unminified `.css` (no map) → `postcss([cssnano])` (via `gulp-postcss` + the plain `cssnano` package, not `gulp-cssnano`) → rename `.min.css` → `sourcemaps.write('./maps')` → write `.min.css` + map. Stylelint is NOT in this PostCSS chain anymore (see `lintSass`). Note `postcss.config.js` is NOT used by this task; the gulp pipeline builds its own PostCSS plugin array inline. |
| `lintSass` | `src/scss/**/*.scss` | (none) | Runs stylelint on the SCSS sources via its Node API, prints the report, and fails the task on any error (so the default build stops). Empty placeholder partials are allowed (`block-no-empty`, `no-empty-source` are off in `.stylelintrc.json`). Also run before `compileSass` in the scss watcher. |
| `html` | `src/html/pages/**/*.njk` (excludes `_templates`) | `dist/*.html` (flat) | Data comes from `src/html/_templates/_json/_sitedata.json`. Nunjucks include path is `src/html/_templates`. Also runs `htmlhint` and `gulp-pretty-html`. |
| `copyImage` / `minimage` | `src/images/**/*` | `dist/common/images/` | `copyImage` is a plain copy of files newer than `dist/common/images/` (`newer({ dest })`) (used in the default series); `minimage` additionally runs `sharp`-based compression for jpg/jpeg/png via the `compressImage` transform. |
| `minifyScripts` | `src/js/*.js` (top-level only, not `lib/`) | `dist/common/js/` (+ `.min.js`, maps in `dist/common/js/maps`) | Concats all top-level scripts into `all.js`, runs `jshint` (build fails on lint errors — see `.jshintrc`), then terser for the `.min.js` (terser errors fail the task). |
| `copyScript` | `src/js/lib/**/*` | `dist/common/js/lib/` | Raw copy, no processing — third-party bundles (jQuery, Swiper, Chart.js, AOS, etc). |
| `copyFont` | `src/fonts/*` | `dist/common/fonts/` | Raw copy. |
| `cacheBust` / `sitemap` | `dist/**/*.html` | `dist/` | Self-referential post-build passes; must run after `html`/full build, not part of default series. |

Default task (`npx gulp`) = `series(copyFont, copyImage, copyScript, lintSass, compileSass, minifyScripts, html, syncFiles)`. `syncFiles` starts browser-sync serving `./dist` (unmatched routes 302 to `/404.html`) and wires `gulp.watch` for images/scss+njk/js back into the relevant task + reload.

When adding a new asset type or page, follow this same source→gulp-task→dist pattern rather than introducing a new build tool.

## Config quirks worth knowing before touching build config

- `minifyScripts` merges `src/js/*.js` into `all.js` in file-path order (`sortByPath`); prefix filenames with `01_`, `02_` when order matters. `src/js/lib/` is never merged.
- `browserslist` in `package.json` is `defaults, not dead` (no IE11); restore `ie >= 11` there if a project still needs it.
- `html` renders Nunjucks with `autoescape: false` on purpose (trusted repo content, allows raw HTML in variables).
- `src/js/lib/` jQuery: only `jquery-3.5.1.min.js` and jQuery UI 1.14.2 are kept; 1.x jQuery and UI 1.12.1 were removed for known XSS advisories. Check new bundles with `npm audit` (in a scratch dir) before adding.

- Every task must `return` its gulp stream (or a promise). Calling `done()` right after starting a stream makes `series` proceed before the stream finishes and hides errors.

- `postcss.config.js` (ESM `export default`) exists standalone but is not the config actually used during the gulp build (see `compileSass` above) — it's likely only consulted by editor tooling.
- Tailwind's `content` globs `./src/html/**/*.{html,njk}`, so new Tailwind class usage must live under `src/html/`.
- `gulpfile.js` does NOT use `gulp-sass` — it's stuck on Dart Sass's deprecated legacy JS API (`render`/`renderSync`) with no fixed release, so `compileScss` (in `gulpfile.js`) is a custom `Transform` calling `sass.compileString()` directly, feeding the result through `vinyl-sourcemaps-apply` for sourcemap compatibility. It also skips `_`-prefixed partial files, matching `gulp-sass`'s old behavior.
- `src/scss/style.scss` uses `@use`, not `@import`, for its component partials — Sass requires `@use`/`@forward` to be the first statements in a file, so the three `@tailwind base/components/utilities;` directives that used to sit above the imports were moved into their own partial (`src/scss/components/_tailwind.scss`) and pulled in via `@use './components/tailwind';` as the *first* `@use` line, to preserve the original Tailwind-then-components cascade order. Keep new partials on `@use`/`@forward`, not `@import`.
- `pnpm-workspace.yaml`'s `overrides` block force-bumps several old transitive devDependencies (`lodash`, `minimatch`, `node-uuid`, `postcss`, `uuid`) pulled in by unmaintained packages (`csscomb`, `jshint`, `gulp-notify`'s `node-notifier`) to patch known CVEs, without touching their major version (checked CJS/ESM compatibility before overriding). `browser-sync`'s bundled `immutable@3.8.3` (high-severity, via `browser-sync-ui`) is deliberately left un-overridden — bumping it to v4 breaks `browser-sync`'s server startup (`server.get is not a function`) due to a dual-instance mismatch between `browser-sync` core and `browser-sync-ui`. Low real-world risk since it's a localhost-only dev server.
- `gulp-notify` is pinned to `^5.0.0` (not v4) specifically to drop its old `lodash.template` dependency (unpatched Command Injection CVE, no fixed version ever released) in favor of full `lodash@^4.17.21`. This changed the supported template delimiter: the `html` task's `notify.onError(...)` call must use lodash's standard `<%= error.message %>` interpolate syntax — the old `<%== error.message %>` (double `=`) syntax silently breaks under gulp-notify v5's template engine (throws inside the notifier, though the build itself doesn't crash).
- `@babel/core`, `@babel/preset-env`, and `gulp-babel` were removed — they were unused devDependencies (no babel task ever existed in `gulpfile.js`) that only added dead attack surface (Dependabot alerts on transitive babel plugins). Don't re-add babel tooling unless a task actually needs to transpile JS.
- `js-yaml`, `node-uuid`, and `ws` used to be direct devDependencies with loose `>=` ranges (all three added together in one old "Fix github security" commit) purely to nudge npm's resolver toward patched transitive copies — none were ever imported by our own code. They've been removed; the actual transitive copies (via `stylelint`/`cosmiconfig`, `csscomb`, and `browser-sync`/`socket.io` respectively) already resolve to safe versions on their own (or, for `node-uuid`, via the `pnpm-workspace.yaml` override). Don't re-add a top-level pin as a way to force a transitive version — use `pnpm-workspace.yaml`'s `overrides` instead.

## Commit conventions

A commit message template is configured via `.gitmessage.txt` (wired into `.git/config`'s `[commit] template`). Follow its type prefixes, matching the existing history: `Feat`, `Fix`, `Docs`, `Style`, `Design`, `Refactor`, `Rename`, `Remove`, `Test` — e.g. `Feat sitemap`, `Fix github security`. Commit bodies in this repo's history are written in Korean; match that convention unless the user asks otherwise.
