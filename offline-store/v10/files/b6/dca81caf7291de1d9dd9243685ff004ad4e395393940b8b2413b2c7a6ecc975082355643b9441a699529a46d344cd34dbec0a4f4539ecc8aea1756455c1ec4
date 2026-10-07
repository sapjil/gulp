import type { MLNode } from '../node/node.js';
import type { MLText } from '../node/text.js';
/**
 * Computes the indentation preceding the given node by analyzing
 * the whitespace in adjacent text nodes.
 *
 * @deprecated
 * @param node - The node whose indentation to determine
 * @returns An indentation object describing the whitespace, or null if no indentation is found
 */
export declare function getIndent(node: MLNode<any, any>): MLDOMIndentation | null;
declare class MLDOMIndentation {
    #private;
    readonly line: number;
    constructor(originTextNode: MLText<any, any>, raw: string, line: number, parentNode: MLNode<any, any>);
    get raw(): string;
    get type(): 'tab' | 'space' | 'mixed' | 'none';
    get width(): number;
    fix(raw: string): void;
}
export {};
