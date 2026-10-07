import type { Options } from '../types.js';
import type { AttrChecker } from '@markuplint/ml-core';
import type { ARIAProperty, ARIARole } from '@markuplint/ml-spec';
/**
 * Checks whether an ARIA property or state is disallowed on the element's computed role.
 *
 * Each ARIA role defines a set of supported states and properties. This checker reports
 * usage of ARIA attributes that are not in that set. It also considers element-specific
 * restrictions from the ARIA in HTML specification (e.g., properties that should not
 * be used on certain native HTML elements).
 *
 * @param attr - The ARIA attribute node to inspect.
 * @param role - The computed ARIA role of the element.
 * @param propSpecs - The list of ARIA property specifications for type lookup.
 * @param disallowSetImplicitProps - Whether to also enforce element-specific restrictions.
 * @returns A violation if the property is not allowed on the given role or element.
 */
export declare const checkingDisallowedProp: AttrChecker<boolean, Options, {
    role: ARIARole | null;
    propSpecs: readonly ARIAProperty[];
    disallowSetImplicitProps: boolean;
}>;
