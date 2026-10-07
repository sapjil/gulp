import type { Replacements } from './optimize-starts-head-or-body.js';
import type { Node } from './types.js';
import type { MLASTNodeTreeItem, MLASTParentNode } from '@markuplint/ml-ast';
import type { ChildToken, ParseOptions, ParserOptions } from '@markuplint/parser-utils';
import { Parser } from '@markuplint/parser-utils';
type State = {
    startsHeadTagOrBodyTag: Replacements | null;
    afterPosition: {
        endOffset: number;
        endLine: number;
        endCol: number;
        depth: number;
    };
};
type ExtendsOptions = Pick<ParserOptions, 'ignoreTags' | 'maskChar'>;
/**
 * Parser implementation for standard HTML, built on top of parse5.
 * Handles document and fragment parsing, ghost elements (omitted tags),
 * and optimizations for `<head>` / `<body>` tag handling.
 */
export declare class HtmlParser extends Parser<Node, State> {
    constructor(options?: ExtendsOptions);
    tokenize(): {
        ast: Node[];
        isFragment: boolean;
    };
    beforeParse(rawCode: string, options?: ParseOptions): string;
    afterParse(nodeList: readonly MLASTNodeTreeItem[], options?: ParseOptions): readonly MLASTNodeTreeItem[];
    nodeize(originNode: Node, parentNode: MLASTParentNode | null, depth: number): readonly MLASTNodeTreeItem[];
    afterNodeize(siblings: readonly MLASTNodeTreeItem[], parentNode: MLASTParentNode | null, depth: number): {
        siblings: import("@markuplint/ml-ast").MLASTChildNode[];
        ancestors: MLASTNodeTreeItem[];
    };
    visitText(token: ChildToken): readonly MLASTNodeTreeItem[];
    visitSpreadAttr(): null;
}
/**
 * Default singleton instance of the HTML parser.
 */
export declare const parser: HtmlParser;
export {};
