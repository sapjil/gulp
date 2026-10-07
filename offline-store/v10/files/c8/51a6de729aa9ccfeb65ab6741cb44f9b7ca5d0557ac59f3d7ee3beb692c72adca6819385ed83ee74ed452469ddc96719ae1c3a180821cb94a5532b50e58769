import type { Options } from '../types.js';
import type { AttrChecker } from '@markuplint/ml-core';
import type { ARIAProperty, ARIARole } from '@markuplint/ml-spec';
/**
 * Checks whether the value of an ARIA property or state conforms to its expected type.
 *
 * ARIA properties have specific value types (token, token list, true/false, tristate,
 * integer, number, string, ID reference, etc.). This checker validates the attribute
 * value against the property's expected type and allowed enum values.
 * Role-specific conditional value types are also considered.
 *
 * @param attr - The ARIA attribute node to inspect.
 * @param role - The computed ARIA role, used to resolve conditional value types.
 * @param propSpecs - The list of ARIA property specifications for value type lookup.
 * @param booleanish - Whether the document supports booleanish attribute values (e.g., JSX).
 * @returns A violation if the attribute value does not match the expected type.
 */
export declare const checkingValue: AttrChecker<boolean, Options, {
    role?: ARIARole | null;
    propSpecs: readonly ARIAProperty[];
    booleanish?: boolean;
}>;
/**
 * Validates a raw ARIA value against the expected value type defined in the specification.
 *
 * Supports token, token list, string, ID reference, true/false, tristate,
 * true/false/undefined, integer, and number value types.
 *
 * @see https://www.w3.org/TR/wai-aria-1.2/#propcharacteristic_value
 * @param type - The ARIA value type (e.g., `"token"`, `"true/false"`, `"integer"`).
 * @param value - The raw attribute value to validate.
 * @param tokenEnum - The list of allowed token values for token-based types.
 * @param booleanish - Whether empty string is accepted as a boolean `true` value.
 * @returns `true` if the value is valid for the given type, `false` otherwise.
 */
export declare function checkAriaValue(type: string, value: string, tokenEnum: readonly string[], booleanish?: boolean): boolean;
