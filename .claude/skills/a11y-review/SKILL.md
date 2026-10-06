---
name: a11y-review
description: Review and fix accessibility issues in this site's Nunjucks templates and components (semantic HTML, ARIA, keyboard/focus, alt text) — use when adding/editing markup in src/html or when asked for an accessibility pass.
---

Use this when writing or editing anything under `src/html/`, when the user asks for an accessibility/a11y review, or when a new interactive component (tab, popup, menu, form) is being built out.

## Context specific to this project

- Templating is Nunjucks (`src/html/_templates`, `src/html/pages`), output is static HTML — there's no JS framework doing runtime a11y work for you (no React/Vue a11y linting, no automatic ARIA from a component library). Every ARIA attribute and keyboard handler has to be written by hand in the `.njk` templates and `src/js/*.js`.
- `gulp-htmlhint` runs on every `html` task build (`gulpfile.js`), but there's no `.htmlhintrc` in the repo, so it's running on htmlhint's defaults — it does not currently catch missing `alt`, missing form labels, or other a11y issues. Don't assume a clean `npx gulp html` run means the markup is accessible.
- The README's own TODO list has `markuplint 적용: 테스트중` (adopting `markuplint` was tried but not finished) — there is no automated a11y linter wired into the build. Treat every review as manual until/unless the user asks to actually install one.
- Interactive component styles already exist for `tab`, `popup`, `menu`, `login`, `forms`, `alert`, `nodata` (`src/scss/components/_*.scss`), but as of this skill's writing `component.njk` (the component showcase page) is still an empty placeholder — the actual markup patterns for these are being built incrementally. When one of these gets real markup for the first time, get the ARIA pattern right from the start rather than retrofitting later.

## Known existing gaps (fix opportunistically when touching these files)

- `src/html/_templates/_macro/_macro.njk`: the shared image macro hardcodes `alt=""` on every image regardless of content — meaningful images rendered through this macro currently have no alt text. The macro should accept an `alt` param (defaulting to `""` only for genuinely decorative images).
- `src/html/_templates/_include/_bottomutil.njk`: `goto_top` and `quick_menu_wrap` are plain `<div>`s with inline `style="display: none"`, presumably toggled by JS. As interactive, clickable controls they should be `<button type="button">` elements (native focusability + keyboard activation + correct role), not `<div>`s — a `<div onclick>` needs `role="button"`, `tabindex="0"`, and manual Enter/Space key handling to be equivalent, which is more code for a worse result than just using `<button>`.
- `src/html/_templates/_include/_header.njk`: the logo is `<strong id="home">` wrapping the link — consider whether it should carry heading semantics (`<h1>` on the homepage, `<p>`/`<div>` on subpages, per the "one `<h1>` per page" convention) rather than `<strong>`. The nav loop over `gnb_data` has no `aria-current="page"` on the active link.

## Review checklist for new/edited markup

- **Semantic HTML first.** Reach for `<button>`, `<nav>`, `<label for>`, `<fieldset>`/`<legend>` before adding ARIA roles to generic `<div>`/`<span>` — native elements get keyboard support and screen-reader semantics for free; ARIA-on-`<div>` requires you to reimplement all of it by hand and is easy to get subtly wrong.
- **Images** (`<img>`, including anything through the `_macro.njk` image helper): meaningful images need real `alt` text describing content/purpose; purely decorative images get `alt=""` (never omit `alt` entirely).
- **Forms** (`_forms.scss`/`_login.scss` markup): every input needs an associated `<label for="id">` (or `aria-label`); validation/error text needs `aria-describedby` pointing at the input, and the error region should be announced (`aria-live="polite"` or `role="alert"` on the message container).
- **Tabs** (`_tab.scss`): tablist container `role="tablist"`, each tab `role="tab"` + `aria-selected` (true/false) + `aria-controls` pointing at its panel, each panel `role="tabpanel"` + `aria-labelledby` pointing back at its tab. Arrow-key navigation between tabs, not just click.
- **Popups/modals** (`_popup.scss`): `role="dialog"` + `aria-modal="true"` + `aria-labelledby`/`aria-label`; trap focus inside while open; `Escape` closes it; focus returns to the trigger element on close, not lost to `<body>`.
- **Menu/toggle controls** (`_menu.scss`, `_bottomutil.njk`'s `quick_menu_wrap`): the toggle button needs `aria-expanded` (true/false) reflecting open state and `aria-controls` pointing at the menu it opens.
- **Nav landmarks**: if a page ends up with more than one `<nav>` (e.g. the header's primary nav plus a footer nav or the quick menu), each needs a distinguishing `aria-label` so screen readers can tell them apart.
- **Color/contrast**: when adding a new color to `src/scss/components/_varient.scss`'s CSS custom properties or a new Tailwind utility combination for text, sanity-check WCAG AA contrast (4.5:1 normal text, 3:1 large text/UI components) against the background it's actually used on — several of the existing `--g0N` grays are close to the `--bg`/`--background` values and easy to get wrong.

## Verification

There's no automated a11y check in this build — verify manually:
- Keyboard-only pass: `Tab`/`Shift+Tab` reaches every interactive element in a sensible order, `Enter`/`Space` activates buttons/links, `Escape` closes anything dismissible, arrow keys work within tabs/menus if applicable, and focus is never visibly lost (check `:focus-visible` styling isn't suppressed).
- Run `npx gulp html` and skim the rendered output in `dist/` for the specific attributes above — htmlhint passing is not sufficient, it isn't checking any of this.
- If the user wants this automated going forward, the options are: add `markuplint` (already half-adopted per the README TODO — check `markuplint.config.js`-style config if resuming that), add htmlhint's accessibility-focused rules if any exist for the current version, or introduce a dedicated tool like `axe-core`/`pa11y` as a new gulp task. Don't add any of these unasked — this project's build is intentionally lean.
