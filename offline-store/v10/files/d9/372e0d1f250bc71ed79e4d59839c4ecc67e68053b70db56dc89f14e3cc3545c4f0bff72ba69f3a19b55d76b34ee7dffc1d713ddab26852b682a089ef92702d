/** The accepted quote style: double or single. */
export type Type = 'double' | 'single';
/** A literal quotation mark character. */
export type Quote = '"' | "'";
/** Maps each quote style name to its corresponding character. */
export type QuoteMap = {
    [P in Type]: Quote;
};
/**
 * Rule that enforces consistent quotation marks around attribute values.
 *
 * Verifies that all attribute values use the configured quote style (double
 * or single). Attributes without values, dynamic values, and directives are
 * skipped. Includes an auto-fix that replaces mismatched quotes.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<Type, undefined>>;
export default _default;
