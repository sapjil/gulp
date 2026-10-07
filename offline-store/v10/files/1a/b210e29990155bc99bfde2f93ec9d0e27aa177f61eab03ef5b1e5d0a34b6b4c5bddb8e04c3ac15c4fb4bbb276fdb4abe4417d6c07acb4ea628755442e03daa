/** The rule value: either a single attribute name or an array of required attribute descriptors. */
type RequiredAttributes = string | (string | Attr)[];
/**
 * Descriptor for a required attribute with an optional set of allowed values.
 */
type Attr = {
    /** The attribute name that is required. */
    name: string;
    /** One or more allowed values for the attribute, if constrained. */
    value?: string | string[];
};
/**
 * Rule that validates elements have all required attributes.
 *
 * Checks both HTML-spec-defined required attributes and custom required attributes
 * specified in the rule configuration. Also validates that required attribute values
 * match expected patterns when value constraints are provided.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<RequiredAttributes, undefined>>;
export default _default;
