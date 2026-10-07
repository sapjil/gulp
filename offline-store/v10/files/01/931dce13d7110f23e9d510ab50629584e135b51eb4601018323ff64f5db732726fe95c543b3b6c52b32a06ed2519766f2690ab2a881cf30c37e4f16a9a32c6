/**
 * Configuration options for the no-empty-palpable-content rule.
 */
type Options = {
    /** Whether to extend checking to exposable elements beyond standard palpable content. */
    extendsExposableElements?: boolean;
    /** Whether to ignore elements marked with `aria-busy="true"`. */
    ignoreIfAriaBusy?: boolean;
};
/**
 * Rule that warns when palpable content elements are empty.
 *
 * Palpable content elements are expected to have visible or meaningful content.
 * This rule reports elements that contain only whitespace text nodes, while
 * excluding elements that are naturally empty (e.g., `<textarea>`, `<video>`)
 * or have a nothing content model.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<boolean, Options>>;
export default _default;
