import type { AttributeType } from '@markuplint/ml-spec';
/**
 * Configuration options for the `invalid-attr` rule.
 */
type Option = {
    /**
     * @since 3.7.0
     */
    allowAttrs?: (string | Attr)[] | Record<string, ValueRule>;
    /**
     * @since 3.7.0
     */
    disallowAttrs?: (string | Attr)[] | Record<string, ValueRule>;
    /** Attribute name prefix(es) to ignore during validation. */
    ignoreAttrNamePrefix?: string | string[];
    /** Whether to allow additional properties for pretender elements (defaults to `true`). */
    allowToAddPropertiesForPretender?: boolean;
    /**
     * @deprecated Since version 3.7.0. Use `allowAttrs` or `disallowAttrs` instead.
     * This option (`attr`) is now considered ambiguous and may lead to confusion.
     * Please use the more explicit `allowAttrs` or `disallowAttrs` option
     * to specify allowed attributes for the `invalid-attr` rule.
     * @see {@link Option.allowAttrs}
     * @see {@link Option.disallowAttrs}
     */
    attrs?: Record<string, ValueRule | {
        disallowed: true;
    }>;
};
/**
 * Describes a single attribute with its name and expected value constraint.
 */
type Attr = {
    /** The attribute name. */
    name: string;
    /** The expected attribute value type or validation rule. */
    value: AttributeType | ValueRule;
};
/**
 * A validation constraint for an attribute value, defined as either an
 * enumerated list, a regex pattern, or a spec-based type.
 */
type ValueRule = {
    enum: [string, ...string[]];
} | {
    pattern: string;
} | {
    type: AttributeType;
};
/**
 * Rule that validates attributes against the HTML spec, allowed lists,
 * and disallowed lists.
 *
 * Checks each attribute for: existence in the spec, correct value type,
 * allowed/disallowed overrides from configuration, and typo suggestions
 * via candidate matching. Supports `allowAttrs`, `disallowAttrs`, and
 * the deprecated `attrs` option. Non-existent attributes on elements that
 * allow additional properties (pretenders) can be optionally permitted.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<boolean, Option>>;
export default _default;
