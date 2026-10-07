import type { Log } from './debug.js';
import type { Translator } from '@markuplint/i18n';
import type { PlainData } from '@markuplint/ml-config';
import type { Element, RuleConfigValue, Document } from '@markuplint/ml-core';
import type { Attribute } from '@markuplint/ml-spec';
import type { WritableDeep } from 'type-fest';
/**
 * Tests whether an element matches the condition specified in an attribute spec.
 * When the condition is `null` or `undefined`, the element is considered to match unconditionally.
 *
 * @template T - The rule configuration value type
 * @template O - The rule options type
 * @param node - The element to test against the condition
 * @param condition - A CSS selector string or array of selector strings from the attribute specification;
 *   if `null`/`undefined`, the function returns `true`
 * @returns `true` if the element matches the condition (or no condition is given), `false` otherwise
 */
export declare function attrMatches<T extends RuleConfigValue, O extends PlainData>(node: Element<T, O>, condition: Attribute['condition']): boolean;
/**
 * Tests whether a string matches a given pattern. The pattern can be either
 * a plain string (tested for exact equality) or a regular expression literal
 * in the form `/pattern/flags`.
 *
 * @param needle - The string to test
 * @param pattern - A plain string or a regex literal string (e.g. `/^foo/i`)
 * @returns `true` if the needle matches the pattern
 */
export declare function match(needle: string, pattern: string): boolean;
/**
 * PotentialCustomElementName
 *
 * @see https://spec.whatwg.org/multipage/custom-elements.html#prod-potentialcustomelementname
 *
 * > PotentialCustomElementName ::=
 * >   [a-z] (PCENChar)* '-' (PCENChar)*
 * > PCENChar ::=
 * >   "-" | "." | [0-9] | "_" | [a-z] | #xB7 | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x37D] |
 * >   [#x37F-#x1FFF] | [#x200C-#x200D] | [#x203F-#x2040] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
 * > This uses the EBNF notation from the XML specification. [XML]
 *
 * ASCII-case-insensitively.
 * Originally, it is not possible to define a name including ASCII upper alphas in the custom element, but it is not treated as illegal by the HTML parser.
 */
export declare const rePCENChar: string;
/**
 * Validates an attribute name/value pair against its specification.
 * Checks attribute existence in the spec, value validity, conditional applicability,
 * and skips validation for dynamic (template-interpolated) values when the error
 * relates to an invalid value.
 *
 * @param t - The i18n translator for generating localized error messages
 * @param name - The attribute name to validate
 * @param value - The attribute value to validate
 * @param isDynamicValue - Whether the value is dynamic (e.g. from a template expression);
 *   if `true`, invalid-value errors are suppressed
 * @param node - The element that owns the attribute
 * @param attrSpecs - The list of attribute specifications to validate against
 * @param log - Optional debug logger for diagnostic output
 * @returns `false` if valid, or an `Invalid` object (or array of them) describing the violation
 */
export declare function isValidAttr(t: Translator, name: string, value: string, isDynamicValue: boolean, node: Element<any, any>, attrSpecs: readonly Attribute[], log?: Log): false | {
    invalidType: "non-existent" | "invalid-value" | "disallowed-attr";
    message: string;
    loc?: {
        raw: string;
        line: number;
        col: number;
    };
} | {
    invalidType: "invalid-value";
    message: string;
    loc?: {
        raw: string;
        line: number;
        col: number;
    };
}[];
/**
 * Normalizes an attribute value according to its specification rules.
 * Applies case-folding, whitespace trimming, and separator normalization
 * based on the attribute type definition.
 *
 * @param value - The raw attribute value to normalize
 * @param spec - The attribute specification that defines normalization rules
 *   (case sensitivity, separator type, whitespace handling)
 * @returns The normalized attribute value
 */
export declare function toNormalizedValue(value: string, spec: Attribute): string;
/**
 * Determines whether an element's accessible name may change at runtime.
 * Returns `true` if the element itself has mutable attributes or children,
 * or if an associated `<label>` element has mutable content.
 *
 * @param el - The element whose accessible name stability is being checked
 * @param document - The document containing the element, used to locate associated labels
 * @returns `true` if the accessible name could change dynamically, `false` otherwise
 */
export declare function accnameMayBeMutable(el: Element<any, any>, document: Document<any, any>): boolean;
/**
 * Finds the `<label>` element associated with a labelable form element.
 * First checks for an ancestor `<label>`, then looks for a `<label>` whose
 * `for` attribute references the element's `id`. Returns `null` if the
 * element is not labelable or no associated label is found.
 *
 * @template V - The rule configuration value type
 * @template O - The rule options type
 * @param el - The element to find a label for (must be a labelable element)
 * @param document - The document to search for labels with a matching `for` attribute
 * @returns The associated `<label>` element, or `null` if none is found
 */
export declare function getOwnedLabel<V extends RuleConfigValue, O extends PlainData>(el: Element<V, O>, document: Document<V, O>): Element<V, O> | null;
/**
 * A generic, null-safe collection backed by a `Set`.
 * Automatically filters out `null` and `undefined` values when items are added.
 * Implements the iterable protocol so it can be used in `for...of` loops.
 *
 * @template T - The type of items stored in the collection
 */
export declare class Collection<T> {
    #private;
    /**
     * Creates a new collection, optionally pre-populated with the given items.
     * Any `null` or `undefined` values are silently ignored.
     *
     * @param items - Initial items to add to the collection
     */
    constructor(...items: readonly (T | null | undefined)[]);
    /**
     * Returns an iterator over the items in the collection.
     *
     * @returns An iterator that yields each item in insertion order
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Adds one or more items to the collection.
     * Any `null` or `undefined` values are silently ignored.
     *
     * @param items - Items to add to the collection
     */
    add(...items: readonly (T | null | undefined)[]): void;
    /**
     * Returns a frozen array snapshot of the collection's contents.
     *
     * @returns A read-only array containing all items in insertion order
     */
    toArray(): readonly T[];
}
/**
 * Creates a deep, writable copy of the given value using structured cloning.
 * Strips read-only modifiers from the result type so the clone can be freely mutated.
 *
 * @template T - The type of the value to clone
 * @param value - The value to deep-copy
 * @returns A mutable deep clone of the input value
 */
export declare function deepCopy<T>(value: T): WritableDeep<T>;
