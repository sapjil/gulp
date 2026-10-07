import type { ChildNode, Options, Result, Specs } from './types.js';
import type { PermittedContentChoice } from '@markuplint/ml-spec';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Evaluates a choice (alternation) pattern against a list of child nodes.
 * Tries each branch of the choice in order and returns the first successful match.
 * If no branch fully matches, selects the "barely matched" result that consumed
 * the most nodes, preferring `UNEXPECTED_EXTRA_NODE` results (which indicate
 * partial progress) over missing-node results.
 *
 * This implements the alternation (`|`) semantics found in content model definitions,
 * e.g., "either flow content or phrasing content".
 *
 * @param pattern - The choice pattern containing multiple alternative content model branches.
 * @param childNodes - The child nodes to validate against the choice branches.
 * @param specs - The resolved spec data for content model lookups.
 * @param options - Validation behavior options.
 * @param depth - The current recursion depth, used for debug logging and nested evaluation.
 * @returns A result from the best-matching branch, or the branch that came closest to matching.
 */
export declare function choice(pattern: ReadonlyDeep<PermittedContentChoice>, childNodes: readonly ChildNode[], specs: Specs, options: Options, depth: number): Result;
