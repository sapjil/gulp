import type { AnyRule, AnyRuleV2, PlainData, RuleConfig, RuleConfigV2, RuleConfigValue } from './types.js';
/**
 * Renders a Mustache template with the provided data.
 *
 * Returns `undefined` if the template contains variables but none of them
 * are present in `data`. Returns the template unchanged if it has no variables.
 *
 * @param template - A Mustache template string with `{{variable}}` placeholders
 * @param data - Key-value pairs for template variable replacement
 * @returns The rendered string, or `undefined` if no matching variables were found
 */
export declare function provideValue(template: string, data: Readonly<Record<string, string>>): string | undefined;
/**
 * Applies Mustache template rendering to all string values within a rule configuration,
 * including the rule's value, options, and reason fields.
 *
 * @param rule - The rule configuration containing potential template strings
 * @param data - Key-value pairs for template variable replacement
 * @returns The rule with all template strings rendered, or `undefined` if rendering fails
 */
export declare function exchangeValueOnRule(rule: AnyRule | AnyRuleV2, data: Readonly<Record<string, string>>): AnyRule | undefined;
/**
 * Normalizes a rule configuration by extracting the standard fields
 * (`severity`, `value`, `options`, `reason`) and removing `undefined` properties.
 * Also handles the deprecated `option` field by mapping it to `options`.
 *
 * @param rule - The rule configuration to normalize
 * @returns A clean rule configuration with only defined properties
 */
export declare function cleanOptions(rule: RuleConfig<RuleConfigValue, PlainData> | RuleConfigV2<RuleConfigValue, PlainData>): RuleConfig<RuleConfigValue, PlainData>;
/**
 * Type guard that checks whether a value is a {@link RuleConfigValue}
 * (i.e. a primitive, `null`, or an array) rather than a full {@link RuleConfig} object.
 *
 * @param v - The value to check
 * @returns `true` if `v` is a rule config value (string, number, boolean, null, or array)
 */
export declare function isRuleConfigValue(v: any): v is RuleConfigValue;
/**
 * Removes all properties with `undefined` values from a plain object in-place.
 * Has no effect on non-plain-object values.
 *
 * @param obj - The object to clean up
 */
export declare function deleteUndefProp(obj: any): void;
