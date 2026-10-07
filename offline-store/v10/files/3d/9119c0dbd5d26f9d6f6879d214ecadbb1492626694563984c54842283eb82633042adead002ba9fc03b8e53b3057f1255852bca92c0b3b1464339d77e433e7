import type { ChildNode, Options, Result, Specs } from './types.js';
import type { PermittedContentOneOrMore, PermittedContentOptional, PermittedContentRequire, PermittedContentZeroOrMore } from '@markuplint/ml-spec';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Validates a quantified content model pattern (require, optional, oneOrMore, or zeroOrMore)
 * against a list of child nodes. Repeatedly applies the inner pattern via `recursiveBranch`
 * until the minimum count is satisfied and no more nodes match, or until the maximum count
 * is exceeded.
 *
 * Implements the repetition/quantifier semantics of content models (e.g., "one or more
 * flow content elements", "optionally a `<caption>`", "exactly one `<tbody>`").
 *
 * @param pattern - A quantified content model pattern (require, optional, oneOrMore, or zeroOrMore).
 * @param childNodes - The child nodes to validate against the repeated pattern.
 * @param specs - The resolved spec data for content model lookups.
 * @param options - Validation behavior options.
 * @param depth - The current recursion depth, used for debug logging and nested evaluation.
 * @returns A result indicating whether the required count of matches was achieved.
 */
export declare function countPattern(pattern: ReadonlyDeep<PermittedContentOneOrMore> | ReadonlyDeep<PermittedContentOptional> | ReadonlyDeep<PermittedContentRequire> | ReadonlyDeep<PermittedContentZeroOrMore>, childNodes: readonly ChildNode[], specs: Specs, options: Options, depth: number): Result;
