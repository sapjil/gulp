import type { Result } from './types.js';
import type { Enum } from './types.schema.js';
import type { ReadonlyDeep } from 'type-fest';
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
export declare function checkEnum(value: string, type: ReadonlyDeep<Enum>, ref?: string): Result;
