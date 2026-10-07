import { contentModelCategoryToTagNames } from '@markuplint/ml-spec';
import { cmLog } from './debug.js';
import { cleanObject, matches } from './utils.js';
/**
 * Tests whether a single child node matches a content model query selector.
 * Handles special node types (text nodes, preprocessor blocks, custom elements)
 * and delegates standard element matching to the CSS selector engine.
 *
 * The query string may reference content model categories (e.g., `#phrasing`)
 * which are expanded to concrete tag selectors via `optCondition`.
 *
 * @param query - The content model query string (e.g., `"div"`, `"#phrasing"`, `":model(flow)"`).
 * @param childNode - The child node to test, or undefined if no node is available.
 * @param specs - The resolved spec data for category-to-tag-name expansion.
 * @param depth - The current recursion depth, used for debug logging namespacing.
 * @returns A selector result indicating match status with diagnostic hints.
 */
export function matchesSelector(query, 
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
childNode, specs, depth) {
    const nodeLog = cmLog.extend(`node#${depth}`);
    const { selector, hasText, hasCustom } = optCondition(query, specs);
    if (childNode == null) {
        if (hasText) {
            nodeLog('<#text>.matches(%s) => ""', query);
            return {
                type: 'MATCHED_ZERO',
                matched: [],
                unmatched: [],
                zeroMatch: true,
                query,
                hint: {},
            };
        }
        return {
            type: 'MISSING_NODE',
            matched: [],
            unmatched: [],
            zeroMatch: false,
            query,
            hint: {},
        };
    }
    if (childNode.is(childNode.TEXT_NODE)) {
        if (hasText) {
            nodeLog('<#text>.matches(%s) => "%s"', query, childNode.raw.trim());
            return {
                type: 'MATCHED',
                matched: [childNode],
                unmatched: [],
                zeroMatch: true,
                query,
                hint: {},
            };
        }
        if (childNode.isWhitespace()) {
            nodeLog('<#text>.matches(%s) => WHITESPACE', query);
            return {
                type: 'MATCHED',
                matched: [childNode],
                unmatched: [],
                zeroMatch: true,
                query,
                hint: {},
            };
        }
        // Disallows a text node
        return {
            type: 'UNEXPECTED_EXTRA_NODE',
            matched: [],
            unmatched: [childNode],
            zeroMatch: false,
            query,
            hint: {},
        };
    }
    if (childNode.is(childNode.MARKUPLINT_PREPROCESSOR_BLOCK)) {
        nodeLog('%s.matches(%s) => PBlock', childNode.raw, query);
        return {
            type: 'MATCHED',
            matched: [childNode],
            unmatched: [],
            zeroMatch: !!hasText,
            query,
            hint: {},
        };
    }
    if (childNode.is(childNode.ELEMENT_NODE)) {
        if (childNode.elementType !== 'html' && hasCustom) {
            nodeLog('%s.matches(%s) => CustomElement', childNode.raw, query);
            return {
                type: 'MATCHED',
                matched: [childNode],
                unmatched: [],
                zeroMatch: !!hasText,
                query,
                hint: {},
            };
        }
        const result = matches(selector, childNode, specs);
        nodeLog('%s.matches(%s) => %s', childNode.raw, query, result.matched);
        if (result.matched) {
            return {
                type: 'MATCHED',
                matched: [childNode],
                unmatched: [],
                zeroMatch: !!hasText,
                query,
                hint: {},
            };
        }
        if (hasText) {
            return {
                type: 'UNMATCHED_SELECTOR_BUT_MAY_EMPTY',
                matched: [],
                unmatched: [childNode],
                zeroMatch: true,
                query,
                hint: cleanObject({
                    not: result.not,
                }),
            };
        }
        return {
            type: 'UNMATCHED_SELECTORS',
            matched: [],
            unmatched: [childNode],
            zeroMatch: false,
            query,
            hint: cleanObject({
                not: result.not,
            }),
        };
    }
    return {
        type: 'MATCHED',
        matched: [childNode],
        unmatched: [],
        zeroMatch: !!hasText,
        query,
        hint: {},
    };
}
/**
 * Pre-computed conditions for well-known queries that do not depend on specs.
 */
const conditionWithoutSpecs = {
    '#custom': {
        selector: '#custom',
        hasCustom: true,
        hasText: false,
    },
    '#text': {
        selector: '#text',
        hasCustom: false,
        hasText: true,
    },
};
/**
 * Cache of parsed conditions keyed by specs instance and query string.
 * Prevents redundant category expansion for the same query across multiple elements.
 */
const optConditionSpecsBaseCaches = new Map();
/**
 * Parses a content model query string into a Condition object by expanding
 * content model category references (e.g., `#phrasing`, `:model(flow)`) into
 * concrete CSS `:is(...)` selectors. Also detects whether the query implicitly
 * includes custom elements or text nodes.
 *
 * Results are cached per specs instance and query string.
 *
 * @param query - The raw content model query string to parse.
 * @param specs - The spec data used to resolve category names to tag lists.
 * @returns A readonly Condition with the resolved selector and flags.
 */
function optCondition(query, specs) {
    const condWithoutSpecs = conditionWithoutSpecs[query];
    if (condWithoutSpecs) {
        return condWithoutSpecs;
    }
    const queryCaches = optConditionSpecsBaseCaches.get(specs) ?? new Map();
    const cached = queryCaches.get(query);
    if (cached) {
        return cached;
    }
    let hasCustom = false;
    let hasText = false;
    const selector = query.replace(/^:model\(([^)]+)\)|^#([a-z-]+)/, (_, $model, _model) => {
        const _selectors = contentModelCategoryToTagNames(`#${$model ?? _model}`, specs.def);
        if (_selectors.length === 0) {
            throw new Error(`${$model ?? _model} is empty`);
        }
        const selectors = [];
        for (const selector of _selectors) {
            if (selector === '#custom') {
                hasCustom = true;
                continue;
            }
            if (selector === '#text') {
                hasText = true;
                continue;
            }
            selectors.push(selector);
        }
        return `:is(${selectors.join(',')})`;
    });
    const result = {
        selector,
        hasCustom,
        hasText,
    };
    queryCaches.set(query, result);
    optConditionSpecsBaseCaches.set(specs, queryCaches);
    return result;
}
