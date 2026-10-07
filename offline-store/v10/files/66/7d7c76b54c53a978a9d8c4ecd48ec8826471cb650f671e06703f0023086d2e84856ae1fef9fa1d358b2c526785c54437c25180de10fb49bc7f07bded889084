import type { ARIAVersion, ComputedRole, MLMLSpec } from '../../types/index.js';
/**
 * Computes the final ARIA role for an element according to the WAI-ARIA specification,
 * applying the Presentational Roles Conflict Resolution algorithm. This considers
 * the explicit role, implicit role, required context roles, focusability,
 * global ARIA properties, and SVG accessibility tree inclusion rules.
 *
 * @param specs - The full markup language specification
 * @param el - The DOM element to compute the role for
 * @param version - The ARIA specification version to use
 * @param assumeSingleNode - When true, skips parent context validation and assumes the element is a standalone fragment
 * @returns The computed role result including the resolved role spec (or null) and any error type
 */
export declare function getComputedRole(specs: MLMLSpec, el: Element, version: ARIAVersion, assumeSingleNode?: boolean): ComputedRole;
