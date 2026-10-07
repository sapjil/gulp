/**
 * Represents a single token within a parsed string value.
 *
 * Tracks the token's value, type (whitespace, comma, or identifier),
 * offset position within the original string, and provides methods
 * for matching and comparison operations.
 */
export class Token {
    /**
     * @deprecated Use {@link getPosition} instead. Will be removed in v5.0.0.
     */
    static getCol(value, offset) {
        const lines = value.slice(0, offset).split(/\n/);
        return (lines.at(-1) ?? '').length + 1;
    }
    /**
     * @deprecated Use {@link getPosition} instead. Will be removed in v5.0.0.
     */
    static getLine(value, offset) {
        return value.slice(0, offset).split(/\n/).length;
    }
    /**
     * Calculates the line and column position at the given offset within a string.
     *
     * @param value - The source string
     * @param offset - The character offset to calculate the position for
     * @returns The line number (1-based) and column number (1-based)
     */
    static getPosition(value, offset) {
        const lines = value.slice(0, offset).split(/\n/);
        const line = lines.length;
        const column = (lines.at(-1) ?? '').length + 1;
        return { line, column };
    }
    /**
     * Determines the token type based on the first character.
     *
     * @param value - The token string value
     * @param separators - Optional separator characters to detect
     * @returns The token type number (WhiteSpace, Comma, or Ident)
     */
    static getType(value, separators) {
        if (Token.whitespace.includes(value[0] ?? '')) {
            return Token.WhiteSpace;
        }
        if (separators?.includes(value[0] ?? '')) {
            switch (value[0]) {
                case ',': {
                    return Token.Comma;
                }
            }
        }
        return Token.Ident;
    }
    /**
     * Calculates a new position by shifting from a token's offset.
     *
     * @param token - The base token to shift from
     * @param offset - The additional offset to apply
     * @returns The shifted offset, line, and column
     */
    static shiftLocation(token, offset) {
        const shifted = token.offset + offset;
        const { line, column } = Token.getPosition(token.originalValue, shifted);
        return {
            offset: shifted,
            line,
            column,
        };
    }
    /**
     * @param value - The token string value
     * @param offset - The offset position within the original string
     * @param originalValue - The complete original string this token was parsed from
     * @param separators - Optional separator characters used for type detection
     */
    constructor(value, offset, originalValue, separators) {
        this.type = Token.getType(value, separators);
        this.value = value;
        this.offset = offset;
        this.originalValue = originalValue;
    }
    /**
     * The character length of the token value.
     */
    get length() {
        return this.value.length;
    }
    /**
     * Creates a copy of this token.
     *
     * @returns A new Token instance with the same value, offset, and original value
     */
    clone() {
        return new Token(this.value, this.offset, this.originalValue);
    }
    /**
     * Checks whether this token's value contains the given value.
     *
     * @param value - The token value, type number, regex, or array to check against
     * @param caseInsensitive - Whether to perform case-insensitive comparison
     * @returns Whether this token includes the given value
     */
    includes(value, caseInsensitive) {
        if (Array.isArray(value)) {
            return value.some(v => this.includes(v));
        }
        if (typeof value === 'string') {
            const a = caseInsensitive ? this.value.toLowerCase() : this.value;
            const b = caseInsensitive ? value.toLowerCase() : value;
            return a.includes(b);
        }
        if (value instanceof RegExp) {
            const pattern = new RegExp(value, caseInsensitive ? 'i' : '');
            return pattern.test(this.value);
        }
        return this.type === value;
    }
    /**
     * Checks whether this token exactly matches the given value.
     *
     * @param value - The token value, type number, regex, or array to match against
     * @param caseInsensitive - Whether to perform case-insensitive comparison
     * @returns Whether this token matches the given value
     */
    matches(value, caseInsensitive) {
        if (Array.isArray(value)) {
            return value.some(v => this.matches(v));
        }
        if (typeof value === 'string') {
            const a = caseInsensitive ? this.value.toLowerCase() : this.value;
            const b = caseInsensitive ? value.toLowerCase() : value;
            return a === b;
        }
        if (value instanceof RegExp) {
            const pattern = new RegExp(value, caseInsensitive ? 'i' : '');
            return pattern.test(this.value);
        }
        return this.type === value;
    }
    /**
     * Converts this token to a plain JSON-serializable object.
     *
     * @returns An object with type, value, and offset properties
     */
    toJSON() {
        return {
            type: this.type,
            value: this.value,
            offset: this.offset,
        };
    }
    /**
     * Parses the token value as a floating-point number.
     *
     * @returns The parsed number, or 0 if parsing fails
     */
    toNumber() {
        const num = Number.parseFloat(this.value);
        return Number.isNaN(num) ? 0 : num;
    }
    /**
     * Creates an unmatched result positioned at this token's location.
     *
     * @param options - Optional settings including ref, reason, and expected values
     * @returns An unmatched result with this token's position information
     */
    unmatched(options) {
        const { line, column } = Token.getPosition(this.originalValue, this.offset);
        return {
            ...options,
            matched: false,
            ref: options?.ref ?? null,
            raw: this.value,
            offset: this.offset,
            length: this.value.length,
            line,
            column,
            reason: options?.reason ?? 'syntax-error',
        };
    }
}
/**
 * @see https://github.com/csstree/csstree/blob/master/lib/tokenizer/types.js
 */
Token.Comma = 18;
Token.Ident = 1;
Token.WhiteSpace = 13;
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
Token.whitespace = ['\u0009', '\u000A', '\u000C', '\u000D', '\u0020'];
