import { after, before, remove, replaceWith } from '../manipulations/child-node-methods.js';
import { MLNode } from './node.js';
/**
 * Represents a preprocessor-specific block node in the markuplint DOM tree.
 * These nodes correspond to template engine constructs such as conditionals (`if`/`else`),
 * loops (`each`), and other preprocessor directives that are not part of standard HTML.
 *
 * @template T - The rule configuration value type
 * @template O - The rule options type
 */
export class MLBlock extends MLNode {
    /**
     * Creates a new MLBlock instance.
     *
     * @param astNode - The AST preprocessor block node to wrap
     * @param document - The owning document
     */
    constructor(astNode, 
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    document) {
        super(astNode, document, astNode.isFragment);
        // TODO:
        this.isTransparent = true;
        this.conditionalType = astNode.conditionalType;
    }
    /**
     * Returns a string appropriate for the type of node as `MLBlock`
     *
     * @implements `@markuplint/ml-core` API: `MLBlock`
     */
    get nodeName() {
        return '#ml-block';
    }
    /**
     * Returns a number appropriate for the type of `MLBlock`
     *
     * @implements `@markuplint/ml-core` API: `MLBlock`
     */
    get nodeType() {
        return this.MARKUPLINT_PREPROCESSOR_BLOCK;
    }
    /**
     * @implements DOM API: `ChildNode`
     */
    after(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ...nodes) {
        after(this, ...nodes);
    }
    /**
     * @implements DOM API: `ChildNode`
     */
    before(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ...nodes) {
        before(this, ...nodes);
    }
    /**
     * @implements DOM API: `ChildNode`
     */
    remove() {
        remove(this);
    }
    /**
     * @implements DOM API: `ChildNode`
     */
    replaceWith(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ...nodes) {
        replaceWith(this, ...nodes);
    }
}
