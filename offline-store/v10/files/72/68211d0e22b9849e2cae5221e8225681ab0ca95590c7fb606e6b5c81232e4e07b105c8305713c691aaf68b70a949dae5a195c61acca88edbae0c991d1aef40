import type { ElementSpec } from '../types/index.js';
/**
 * Looks up an element specification by its local tag name and namespace. The tag name
 * is resolved to a namespace-qualified form (e.g., `"svg:circle"`) before searching.
 * Results are cached by the namespace-qualified name for subsequent lookups.
 *
 * @template K - The keys of `ElementSpec` to include in the returned spec object (defaults to all keys)
 * @param specs - The array of element specifications to search
 * @param localName - The local tag name of the element
 * @param namespace - The namespace URI string, or null for HTML namespace
 * @returns The matching element specification, or null if not found
 */
export declare function getSpecByTagName<K extends keyof ElementSpec = keyof ElementSpec>(specs: readonly Pick<ElementSpec, 'name' | K>[], localName: string, namespace: string | null): Pick<ElementSpec, "name" | K> | null;
