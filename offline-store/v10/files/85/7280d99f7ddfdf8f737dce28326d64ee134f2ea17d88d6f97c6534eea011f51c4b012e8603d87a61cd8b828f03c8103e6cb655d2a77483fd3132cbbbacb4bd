import type { ChildNode, Options, Result, Specs } from './types.js';
import type { PermittedContentPattern } from '@markuplint/ml-spec';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Validates an ordered sequence of content model patterns against a list of child nodes.
 * Each pattern in the `contents` array is matched in order against the remaining unmatched
 * child nodes, consuming nodes as they match. This implements the sequential composition
 * semantics of HTML content models (e.g., "a `<caption>` followed by zero or more `<colgroup>`s
 * followed by a `<thead>`...").
 *
 * Supports backtracking: when a pattern matches zero nodes (zeroMatch), the algorithm
 * can backtrack to try the next pattern from the previous position if the current pattern fails.
 *
 * @param contents - An ordered array of content model patterns to match sequentially.
 * @param childNodes - The child nodes to validate against the patterns.
 * @param specs - The resolved spec data for content model lookups.
 * @param options - Validation behavior options.
 * @param depth - The current recursion depth, used for debug logging and nested pattern matching.
 * @returns A result indicating overall match status and the matched/unmatched node partitioning.
 */
export declare function order(contents: ReadonlyDeep<PermittedContentPattern[]>, childNodes: readonly ChildNode[], specs: Specs, options: Options, depth: number): Result;
