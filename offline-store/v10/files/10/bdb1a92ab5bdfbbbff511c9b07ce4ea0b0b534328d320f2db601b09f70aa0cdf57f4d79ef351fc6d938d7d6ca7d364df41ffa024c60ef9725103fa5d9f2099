import { after, before, remove, replaceWith } from '../manipulations/child-node-methods.js';
import { MLNode } from './node.js';
/**
 * Represents a DOM DocumentType node wrapper in the markuplint DOM tree.
 * Wraps the `<!DOCTYPE ...>` declaration and implements the standard DOM `DocumentType` interface.
 *
 * @template T - The rule configuration value type
 * @template O - The rule options type
 */
export class MLDocumentType extends MLNode {
    /**
     * Creates a new MLDocumentType instance.
     *
     * @param astNode - The AST doctype node to wrap
     * @param document - The owning document
     */
    constructor(astNode, 
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    document) {
        super(astNode, document);
        this.name = astNode.name;
        this.publicId = astNode.publicId;
        this.systemId = astNode.systemId;
    }
    /**
     * Returns a string appropriate for the type of node as `DocumentType`
     *
     * @see https://dom.spec.whatwg.org/#ref-for-documenttype%E2%91%A0%E2%93%AA
     */
    get nodeName() {
        return this.name;
    }
    /**
     * Returns a number appropriate for the type of `DocumentType`
     */
    get nodeType() {
        return this.DOCUMENT_TYPE_NODE;
    }
    /**
     * @implements DOM API: `DocumentType`
     * @see https://dom.spec.whatwg.org/#dom-node-textcontent
     */
    get textContent() {
        return null;
    }
    /**
     * @implements DOM API: `CharacterData`
     */
    after(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ...nodes) {
        after(this, ...nodes);
    }
    /**
     * @implements DOM API: `CharacterData`
     */
    before(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ...nodes) {
        before(this, ...nodes);
    }
    /**
     * @implements DOM API: `CharacterData`
     */
    remove() {
        remove(this);
    }
    /**
     * @implements DOM API: `CharacterData`
     */
    replaceWith(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    ...nodes) {
        replaceWith(this, ...nodes);
    }
}
