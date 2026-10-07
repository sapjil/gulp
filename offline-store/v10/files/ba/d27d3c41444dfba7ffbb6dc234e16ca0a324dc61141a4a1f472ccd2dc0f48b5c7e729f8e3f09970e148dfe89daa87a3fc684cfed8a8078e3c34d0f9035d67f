import type { ImplicitRole } from '../../types/aria.js';
import type { ARIAVersion, ComputedRole, MLMLSpec } from '../../types/index.js';
/**
 * Determines the implicit (native) ARIA role for an element based on its tag name,
 * namespace, and any matching conditions defined in the HTML-ARIA spec.
 *
 * @param specs - The full markup language specification
 * @param el - The DOM element to determine the implicit role for
 * @param version - The ARIA specification version to use
 * @returns The computed role result containing the implicit role spec, or null if no corresponding role exists
 */
export declare function getImplicitRole(specs: MLMLSpec, el: Element, version: ARIAVersion): ComputedRole;
/**
 * Retrieves the implicit role name string for an element without resolving
 * the full role specification. Returns `false` when no corresponding role exists.
 *
 * @param el - The DOM element to look up the implicit role name for
 * @param version - The ARIA specification version to use
 * @param specs - The full markup language specification
 * @returns The implicit role name string, or `false` if the element has no corresponding role
 */
export declare function getImplicitRoleName(el: Element, version: ARIAVersion, specs: MLMLSpec): ImplicitRole;
