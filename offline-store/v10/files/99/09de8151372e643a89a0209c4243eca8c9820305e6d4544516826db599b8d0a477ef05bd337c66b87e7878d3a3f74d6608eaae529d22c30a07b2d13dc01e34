import type { CustomSyntaxCheck, UnmatchedResult } from './types.js';
/**
 * Checks a value against multiple type checkers and returns the best result.
 *
 * Iterates through the provided checks and returns the first matched result.
 * If none match, returns the unmatched result with the highest pass count
 * or furthest offset, providing the most informative error.
 *
 * @param value - The string value to check
 * @param checks - The array of type check functions to try
 * @returns The matched result or the best unmatched result
 */
export declare function checkMultiTypes(value: string, checks: readonly CustomSyntaxCheck[]): import("./types.js").MatchedResult | UnmatchedResult;
