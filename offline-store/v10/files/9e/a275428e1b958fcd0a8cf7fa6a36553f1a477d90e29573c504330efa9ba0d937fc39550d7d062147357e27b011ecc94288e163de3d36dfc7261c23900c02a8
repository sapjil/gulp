import type { MLASTToken } from '@markuplint/ml-ast';
/**
 * Represents a single token in the markuplint AST.
 * Wraps an AST token with positional information (line, column, offset)
 * and provides both raw and fixed string representations.
 *
 * @template A - The AST token type this token wraps
 */
export declare class MLToken<A extends MLASTToken = MLASTToken> {
    #private;
    /**
     * The unique identifier for this token.
     */
    readonly uuid: string;
    /**
     * The underlying AST token that this token wraps.
     */
    protected readonly _astToken: A;
    /**
     * Creates a new MLToken instance from an AST token.
     *
     * @param astToken - The AST token to wrap
     */
    constructor(astToken: A);
    /**
     * The ending column number (1-based) of this token in the source.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get endCol(): number;
    /**
     * The ending line number (1-based) of this token in the source.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get endLine(): number;
    /**
     * The ending character offset (0-based) of this token in the source.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get endOffset(): number;
    /**
     * The fixed (potentially modified) string content of this token.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get fixed(): string;
    /**
     * The original raw string content of this token from the source.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get raw(): string;
    /**
     * The starting column number (1-based) of this token in the source.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get startCol(): number;
    /**
     * The starting line number (1-based) of this token in the source.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get startLine(): number;
    /**
     * The starting character offset (0-based) of this token in the source.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     */
    get startOffset(): number;
    /**
     * Replaces the fixed content of this token with the given string,
     * used when applying lint fixes.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     * @param raw - The new string content to set as the fixed value
     */
    fix(raw: string): void;
    /**
     * Returns the string representation of this token.
     *
     * @implements `@markuplint/ml-core` API: `MLDOMToken`
     * @param fixed - When true, returns the fixed content; otherwise returns the original raw content
     * @returns The string content of this token
     */
    toString(fixed?: boolean): string;
}
