import type { ChildNode, Options, Result, Specs } from './types.js';
import type { PermittedContentPattern } from '@markuplint/ml-spec';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Dispatches a single content model pattern to the appropriate handler based on its type.
 * Acts as a routing layer in the content model validation pipeline:
 * - Choice patterns (alternation) are delegated to `choice`.
 * - Transparent patterns are delegated to `transparent`.
 * - All other quantified patterns (require, optional, oneOrMore, zeroOrMore) are delegated to `countPattern`.
 *
 * @param pattern - A single content model pattern to evaluate.
 * @param childNodes - The child nodes to validate against the pattern.
 * @param specs - The resolved spec data for content model lookups.
 * @param options - Validation behavior options.
 * @param depth - The current recursion depth, used for debug logging and nested evaluation.
 * @returns A result indicating whether the child nodes match the pattern.
 */
export declare function complexBranch(pattern: ReadonlyDeep<PermittedContentPattern>, childNodes: readonly ChildNode[], specs: Specs, options: Options, depth: number): Result;
