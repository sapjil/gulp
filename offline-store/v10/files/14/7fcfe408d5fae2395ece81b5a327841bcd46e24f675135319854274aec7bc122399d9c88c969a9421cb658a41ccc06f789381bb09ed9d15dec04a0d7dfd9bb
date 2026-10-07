import type { ARIAVersion, MLMLSpec } from '../../types/index.js';
/**
 * Checks whether an element's parent hierarchy satisfies at least one of the
 * required context role conditions. Each condition string may describe a chain
 * of ancestor roles separated by ` > ` (e.g., `"list > group"`).
 *
 * @param conditions - An array of required context role condition strings to match against
 * @param ownedEl - The owned DOM element whose parent context is being validated
 * @param specs - The full markup language specification
 * @param version - The ARIA specification version to use
 * @returns `true` if any of the context role conditions are satisfied by the element's ancestors
 */
export declare function matchesContextRole(conditions: readonly string[], ownedEl: Element, specs: MLMLSpec, version: ARIAVersion): boolean;
