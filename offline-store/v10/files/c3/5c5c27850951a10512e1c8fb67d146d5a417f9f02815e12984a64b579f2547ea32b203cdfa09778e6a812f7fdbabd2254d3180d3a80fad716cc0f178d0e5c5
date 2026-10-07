import type { ContentModelResult, Element, Options, Specs } from './types.js';
import type { ContentModel } from '@markuplint/ml-spec';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Entry point for validating an element's child nodes against a content model definition.
 * Handles the three forms of content model: `false` (no content allowed), `true` (any content
 * allowed), or an ordered pattern array. For pattern arrays, transparent content model nodes
 * are first resolved, then each resulting pattern of child nodes is validated via `order`.
 *
 * When `options.evaluateConditionalChildNodes` is enabled, all conditional branches
 * (e.g., from template directives) are evaluated independently.
 *
 * @param contents - The content model definition: `false` for empty, `true` for any, or an array of patterns.
 * @param el - The parent element whose children are being validated.
 * @param specs - The resolved spec data for content model lookups.
 * @param options - Validation behavior options.
 * @returns An array of content model results describing any violations found.
 */
export declare function start(contents: ReadonlyDeep<ContentModel['contents']>, el: Element, specs: Specs, options: Options): ContentModelResult[];
