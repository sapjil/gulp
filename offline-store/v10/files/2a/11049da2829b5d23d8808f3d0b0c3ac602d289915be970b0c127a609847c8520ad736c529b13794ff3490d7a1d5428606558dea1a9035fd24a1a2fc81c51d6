/**
 * Configuration options for the required-element rule.
 */
type Options = {
    /** Whether to skip validation for elements that contain mutable (dynamic) content. */
    ignoreHasMutableContents: boolean;
    /** Whether to ignore omitted (ghost) elements that are implicitly created by the HTML parser. */
    ignoreOmittedElements: boolean;
};
/**
 * Rule that validates required child elements are present.
 *
 * Accepts an array of CSS selectors as the rule value. For the document level,
 * reports if any matching element is missing from the entire document. For
 * element-level overrides, checks that the specified child elements exist
 * among the element's direct children.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<string[], Options>>;
export default _default;
