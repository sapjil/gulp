import { resolveNamespace } from './resolve-namespace.js';
const cache = new Map();
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
export function getSpecByTagName(specs, localName, namespace) {
    const { localNameWithNS } = resolveNamespace(localName, namespace ?? undefined);
    let spec = cache.get(localNameWithNS);
    if (spec !== undefined) {
        return spec;
    }
    spec = specs.find(spec => spec.name === localNameWithNS) ?? null;
    cache.set(localNameWithNS, spec);
    return spec;
}
