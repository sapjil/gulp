import { matched, unmatched } from './match-result.js';
/**
 * Checks whether a value matches one of the allowed enumeration values.
 *
 * By default, comparison is case-insensitive and surrounding spaces are not allowed.
 * These behaviors can be configured through the type definition.
 *
 * @param value - The string value to check
 * @param type - The enum type definition containing the allowed values and options
 * @param ref - Optional reference URL for the unmatched result
 * @returns The validation result
 */
export function checkEnum(value, type, ref) {
    const disallowToSurroundBySpaces = type.disallowToSurroundBySpaces ?? true;
    const caseInsensitive = type.caseInsensitive ?? true;
    if (!disallowToSurroundBySpaces) {
        value = value.trim();
    }
    let values = [...type.enum];
    if (caseInsensitive) {
        value = value.toLowerCase();
        values = type.enum.map(v => v.toLowerCase());
    }
    const res = values.includes(value);
    if (res) {
        return matched();
    }
    return unmatched(value, 'doesnt-exist-in-enum', {
        ref,
        expects: type.enum.map(value => ({ type: 'const', value })),
    });
}
