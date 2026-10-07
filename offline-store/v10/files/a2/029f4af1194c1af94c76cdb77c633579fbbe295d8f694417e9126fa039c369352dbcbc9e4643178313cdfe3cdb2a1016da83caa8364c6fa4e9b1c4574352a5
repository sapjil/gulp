import type { Options } from '../types.js';
import type { ElementChecker } from '@markuplint/ml-core';
/**
 * Checks whether ARIA attributes are applied to descendants of an element whose
 * role has the `childrenArePresentational` characteristic.
 *
 * Presentational Children
 *
 * @see https://www.w3.org/TR/wai-aria/#childrenArePresentational
 * @see https://w3c.github.io/aria/#childrenArePresentational
 *
 * > The DOM descendants are presentational.
 * > user agents SHOULD NOT expose descendants of
 * > this element through the platform accessibility API.
 * > If user agents do not hide the descendant nodes,
 * > some information may be read twice.
 *
 * @see https://w3c.github.io/aria/#tree_exclusion
 *
 * > Any descendants of elements that have the characteristic "Children Presentational: True"
 * > unless the descendant is not allowed to be presentational
 * > because it meets one of the conditions for exception described
 * > in Presentational Roles Conflict Resolution.
 * > However, the text content of any excluded descendants is included.
 *
 * @see https://w3c.github.io/aria/#tree_inclusion
 *
 * > Text equivalents for hidden referenced objects
 * > may still be used in the name and description computation
 * > even when not included in the accessibility tree.
 *
 * @param el - The element node to inspect for presentational ancestor context.
 * @returns A violation if the element has ARIA attributes and an ancestor with presentational children.
 */
export declare const checkingPresentationalChildren: ElementChecker<boolean, Options>;
