import type { MLMLSpec } from '@markuplint/ml-spec';
import { Selector } from './selector.js';
/**
 * Creates a cached {@link Selector} instance for the given CSS selector string.
 *
 * Results are cached by selector string so subsequent calls with the same
 * selector return the same instance.
 *
 * When `specs` is provided, markuplint's extended pseudo-classes
 * (`:model()`, `:aria()`, `:role()`) are available.
 *
 * @param selector - The CSS selector string to parse
 * @param specs - Optional HTML/ARIA specification data for extended pseudo-classes
 * @returns A reusable Selector instance
 */
export declare function createSelector(selector: string, specs?: MLMLSpec): Selector;
