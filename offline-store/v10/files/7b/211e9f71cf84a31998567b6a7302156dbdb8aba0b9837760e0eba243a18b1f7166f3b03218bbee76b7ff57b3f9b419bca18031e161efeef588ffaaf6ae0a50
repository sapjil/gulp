import type { MLMLSpec } from '../../types/index.js';
/**
 * Determines whether an element is considered palpable content. Palpable elements
 * are those that render something visible or meaningful to the user. Optionally
 * extends the check to include SVG renderable elements and other exposable elements
 * that do not belong to any standard content model category.
 *
 * @param el - The DOM element to check
 * @param specs - The full markup language specification
 * @param options - Optional flags to extend the palpable check
 * @param options.extendsSvg - Whether to include SVG renderable elements (defaults to true)
 * @param options.extendsExposableElements - Whether to include additional exposable elements like `<li>`, `<td>`, etc. (defaults to false)
 * @returns `true` if the element is considered palpable content
 */
export declare function isPalpableElement(el: Element, specs: MLMLSpec, options?: {
    readonly extendsSvg?: boolean;
    readonly extendsExposableElements?: boolean;
}): boolean;
