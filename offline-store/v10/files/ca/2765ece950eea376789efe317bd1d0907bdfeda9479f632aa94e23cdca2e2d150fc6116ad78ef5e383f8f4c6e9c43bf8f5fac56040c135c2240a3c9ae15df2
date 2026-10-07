import { parser } from '@markuplint/html-parser';
import spec from '@markuplint/html-spec';
import { convertRuleset } from '../convert-ruleset.js';
import { MLDocument } from '../ml-dom/node/document.js';
/**
 * Parses markup source code and returns a test document for use in rule tests.
 *
 * @template T - The rule config value type
 * @template O - The rule options type
 * @param sourceCode - The markup source code to parse
 * @param options - Options for parser, config, specs, and pretenders
 * @returns A parsed MLDocument instance
 */
export function createTestDocument(sourceCode, options) {
    const ast = options?.parser
        ? 'parser' in options.parser
            ? options.parser.parser.parse(sourceCode, options.config?.parserOptions)
            : options.parser.parse(sourceCode, options.config?.parserOptions)
        : parser.parse(sourceCode, options?.config?.parserOptions);
    const ruleset = convertRuleset(options?.config);
    const document = new MLDocument(ast, ruleset, [options?.specs ?? {}, {}]);
    return document;
}
/**
 * Parses markup source code and returns the flat list of AST nodes.
 *
 * @param sourceCode - The markup source code to parse
 * @param options - Options for parser, config, specs, and pretenders
 * @returns A readonly array of all nodes in the parsed document
 */
export function createTestNodeList(sourceCode, options) {
    const document = createTestDocument(sourceCode, options);
    return document.nodeList;
}
/**
 * Parses markup source code and returns the flat list of tokens.
 *
 * @param sourceCode - The markup source code to parse
 * @param options - Options for parser, config, specs, and pretenders
 * @returns A readonly array of all tokens in the parsed document
 */
export function createTestTokenList(sourceCode, options) {
    const document = createTestDocument(sourceCode, options);
    return document.getTokenList();
}
/**
 * Parses markup source code and returns the first element node.
 * Throws if the source does not produce an element as its first node.
 *
 * @param sourceCode - The markup source code containing an element
 * @param options - Options for parser, config, specs, and pretenders
 * @returns The first element in the parsed document
 * @throws {TypeError} If the first node is not an element
 */
export function createTestElement(sourceCode, options) {
    const document = createTestDocument(sourceCode, options);
    const el = document.nodeList[0];
    if (el && el.is(el.ELEMENT_NODE)) {
        return el;
    }
    throw new TypeError(`Could not parse it to be an element from: ${sourceCode}`);
}
/**
 * Returns the default HTML spec as a schema tuple for use in test suites.
 *
 * @returns A single-element tuple containing the HTML specification
 */
export function dummySchemas() {
    return [spec];
}
