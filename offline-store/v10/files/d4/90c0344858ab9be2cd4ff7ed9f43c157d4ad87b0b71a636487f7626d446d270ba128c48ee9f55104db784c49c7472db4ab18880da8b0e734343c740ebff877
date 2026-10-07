import type { Defs, Result } from './types.js';
import type { KeywordDefinedType } from './types.schema.js';
/**
 * Checks a value against a keyword-defined type or CSS syntax type.
 *
 * Looks up the type in the definitions registry and validates the value.
 * If the type is not found in custom definitions, falls back to CSS syntax matching.
 * Results are cached by default for performance.
 *
 * @param value - The string value to check
 * @param type - The keyword type identifier to look up
 * @param defs - The type definitions registry
 * @param cache - Whether to use cached results (defaults to `true`)
 * @returns The validation result
 */
export declare function checkKeywordType(value: string, type: KeywordDefinedType, defs: Defs, cache?: boolean): Result;
