import type { Options } from '../types.js';
import type { AttrChecker } from '@markuplint/ml-core';
import type { ARIAProperty } from '@markuplint/ml-spec';
/**
 * Checks whether an ARIA property is explicitly set to its spec-defined default value.
 *
 * Setting an ARIA property to its default value is redundant and may indicate
 * a misunderstanding of the property's behavior. This checker reports such cases
 * when the `disallowDefaultValue` option is enabled.
 *
 * @param attr - The ARIA attribute node to inspect.
 * @param propSpecs - The list of ARIA property specifications for value lookup.
 * @returns A violation if the attribute value matches the property's default value.
 */
export declare const checkingDefaultValue: AttrChecker<boolean, Options, {
    propSpecs: readonly ARIAProperty[];
}>;
