/**
 * Tests a raw string value against a regex selector pattern and returns
 * the captured groups if matched.
 *
 * Plain strings are treated as exact-match patterns (`^pattern$`).
 * Regex literals (`/pattern/flags`) are used as-is.
 *
 * @param reg - The regex pattern string, or `undefined` to skip matching
 * @param raw - The raw string value to test against the pattern
 * @param ignoreCase - Whether to perform case-insensitive matching
 * @returns An object of captured groups (`$0`, `$1`, ... and named groups), or `null` if unmatched or `reg` is `undefined`
 */
export declare function regexSelectorMatches(reg: string | undefined, raw: string, ignoreCase: boolean): {
    [x: string]: string;
} | null;
