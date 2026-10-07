import type { Result } from './types.js';
import type { Number as TypeNumber } from './types.schema.js';
/**
 * Checks whether a value matches a number type definition.
 *
 * Validates the value as either an integer or float, then checks range
 * constraints (gt, gte, lt, lte) if defined. Supports clampable values
 * that suggest the nearest valid boundary value as a candidate.
 *
 * @param value - The string value to check
 * @param type - The number type definition with format and range constraints
 * @param ref - Optional reference URL for the unmatched result
 * @returns The validation result
 */
export declare function checkNumber(value: string, type: Readonly<TypeNumber>, ref?: string): Result;
