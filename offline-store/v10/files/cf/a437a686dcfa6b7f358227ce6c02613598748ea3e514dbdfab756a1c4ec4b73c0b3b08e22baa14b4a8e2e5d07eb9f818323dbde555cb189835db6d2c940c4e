import type { ARIAVersion, MLMLSpec } from '../../types/index.js';
/**
 * A record mapping ARIA property names to their computed property details.
 */
type ARIAProps = Record<string, ARIAProp>;
/**
 * Represents a single computed ARIA property with its resolved value and metadata.
 */
type ARIAProp = {
    name: string;
    value: string | undefined;
    required: boolean;
    deprecated: boolean;
    from: ARIAPropReferenceType;
};
/**
 * Indicates the source from which an ARIA property value was derived:
 * - `'default'`: The property's default value from the ARIA spec
 * - `'html-attr'`: A value mapped from an equivalent HTML attribute
 * - `'aria-attr'`: A value explicitly set via an `aria-*` attribute
 */
type ARIAPropReferenceType = 'default' | 'html-attr' | 'aria-attr';
/**
 * Computes the resolved ARIA properties for an element based on its computed role.
 * Resolves property values by checking explicit `aria-*` attributes first,
 * then equivalent HTML attributes, and finally falling back to spec-defined defaults.
 *
 * @param specs - The full markup language specification
 * @param el - The DOM element to compute ARIA properties for
 * @param version - The ARIA specification version to use
 * @returns A record of ARIA property names to their computed property details, or an empty record if the element has no computed role
 */
export declare function getComputedAriaProps(specs: MLMLSpec, el: Element, version: ARIAVersion): ARIAProps;
export {};
