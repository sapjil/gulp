import type { Options } from '../types.js';
import type { AttrChecker } from '@markuplint/ml-core';
/**
 * Checks whether the explicit `role` attribute duplicates the element's implicit (native) role.
 *
 * HTML elements have implicit ARIA roles (e.g., `<nav>` has an implicit role of `navigation`).
 * Explicitly setting the same role is redundant and should be avoided.
 *
 * @param attr - The `role` attribute node to inspect.
 * @returns A violation if any token in the role attribute matches the element's implicit role.
 */
export declare const checkingImplicitRole: AttrChecker<boolean, Options>;
