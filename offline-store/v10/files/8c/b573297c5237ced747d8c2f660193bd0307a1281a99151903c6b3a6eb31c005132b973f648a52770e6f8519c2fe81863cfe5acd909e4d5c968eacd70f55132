import { resolveNamespace } from './resolve-namespace.js';
const cacheMap = new Map();
const schemaCache = new WeakSet();
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
export function getAttrSpecs(localName, namespace, schema) {
    if (!schemaCache.has(schema)) {
        cacheMap.clear();
    }
    const { localNameWithNS } = resolveNamespace(localName, namespace ?? undefined);
    const cache = cacheMap.get(localNameWithNS);
    if (cache !== undefined) {
        return cache;
    }
    schemaCache.add(schema);
    const elSpec = schema.specs.find(spec => spec.name === localNameWithNS);
    if (!elSpec) {
        cacheMap.set(localNameWithNS, null);
        return null;
    }
    const globalAttrs = schema.def['#globalAttrs'];
    let attrs = {};
    for (const catName in elSpec.globalAttrs) {
        // @ts-ignore
        const catAttrs = elSpec.globalAttrs[catName];
        if (catAttrs === false) {
            continue;
        }
        if (typeof catAttrs === 'boolean') {
            const global = globalAttrs[catName];
            attrs = {
                ...attrs,
                ...global,
            };
            continue;
        }
        if (Array.isArray(catAttrs)) {
            const global = globalAttrs[catName];
            if (!global) {
                continue;
            }
            for (const selectedName of catAttrs) {
                const selected = global[selectedName];
                attrs[selectedName] = {
                    ...attrs[selectedName],
                    ...selected,
                };
            }
            continue;
        }
    }
    for (const attrName in elSpec.attributes) {
        const attr = elSpec.attributes[attrName];
        if (!attr) {
            continue;
        }
        const current = attrs[attrName];
        attrs[attrName] = {
            description: '',
            ...current,
            ...attr,
        };
    }
    const attrList = Object.keys(attrs).map(name => {
        const attr = attrs[name];
        return { name, type: 'Any', ...attr };
    });
    attrList.sort(nameCompare);
    cacheMap.set(localNameWithNS, attrList);
    return attrList;
}
/**
 * Compares two items by name in a case-insensitive manner, suitable for use as
 * a sort comparator. Accepts either objects with a `name` property or plain strings.
 *
 * @param a - The first item to compare (object with `name` property or a string)
 * @param b - The second item to compare (object with `name` property or a string)
 * @returns A negative number if `a` comes before `b`, positive if after, or 0 if equal
 */
export function nameCompare(a, b) {
    const nameA = typeof a === 'string' ? a : a.name.toUpperCase();
    const nameB = typeof b === 'string' ? b : b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}
