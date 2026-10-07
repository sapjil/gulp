import type { TokenValue } from './types.js';
import type { UnmatchedResult, UnmatchedResultOptions, UnmatchedResultReason } from '../types.js';
/**
 * Represents a single token within a parsed string value.
 *
 * Tracks the token's value, type (whitespace, comma, or identifier),
 * offset position within the original string, and provides methods
 * for matching and comparison operations.
 */
export declare class Token {
    /**
     * @see https://github.com/csstree/csstree/blob/master/lib/tokenizer/types.js
     */
    static readonly Comma = 18;
    static readonly Ident = 1;
    static readonly WhiteSpace = 13;
    /**
     * ASCII whitespace is
     * - U+0009 TAB
     * - U+000A LF
     * - U+000C FF
     * - U+000D CR
     * - U+0020 SPACE.
     *
     * @see https://infra.spec.whatwg.org/#ascii-whitespace
     */
    static readonly whitespace: ReadonlyArray<string>;
    /**
     * @deprecated Use {@link getPosition} instead. Will be removed in v5.0.0.
     */
    static getCol(value: string, offset: number): number;
    /**
     * @deprecated Use {@link getPosition} instead. Will be removed in v5.0.0.
     */
    static getLine(value: string, offset: number): number;
    /**
     * Calculates the line and column position at the given offset within a string.
     *
     * @param value - The source string
     * @param offset - The character offset to calculate the position for
     * @returns The line number (1-based) and column number (1-based)
     */
    static getPosition(value: string, offset: number): {
        line: number;
        column: number;
    };
    /**
     * Determines the token type based on the first character.
     *
     * @param value - The token string value
     * @param separators - Optional separator characters to detect
     * @returns The token type number (WhiteSpace, Comma, or Ident)
     */
    static getType(value: string, separators?: readonly string[]): 1 | 18 | 13;
    /**
     * Calculates a new position by shifting from a token's offset.
     *
     * @param token - The base token to shift from
     * @param offset - The additional offset to apply
     * @returns The shifted offset, line, and column
     */
    static shiftLocation(token: Readonly<Token>, offset: number): {
        offset: number;
        line: number;
        column: number;
    };
    readonly offset: number;
    readonly originalValue: string;
    readonly type: number;
    readonly value: string;
    /**
     * @param value - The token string value
     * @param offset - The offset position within the original string
     * @param originalValue - The complete original string this token was parsed from
     * @param separators - Optional separator characters used for type detection
     */
    constructor(value: string, offset: number, originalValue: string, separators?: readonly string[]);
    /**
     * The character length of the token value.
     */
    get length(): number;
    /**
     * Creates a copy of this token.
     *
     * @returns A new Token instance with the same value, offset, and original value
     */
    clone(): Token;
    /**
     * Checks whether this token's value contains the given value.
     *
     * @param value - The token value, type number, regex, or array to check against
     * @param caseInsensitive - Whether to perform case-insensitive comparison
     * @returns Whether this token includes the given value
     */
    includes(value: TokenValue, caseInsensitive?: boolean): boolean;
    /**
     * Checks whether this token exactly matches the given value.
     *
     * @param value - The token value, type number, regex, or array to match against
     * @param caseInsensitive - Whether to perform case-insensitive comparison
     * @returns Whether this token matches the given value
     */
    matches(value: TokenValue, caseInsensitive?: boolean): boolean;
    /**
     * Converts this token to a plain JSON-serializable object.
     *
     * @returns An object with type, value, and offset properties
     */
    toJSON(): {
        type: number;
        value: string;
        offset: number;
    };
    /**
     * Parses the token value as a floating-point number.
     *
     * @returns The parsed number, or 0 if parsing fails
     */
    toNumber(): number;
    /**
     * Creates an unmatched result positioned at this token's location.
     *
     * @param options - Optional settings including ref, reason, and expected values
     * @returns An unmatched result with this token's position information
     */
    unmatched(options?: UnmatchedResultOptions & {
        readonly ref?: string;
        readonly reason?: UnmatchedResultReason;
    }): UnmatchedResult;
}
