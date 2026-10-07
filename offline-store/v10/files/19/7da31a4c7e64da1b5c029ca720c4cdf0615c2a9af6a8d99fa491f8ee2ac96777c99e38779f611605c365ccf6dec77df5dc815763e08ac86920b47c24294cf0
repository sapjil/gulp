import type { Options } from '../types.js';
import type { ElementChecker } from '@markuplint/ml-core';
import type { ARIARole } from '@markuplint/ml-spec';
/**
 * Checks whether an element with a role that requires specific owned elements
 * actually contains children with the expected roles.
 *
 * For example, a `list` role must own at least one element with the `listitem` role.
 * This checker respects `aria-busy="true"` (which signals that content is still loading),
 * preprocessor blocks, and mutable children from template engines.
 *
 * @see https://w3c.github.io/aria/#mustContain
 * @param el - The element node to inspect for required owned elements.
 * @param role - The computed ARIA role of the element, which defines required owned elements.
 * @returns A violation if the role requires owned elements and none are found.
 */
export declare const checkingRequiredOwnedElements: ElementChecker<boolean, Options, {
    role?: ARIARole | null;
}>;
