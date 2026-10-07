// @ts-ignore
import { isPlainObject } from 'is-plain-object';
import mustache from 'mustache';
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
export function provideValue(template, data) {
    const ast = mustache.parse(template);
    if (ast.length === 1 && ast[0]?.[0] === 'text') {
        // It doesn't have a variable
        return template;
    }
    const noDataResult = mustache.render(template, {});
    const result = mustache.render(template, data);
    // Assume variables are empty in the template if it matched.
    if (noDataResult === result) {
        return;
    }
    return result;
}
/**
 * Applies Mustache template rendering to all string values within a rule configuration,
 * including the rule's value, options, and reason fields.
 *
 * @param rule - The rule configuration containing potential template strings
 * @param data - Key-value pairs for template variable replacement
 * @returns The rule with all template strings rendered, or `undefined` if rendering fails
 */
export function exchangeValueOnRule(rule, data) {
    if (isRuleConfigValue(rule)) {
        return exchangeValue(rule, data);
    }
    let result = cleanOptions(rule);
    if (result.value != null) {
        result = {
            ...result,
            value: exchangeValue(result.value, data),
        };
    }
    const options = extractOptions(result);
    if (options != null && options !== '' && options !== 0) {
        const newOptions = exchangeOption(options, data);
        result = {
            ...result,
            ...(newOptions == null
                ? undefined
                : {
                    options: newOptions,
                }),
        };
    }
    if (result.reason != null) {
        const exchangedValue = exchangeValue(result.reason, data);
        result = {
            ...result,
            reason: exchangedValue == null ? undefined : `${exchangedValue}`,
        };
    }
    deleteUndefProp(result);
    return result;
}
/**
 * Normalizes a rule configuration by extracting the standard fields
 * (`severity`, `value`, `options`, `reason`) and removing `undefined` properties.
 * Also handles the deprecated `option` field by mapping it to `options`.
 *
 * @param rule - The rule configuration to normalize
 * @returns A clean rule configuration with only defined properties
 */
export function cleanOptions(rule) {
    const res = {
        severity: rule.severity,
        value: rule.value,
        options: extractOptions(rule),
        reason: rule.reason,
    };
    deleteUndefProp(res);
    return res;
}
/**
 * Type guard that checks whether a value is a {@link RuleConfigValue}
 * (i.e. a primitive, `null`, or an array) rather than a full {@link RuleConfig} object.
 *
 * @param v - The value to check
 * @returns `true` if `v` is a rule config value (string, number, boolean, null, or array)
 */
export function isRuleConfigValue(v) {
    switch (typeof v) {
        case 'string':
        case 'number':
        case 'boolean': {
            return true;
        }
    }
    if (v === null) {
        return true;
    }
    return Array.isArray(v);
}
/**
 * Removes all properties with `undefined` values from a plain object in-place.
 * Has no effect on non-plain-object values.
 *
 * @param obj - The object to clean up
 */
export function deleteUndefProp(obj) {
    if (!isPlainObject(obj)) {
        return;
    }
    for (const key in obj) {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    }
}
/**
 * Return options from `options` or `option`
 *
 * @param rule
 * @returns
 */
function extractOptions(rule) {
    if ('options' in rule && rule.options != null) {
        return rule.options;
    }
    if ('option' in rule && rule.option != null) {
        return rule.option;
    }
}
function exchangeValue(rule, data) {
    if (rule == null) {
        return rule;
    }
    if (typeof rule === 'string') {
        return provideValue(rule, data);
    }
    if (Array.isArray(rule)) {
        const ruleArray = rule
            .map(val => {
            if (typeof val === 'string') {
                return provideValue(val, data);
            }
            return val;
        })
            .filter((item) => item !== undefined);
        return ruleArray.length > 0 ? ruleArray : undefined;
    }
    return rule;
}
function exchangeOption(optionValue, data) {
    if (optionValue == null) {
        return optionValue;
    }
    if (typeof optionValue === 'boolean' || typeof optionValue === 'number') {
        return optionValue;
    }
    if (typeof optionValue === 'string') {
        return provideValue(optionValue, data);
    }
    if (isArray(optionValue)) {
        return optionValue.map(v => exchangeOption(v, data));
    }
    const result = {};
    for (const key of Object.keys(optionValue)) {
        result[key] = exchangeOption(optionValue[key], data);
    }
    return result;
}
/**
 * Array.isArray for ReadonlyArray
 *
 * > Array.isArray type narrows to any[] for ReadonlyArray<T>
 *
 * @see https://github.com/microsoft/TypeScript/issues/17002
 *
 * @param value
 * @returns
 */
function isArray(value) {
    return Array.isArray(value);
}
