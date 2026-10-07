import type { ContentModelResult, Element, Options, TagRule } from './types.js';
/**
 * Top-level entry point for content model validation of a single element.
 * Resolves the element's content model from the spec (possibly augmented
 * by user-defined tag rules), then delegates to `start` to validate
 * the element's child nodes against that model.
 *
 * @param el - The element whose children are to be validated against its content model.
 * @param rules - User-defined tag rules that can override or extend built-in content models.
 * @param options - Validation behavior options (e.g., whether to ignore mutable children).
 * @returns An array of content model results, one per child node issue found (empty if all valid).
 */
export declare function contentModel(el: Element, rules: readonly TagRule[], options: Options): ContentModelResult[];
