import type { NamespaceURI, Namespace } from '@markuplint/ml-ast';
/**
 * Represents a fully resolved element name with its namespace information.
 */
type NamespacedElementName = {
    localNameWithNS: string;
    localName: string;
    namespace: Namespace;
    namespaceURI: NamespaceURI;
};
/**
 * Resolves an element name and namespace URI into a normalized form containing
 * the namespace-qualified name, bare local name, namespace shorthand, and full
 * namespace URI. Handles explicit namespace prefixes (e.g., `"svg:circle"`) and
 * falls back to HTML namespace when not specified. Results are cached.
 *
 * @param name - The element name, optionally prefixed with a namespace (e.g., `"svg:circle"` or `"div"`)
 * @param namespaceURI - The namespace URI string, or null (defaults to XHTML namespace)
 * @returns The resolved namespace information including qualified name, local name, namespace shorthand, and full URI
 */
export declare function resolveNamespace(name: string, namespaceURI?: string | null): NamespacedElementName;
export {};
