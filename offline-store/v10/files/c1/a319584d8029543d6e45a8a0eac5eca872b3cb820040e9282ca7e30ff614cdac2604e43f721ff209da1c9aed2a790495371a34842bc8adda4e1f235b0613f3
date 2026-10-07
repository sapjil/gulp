import type { Options } from '../types.js';
import type { AttrChecker } from '@markuplint/ml-core';
import type { ARIAProperty, Attribute } from '@markuplint/ml-spec';
/**
 * Checks whether an ARIA property duplicates or contradicts semantics already
 * provided by an equivalent native HTML attribute.
 *
 * Many ARIA properties have equivalent HTML attributes (e.g., `aria-required` and `required`).
 * This checker reports when an ARIA property is redundant because the native attribute
 * already conveys the same semantics, or when the ARIA value contradicts the native attribute.
 *
 * @param attr - The ARIA attribute node to inspect.
 * @param propSpecs - The list of ARIA property specifications for equivalence lookup.
 * @param attrSpecs - The HTML attribute specifications for the element.
 * @returns A violation if the ARIA property duplicates or contradicts an equivalent HTML attribute.
 */
export declare const checkingImplicitProps: AttrChecker<boolean, Options, {
    propSpecs: readonly ARIAProperty[];
    attrSpecs: readonly Attribute[] | null;
}>;
