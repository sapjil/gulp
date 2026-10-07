import { getSpec } from '../../utils/get-spec.js';
const cachesBySpecs = new Map();
/**
 * Retrieves the permitted content model for an element. Evaluates any conditional
 * content models based on the element's current attributes (e.g., different content
 * models for `<ol>` vs `<ol reversed>`). Results are cached per element and spec set.
 *
 * @param el - The DOM element to retrieve the content model for
 * @param specs - The element specifications containing content model definitions
 * @returns The permitted content patterns array, a boolean (true for any content, false for no content), or null if no spec exists
 */
export function getContentModel(
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
el, specs) {
    const cacheByEl = cachesBySpecs.get(specs) ?? new Map();
    const cached = cacheByEl.get(el);
    if (cached !== undefined) {
        return cached;
    }
    const spec = getSpec(el, specs);
    if (!spec) {
        cacheByEl.set(el, null);
        return null;
    }
    const conditions = spec.contentModel.conditional ?? [];
    for (const cond of conditions) {
        if (el.matches(cond.condition)) {
            cacheByEl.set(el, cond.contents);
            return cond.contents;
        }
    }
    cacheByEl.set(el, spec.contentModel.contents);
    return spec.contentModel.contents;
}
