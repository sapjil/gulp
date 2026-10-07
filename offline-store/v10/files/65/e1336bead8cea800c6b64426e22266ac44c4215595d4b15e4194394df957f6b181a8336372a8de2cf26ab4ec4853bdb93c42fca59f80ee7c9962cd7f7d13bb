type NullableString = string | null | undefined;
/**
 * Finds the closest matching candidate string using Levenshtein distance.
 *
 * Compares the input value against a list of candidate strings and returns
 * the one with the highest similarity ratio (at least 50% similar).
 * Returns `undefined` if no close match is found or the value exactly matches a candidate.
 *
 * @param value - The input string to find a candidate for
 * @param candidates - The candidate strings or arrays of strings to compare against
 * @returns The closest matching candidate, or `undefined` if none is close enough
 */
export declare function getCandidate(value: NullableString, ...candidates: readonly (NullableString | readonly NullableString[])[]): string | undefined;
export {};
