import type { ChildNode, Result, Specs } from './types.js';
/**
 * Extended result type for selector matching that includes additional
 * intermediate states: a selector that did not match but allows empty content,
 * a missing node, or unmatched selectors with partial matches.
 */
export type SelectorResult = Result<'UNMATCHED_SELECTOR_BUT_MAY_EMPTY' | 'MISSING_NODE' | 'UNMATCHED_SELECTORS'>;
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
export declare function matchesSelector(query: string, childNode: ChildNode | undefined, specs: Specs, depth: number): SelectorResult;
