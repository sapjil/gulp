import type { MLElement } from './element.js';
import type { AttributeNodeType } from './types.js';
import type { MLASTAttr } from '@markuplint/ml-ast';
import type { PlainData, RuleConfigValue } from '@markuplint/ml-config';
import { MLToken } from '../token/token.js';
import { MLDomTokenList } from './dom-token-list.js';
import { MLNode } from './node.js';
/**
 * Represents a DOM Attr (attribute) node wrapper in the markuplint DOM tree.
 * Wraps an AST attribute token and provides access to the attribute's name, value,
 * tokens (name, equal sign, quotes, value), and metadata such as whether
 * the attribute is a directive or has a dynamic value.
 *
 * @template T - The rule configuration value type
 * @template O - The rule options type
 */
export declare class MLAttr<T extends RuleConfigValue, O extends PlainData = undefined> extends MLNode<T, O, MLASTAttr> implements Attr {
    #private;
    /**
     * A candidate attribute name suggested by the parser, if available.
     */
    readonly candidate?: string;
    /**
     * The end quote token of the attribute value, or null if the attribute has no value or quotes.
     */
    readonly endQuote: MLToken | null;
    /**
     * The equal sign token between the attribute name and value, or null if absent.
     */
    readonly equal: MLToken | null;
    /**
     * Whether this attribute is a directive (e.g., framework-specific attributes like `v-if` or `@click`).
     */
    readonly isDirective?: true;
    /**
     * Whether this attribute can be duplicated on the same element.
     */
    readonly isDuplicatable: boolean;
    /**
     * Whether this attribute has a dynamic value (e.g., a template expression rather than a static string).
     */
    readonly isDynamicValue?: true;
    /**
     * The token representing the attribute name, or null for spread attributes.
     */
    readonly nameNode: MLToken | null;
    /**
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#ref-for-dom-node-previoussibling%E2%91%A0
     */
    readonly ownerElement: MLElement<T, O>;
    /**
     * The whitespace token after the equal sign, or null if absent.
     */
    readonly spacesAfterEqual: MLToken | null;
    /**
     * The whitespace token before the equal sign, or null if absent.
     */
    readonly spacesBeforeEqual: MLToken | null;
    /**
     * The whitespace token before the attribute name, or null if absent.
     */
    readonly spacesBeforeName: MLToken | null;
    /**
     * The start quote token of the attribute value, or null if the attribute has no value or quotes.
     */
    readonly startQuote: MLToken | null;
    /**
     * The token representing the attribute value, or null if the attribute has no value.
     */
    readonly valueNode: MLToken | null;
    /**
     * Returns the "string" if HTML syntax. Otherwise, returns a type in its syntax.
     *
     * @default "string"
     * @implements `@markuplint/ml-core` API: `MLAttr`
     */
    readonly valueType: 'string' | 'number' | 'boolean' | 'code';
    /**
     * Creates a new MLAttr instance from an AST attribute token.
     *
     * @param astToken - The AST attribute token to wrap
     * @param ownElement - The element that owns this attribute
     */
    constructor(astToken: MLASTAttr, ownElement: MLElement<T, O>);
    /**
     * Returns the local name portion of the attribute (without namespace prefix).
     *
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#ref-for-dom-attr-localname
     */
    get localName(): string;
    /**
     * Returns the qualified attribute name (the potential name resolved by the parser).
     *
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#dom-attr-name
     */
    get name(): string;
    /**
     * Returns the namespace URI of this attribute, resolved from the attribute name.
     *
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#ref-for-dom-attr-namespaceuri
     */
    get namespaceURI(): string | null;
    /**
     * Returns a string appropriate for the type of node as `Attr`
     *
     * @see https://dom.spec.whatwg.org/#ref-for-attr%E2%91%A4
     */
    get nodeName(): string;
    /**
     * Returns a number appropriate for the type of `Attr`
     */
    get nodeType(): AttributeNodeType;
    /**
     * Returns the attribute value, equivalent to the `value` property.
     *
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#dom-node-nodevalue
     */
    get nodeValue(): string;
    /**
     * **IT THROWS AN ERROR WHEN CALLING THIS.**
     *
     * @unsupported
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#ref-for-dom-attr-prefix
     */
    get prefix(): string | null;
    /**
     * @implements `@markuplint/ml-core` API: `MLAttr`
     */
    get rule(): import("@markuplint/ml-config").RuleInfo<T, O>;
    /**
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#dom-attr-specified
     */
    get specified(): true;
    /**
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#dom-node-textcontent
     */
    get textContent(): string;
    /**
     * @implements `@markuplint/ml-core` API: `MLAttr`
     */
    get tokenList(): MLDomTokenList | null;
    /**
     * @implements DOM API: `Attr`
     * @see https://dom.spec.whatwg.org/#dom-attr-value
     */
    get value(): string;
    /**
     * Fixes the attribute value.
     * If the attribute is not a spread attribute, it calls the `fix` method of the `valueNode`.
     *
     * @implements `@markuplint/ml-core` API: `MLAttr`
     *
     * @param raw - The raw attribute value.
     */
    fix(raw: string): void;
    /**
     * Returns a normalized string representation of the attribute,
     * stripping extraneous whitespace around the name, equal sign, and value tokens.
     * Falls back to the raw string if any token is missing.
     *
     * @implements `@markuplint/ml-core` API: `MLAttr`
     * @returns The normalized attribute string
     */
    toNormalizeString(): string;
    /**
     * Returns a string representation of the attribute.
     *
     * @implements DOM API: `Attr`
     *
     * @param includesSpacesBeforeName - Whether to include spaces before the attribute name.
     * @returns The string representation of the attribute.
     */
    toString(fixed?: boolean): string;
}
