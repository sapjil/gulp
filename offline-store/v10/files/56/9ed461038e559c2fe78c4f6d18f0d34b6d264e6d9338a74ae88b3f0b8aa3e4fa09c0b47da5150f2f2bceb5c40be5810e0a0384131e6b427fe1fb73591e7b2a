import type { Defs, Result } from './types.js';
import type { List } from './types.schema.js';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Checks a value as a separated list of tokens against a type definition.
 *
 * Parses the value into tokens based on the list separator configuration,
 * then validates each individual token against the list's token type.
 *
 * @param value - The string value to check as a list
 * @param type - The list type definition containing separator and token type
 * @param defs - The type definitions registry for resolving nested types
 * @param ref - Optional reference URL for the unmatched result
 * @param cache - Whether to use cached results (defaults to `true`)
 * @returns The validation result
 */
export declare function checkList(value: string, type: ReadonlyDeep<List>, defs: Defs, ref?: string, cache?: boolean): Result;
