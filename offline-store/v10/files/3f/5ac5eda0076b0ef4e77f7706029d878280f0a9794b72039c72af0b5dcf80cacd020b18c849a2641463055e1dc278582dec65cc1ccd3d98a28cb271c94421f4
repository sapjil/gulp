/**
 * Creates a value checker function that wraps a primitive type check
 * and returns a matched or unmatched result.
 *
 * @param checker - The primitive type check function to wrap
 * @param options - Optional settings for the unmatched result including ref and reason
 * @returns A function that takes a string value and returns a match result
 */
export function matches(checker, options) {
    return (value) => {
        const valid = checker(value);
        if (!valid && !value) {
            return unmatched(value, 'empty-token', options);
        }
        return valid ? matched() : unmatched(value, options?.reason, options);
    };
}
/**
 * Creates a successful match result.
 *
 * @returns A matched result object
 */
export function matched() {
    return {
        matched: true,
    };
}
/**
 * Creates a failed match result with location and reason information.
 *
 * @param value - The raw string value that failed to match
 * @param reason - The reason for the mismatch
 * @param options - Optional settings including ref URL and expected values
 * @returns An unmatched result object with position details
 */
export function unmatched(value, reason, options) {
    return {
        ...options,
        matched: false,
        ref: options?.ref ?? null,
        raw: value,
        offset: 0,
        length: value.length,
        line: 1,
        column: 1,
        reason: reason ?? 'syntax-error',
    };
}
