import type { Type, Result } from './types.js';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Validates a string value against a specified type definition using
 * the built-in HTML and CSS type definitions.
 *
 * This is the primary entry point for type checking in the @markuplint/types package.
 * It delegates to {@link checkBase} with the combined set of HTML and CSS definitions.
 *
 * @param value - The string value to validate
 * @param type - The type definition to validate against
 * @param ref - An optional reference identifier used for error reporting context
 * @param cache - Whether to use cached results for repeated checks with the same inputs
 * @returns A result indicating whether the value matches the type, or details about the mismatch
 */
export declare function check(value: string, type: ReadonlyDeep<Type>, ref?: string, cache?: boolean): Result;
