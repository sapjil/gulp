/** Configuration options for the doctype rule. */
type Option = {
    /** Whether to report obsolete doctypes that include a public or system identifier. */
    denyObsoleteType: boolean;
};
/**
 * Rule that validates the presence and correctness of the document's DOCTYPE
 * declaration.
 *
 * Reports an error when no DOCTYPE is found (skipped for document fragments)
 * and when an obsolete DOCTYPE (one with a public or system identifier) is
 * declared.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<"always", Option>>;
export default _default;
