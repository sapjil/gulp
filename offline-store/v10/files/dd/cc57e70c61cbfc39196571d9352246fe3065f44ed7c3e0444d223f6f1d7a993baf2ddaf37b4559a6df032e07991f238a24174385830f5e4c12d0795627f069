import type { Specificity, RegexSelector } from './types.js';
import type { MLMLSpec } from '@markuplint/ml-spec';
/**
 * The result of matching a selector against a node.
 * Either a successful match with specificity and captured data, or an unsuccessful match.
 */
export type SelectorMatches = SelectorMatched | SelectorUnmatched;
type SelectorMatched = {
    readonly matched: true;
    readonly selector: string;
    readonly specificity: Specificity;
    readonly data?: Readonly<Record<string, string>>;
};
type SelectorUnmatched = {
    readonly matched: false;
};
/**
 * Matches a CSS selector or regex selector against a DOM node.
 *
 * Supports both standard CSS selectors (as strings) and markuplint's
 * {@link RegexSelector} for pattern-based matching with captured groups.
 *
 * @param el - The DOM node to test
 * @param selector - A CSS selector string, a regex selector object, or `undefined`
 * @param scope - The scope element for `:scope` pseudo-class resolution
 * @param specs - The HTML/ARIA specification data for extended pseudo-classes
 * @returns A match result with specificity and captured data, or `{ matched: false }`
 */
export declare function matchSelector(el: Node, selector: string | RegexSelector | undefined, scope?: ParentNode | null, specs?: MLMLSpec): SelectorMatches;
export {};
