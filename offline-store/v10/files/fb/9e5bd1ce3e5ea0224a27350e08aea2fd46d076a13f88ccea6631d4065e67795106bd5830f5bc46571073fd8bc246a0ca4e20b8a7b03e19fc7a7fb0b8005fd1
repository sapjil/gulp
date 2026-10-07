import type { MLFabric } from './types.js';
import type { PlainData, RuleConfigValue, Violation } from '@markuplint/ml-config';
import { ParserError } from '@markuplint/parser-utils';
import { Document } from './ml-dom/index.js';
/**
 * Parameters for constructing an {@link MLCore} instance.
 * Extends {@link MLFabric} with the source code, filename, and debug flag.
 */
export type MLCoreParams = {
    /** The markup source code to lint */
    readonly sourceCode: string;
    /** The filename associated with the source code */
    readonly filename: string;
    /** Whether to enable debug logging */
    readonly debug?: boolean;
} & MLFabric;
/**
 * The core linting engine for markuplint.
 *
 * Parses markup source code into an AST, constructs a DOM document,
 * and verifies it against configured rules to produce violations.
 */
export declare class MLCore {
    #private;
    constructor({ parser, sourceCode, ruleset, rules, locale, schemas, parserOptions, severity, pretenders, filename, debug, configErrors, }: MLCoreParams);
    /**
     * The parsed document, or a {@link ParserError} if parsing failed.
     */
    get document(): ParserError | Document<RuleConfigValue, PlainData>;
    /**
     * Replaces the source code and re-parses the document.
     *
     * @param sourceCode - The new markup source code
     */
    setCode(sourceCode: string): void;
    /**
     * Updates the linting configuration and re-creates the document.
     * Only re-parses if parser options have changed.
     *
     * @param fabric - Partial fabric with the properties to update
     */
    update({ parser, ruleset, rules, locale, schemas, parserOptions, configErrors }: Partial<MLFabric>): void;
    /**
     * Runs all configured rules against the parsed document and returns violations.
     *
     * If the document failed to parse, a single parse-error violation is returned
     * (unless parse errors are suppressed via severity options).
     *
     * @param fix - Whether to attempt auto-fixing violations
     * @returns An array of violations found during verification
     */
    verify(fix?: boolean): Promise<Violation[]>;
    private _createDocument;
    private _createParseError;
    private _parse;
}
