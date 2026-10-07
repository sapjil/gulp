import type { Translator } from '@markuplint/i18n';
import type { Attribute as AttrSpec, AttributeType } from '@markuplint/ml-spec';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Discriminated union tag representing the kind of attribute invalidity.
 */
type InvalidTYpe = 'non-existent' | 'invalid-value' | 'disallowed-attr';
/**
 * Describes a single attribute validation failure, including the kind
 * of invalidity, a human-readable message, and an optional source location.
 *
 * @template T - The specific invalidity tag (defaults to any `InvalidTYpe`)
 */
type Invalid<T extends InvalidTYpe = InvalidTYpe> = {
    invalidType: T;
    message: string;
    loc?: Loc;
};
/**
 * Source location information pointing to the invalid portion of an attribute value.
 */
type Loc = {
    raw: string;
    line: number;
    col: number;
};
/**
 * Validates an attribute against its specification. Used by the `invalid-attr`
 * and `wai-aria` rules.
 *
 * Performs the following checks in order:
 * 1. Skips `data-*`, `aria-*`/`role`, and `adapt-*` attributes (unless `isCustomRule` is `true`)
 * 2. Verifies the attribute exists in the spec
 * 3. Checks case-sensitive name matching
 * 4. Checks whether the attribute is marked as `noUse` (disallowed)
 * 5. Validates the attribute value against all declared types
 *
 * @param t - The i18n translator for generating localized error messages
 * @param name - The attribute name to check
 * @param value - The attribute value to validate
 * @param isCustomRule - When `true`, skips the built-in bypass for `data-*`, `aria-*`, and `adapt-*` attributes
 * @param spec - The attribute specification to validate against; if absent, the attribute is considered non-existent
 * @returns `false` if the attribute is valid, a single `Invalid` object for existence/disallowed errors,
 *   or an array of `Invalid<'invalid-value'>` objects for value validation failures
 */
export declare function attrCheck(t: Translator, name: string, value: string, isCustomRule: boolean, spec?: AttrSpec): Invalid | Invalid<'invalid-value'>[] | false;
/**
 * Validates an attribute value against a single attribute type definition.
 * Returns `false` if the value is valid, or a tuple of `[message, location]`
 * describing the mismatch.
 *
 * Boolean attributes are always considered valid (their mere presence is sufficient).
 *
 * @param t - The i18n translator for generating localized error messages
 * @param name - The attribute name (used in error messages)
 * @param value - The attribute value to validate
 * @param type - The attribute type definition to validate against
 * @returns `false` if the value is valid, or a `[message, location]` tuple on failure
 */
export declare function valueCheck(t: Translator, name: string, value: string, type: ReadonlyDeep<AttributeType>): [string, Loc] | false;
export {};
