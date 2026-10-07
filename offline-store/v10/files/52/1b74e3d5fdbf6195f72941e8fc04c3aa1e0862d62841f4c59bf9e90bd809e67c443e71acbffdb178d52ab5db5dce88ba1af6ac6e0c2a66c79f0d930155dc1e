import type { MLMLSpec, Attribute } from '../types/index.js';
import type { NamespaceURI } from '@markuplint/ml-ast';
/**
 * Retrieves the merged attribute specifications for an element identified by its local name
 * and namespace. Combines global attributes from the relevant categories with the element's
 * own attribute definitions. Results are cached by the namespace-qualified element name.
 *
 * @param localName - The local tag name of the element
 * @param namespace - The namespace URI of the element, or null for HTML namespace
 * @param schema - The full markup language specification containing attribute definitions
 * @returns A sorted array of attribute specifications for the element, or null if the element is not found in the schema
 */
export declare function getAttrSpecs(localName: string, namespace: NamespaceURI | null, schema: MLMLSpec): readonly Attribute[] | null;
type HasName = {
    readonly name: string;
};
/**
 * Compares two items by name in a case-insensitive manner, suitable for use as
 * a sort comparator. Accepts either objects with a `name` property or plain strings.
 *
 * @param a - The first item to compare (object with `name` property or a string)
 * @param b - The second item to compare (object with `name` property or a string)
 * @returns A negative number if `a` comes before `b`, positive if after, or 0 if equal
 */
export declare function nameCompare(a: HasName | string, b: HasName | string): 1 | -1 | 0;
export {};
