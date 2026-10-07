import type { FormattedPrimitiveTypeCheck, MatchedResult, UnmatchedResult, UnmatchedResultOptions, UnmatchedResultReason } from './types.js';
/**
 * Creates a value checker function that wraps a primitive type check
 * and returns a matched or unmatched result.
 *
 * @param checker - The primitive type check function to wrap
 * @param options - Optional settings for the unmatched result including ref and reason
 * @returns A function that takes a string value and returns a match result
 */
export declare function matches(checker: FormattedPrimitiveTypeCheck, options?: UnmatchedResultOptions & {
    readonly ref?: string;
    readonly reason?: UnmatchedResultReason;
}): (value: string) => MatchedResult | UnmatchedResult;
/**
 * Creates a successful match result.
 *
 * @returns A matched result object
 */
export declare function matched(): MatchedResult;
/**
 * Creates a failed match result with location and reason information.
 *
 * @param value - The raw string value that failed to match
 * @param reason - The reason for the mismatch
 * @param options - Optional settings including ref URL and expected values
 * @returns An unmatched result object with position details
 */
export declare function unmatched(value: string, reason?: UnmatchedResultReason, options?: UnmatchedResultOptions & {
    readonly ref?: string;
}): UnmatchedResult;
