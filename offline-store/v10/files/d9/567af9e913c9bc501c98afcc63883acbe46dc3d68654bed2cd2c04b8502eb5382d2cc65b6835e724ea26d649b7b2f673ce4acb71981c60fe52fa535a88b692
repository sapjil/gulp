import type { MLDocument } from './document.js';
import type { MLElement } from './element.js';
import type { MarkuplintPreprocessorBlockType } from './types.js';
import type { MLASTPreprocessorSpecificBlock, MLASTPreprocessorSpecificBlockConditionalType } from '@markuplint/ml-ast';
import type { PlainData, RuleConfigValue } from '@markuplint/ml-config';
import { MLNode } from './node.js';
/**
 * Represents a preprocessor-specific block node in the markuplint DOM tree.
 * These nodes correspond to template engine constructs such as conditionals (`if`/`else`),
 * loops (`each`), and other preprocessor directives that are not part of standard HTML.
 *
 * @template T - The rule configuration value type
 * @template O - The rule options type
 */
export declare class MLBlock<T extends RuleConfigValue, O extends PlainData = undefined> extends MLNode<T, O, MLASTPreprocessorSpecificBlock> {
    /**
     * The type of conditional this block represents (e.g., `if`, `each`, `switch:case`).
     */
    readonly conditionalType: MLASTPreprocessorSpecificBlockConditionalType;
    /**
     * Whether this block is transparent, meaning its children are treated
     * as belonging to the parent node for tree traversal purposes.
     */
    readonly isTransparent: boolean;
    /**
     * Creates a new MLBlock instance.
     *
     * @param astNode - The AST preprocessor block node to wrap
     * @param document - The owning document
     */
    constructor(astNode: MLASTPreprocessorSpecificBlock, document: MLDocument<T, O>);
    /**
     * Returns a string appropriate for the type of node as `MLBlock`
     *
     * @implements `@markuplint/ml-core` API: `MLBlock`
     */
    get nodeName(): "#ml-block";
    /**
     * Returns a number appropriate for the type of `MLBlock`
     *
     * @implements `@markuplint/ml-core` API: `MLBlock`
     */
    get nodeType(): MarkuplintPreprocessorBlockType;
    /**
     * @implements DOM API: `ChildNode`
     */
    after(...nodes: (string | MLElement<any, any>)[]): void;
    /**
     * @implements DOM API: `ChildNode`
     */
    before(...nodes: (string | MLElement<any, any>)[]): void;
    /**
     * @implements DOM API: `ChildNode`
     */
    remove(): void;
    /**
     * @implements DOM API: `ChildNode`
     */
    replaceWith(...nodes: (string | MLElement<any, any>)[]): void;
}
