import type { Options } from '../types.js';
import type { ElementChecker } from '@markuplint/ml-core';
import { type ARIAProperty, type ARIARole } from '@markuplint/ml-spec';
/**
 * Checks whether all required ARIA properties for the element's computed role are present.
 *
 * Each ARIA role may define required states and properties (e.g., `slider` requires
 * `aria-valuenow`). This checker verifies that explicitly-set roles have their required
 * properties. Implicit roles are skipped since the browser provides default semantics.
 * Alternative native HTML attributes that satisfy the requirement are also considered.
 *
 * @param el - The element node to inspect for required properties.
 * @param role - The computed ARIA role (with an optional `isImplicit` flag).
 * @param propSpecs - The list of ARIA property specifications for type lookup.
 * @returns A violation if a required property is missing and no native alternative is present.
 */
export declare const checkingRequiredProp: ElementChecker<boolean, Options, {
    role?: (ARIARole & {
        isImplicit?: boolean;
    }) | null;
    propSpecs: readonly ARIAProperty[];
}>;
