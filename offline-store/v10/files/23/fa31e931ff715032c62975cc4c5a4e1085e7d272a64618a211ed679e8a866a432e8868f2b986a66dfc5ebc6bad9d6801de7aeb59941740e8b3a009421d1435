import type { Options } from '../types.js';
import type { AttrChecker } from '@markuplint/ml-core';
import type { ARIAProperty, ARIARole } from '@markuplint/ml-spec';
/**
 * Checks whether an ARIA property or state is deprecated for the element's computed role.
 *
 * Some ARIA properties become deprecated on specific roles across ARIA versions.
 * This checker reports usage of such deprecated properties.
 *
 * @param attr - The ARIA attribute node to inspect.
 * @param role - The computed ARIA role of the element.
 * @param propSpecs - The list of ARIA property specifications for type lookup.
 * @returns A violation if the property is deprecated on the given role.
 */
export declare const checkingDeprecatedProps: AttrChecker<boolean, Options, {
    role: ARIARole | null;
    propSpecs: readonly ARIAProperty[];
}>;
