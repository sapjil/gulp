import type { Result, Directive, Defs } from './types.js';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Checks a value against a directive type definition.
 *
 * A directive type consists of a prefix pattern (string or regex) followed by
 * a token value. This function extracts the token portion after the directive
 * prefix and validates it against the token type.
 *
 * @param value - The string value to check
 * @param type - The directive type definition containing directive patterns and token type
 * @param defs - The type definitions registry for resolving nested types
 * @param ref - Optional reference URL for the unmatched result
 * @param cache - Whether to use cached results (defaults to `true`)
 * @returns The validation result
 */
export declare function checkDirective(value: string, type: ReadonlyDeep<Directive>, defs: Defs, ref?: string, cache?: boolean): Result;
