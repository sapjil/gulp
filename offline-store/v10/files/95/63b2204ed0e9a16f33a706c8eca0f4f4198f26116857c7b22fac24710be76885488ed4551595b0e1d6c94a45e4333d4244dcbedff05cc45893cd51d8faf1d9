import type { ARIAVersion, ComputedRole, MLMLSpec } from '../../types/index.js';
/**
 * Checks whether an element satisfies the "Required Owned Elements" constraint
 * defined by its computed ARIA role. An element satisfies this constraint if it
 * has `aria-owns`, or if any of its closest non-presentational descendants match
 * the required owned element roles.
 *
 * @param el - The DOM element to check
 * @param specs - The full markup language specification
 * @param version - The ARIA specification version to use
 * @returns `true` if the element has no required owned elements or the constraint is satisfied, `false` otherwise
 */
export declare function hasRequiredOwnedElement(el: Element, specs: MLMLSpec, version: ARIAVersion): boolean;
/**
 * Determines whether an element with a given role matches a required owned element query.
 * The query string may describe a single role or a parent-child relationship using `>` notation
 * (e.g., `"listitem"` or `"group > listitem"`).
 *
 * @param el - The DOM element to test
 * @param role - The computed role of the element
 * @param query - The required owned element query string, optionally containing `>` for nested requirements
 * @param specs - The full markup language specification
 * @param version - The ARIA specification version to use
 * @returns `true` if the element and its role match the required owned element query
 */
export declare function isRequiredOwnedElement(el: Element, role: ComputedRole['role'], query: string, specs: MLMLSpec, version: ARIAVersion): boolean;
