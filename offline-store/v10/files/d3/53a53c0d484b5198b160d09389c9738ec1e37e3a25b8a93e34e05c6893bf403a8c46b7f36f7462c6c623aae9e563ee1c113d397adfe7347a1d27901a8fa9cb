import type { MLElement } from '../ml-dom/node/element.js';
import type { MLNode } from '../ml-dom/node/node.js';
import type { MLToken } from '../ml-dom/token/token.js';
import type { MLASTNode, MLASTToken, MLParser } from '@markuplint/ml-ast';
import type { Config, PlainData, Pretender, RuleConfigValue } from '@markuplint/ml-config';
import type { MLMLSpec } from '@markuplint/ml-spec';
import { MLDocument } from '../ml-dom/node/document.js';
/**
 * Options for creating test documents and elements.
 */
export type CreateTestOptions = {
    /** The markuplint configuration to apply */
    readonly config?: Config;
    /** A parser module or parser instance to use instead of the default HTML parser */
    readonly parser?: {
        readonly parser: Readonly<MLParser>;
    } | Readonly<MLParser>;
    /** The HTML/ARIA specification data to use */
    readonly specs?: MLMLSpec;
    /** Pretender definitions for component mapping */
    readonly pretenders?: readonly Pretender[];
};
/**
 * Parses markup source code and returns a test document for use in rule tests.
 *
 * @template T - The rule config value type
 * @template O - The rule options type
 * @param sourceCode - The markup source code to parse
 * @param options - Options for parser, config, specs, and pretenders
 * @returns A parsed MLDocument instance
 */
export declare function createTestDocument<T extends RuleConfigValue = any, O extends PlainData = any>(sourceCode: string, options?: CreateTestOptions): MLDocument<T, O>;
/**
 * Parses markup source code and returns the flat list of AST nodes.
 *
 * @param sourceCode - The markup source code to parse
 * @param options - Options for parser, config, specs, and pretenders
 * @returns A readonly array of all nodes in the parsed document
 */
export declare function createTestNodeList(sourceCode: string, options?: CreateTestOptions): readonly MLNode<any, any, MLASTNode>[];
/**
 * Parses markup source code and returns the flat list of tokens.
 *
 * @param sourceCode - The markup source code to parse
 * @param options - Options for parser, config, specs, and pretenders
 * @returns A readonly array of all tokens in the parsed document
 */
export declare function createTestTokenList(sourceCode: string, options?: CreateTestOptions): readonly MLToken<MLASTToken>[];
/**
 * Parses markup source code and returns the first element node.
 * Throws if the source does not produce an element as its first node.
 *
 * @param sourceCode - The markup source code containing an element
 * @param options - Options for parser, config, specs, and pretenders
 * @returns The first element in the parsed document
 * @throws {TypeError} If the first node is not an element
 */
export declare function createTestElement(sourceCode: string, options?: CreateTestOptions): MLElement<any, any>;
/**
 * Returns the default HTML spec as a schema tuple for use in test suites.
 *
 * @returns A single-element tuple containing the HTML specification
 */
export declare function dummySchemas(): [MLMLSpec];
