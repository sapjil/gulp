import type { Translator } from '@markuplint/i18n';
import type { AttributeType } from '@markuplint/ml-spec';
import type { UnmatchedResult } from '@markuplint/types';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Builds a human-readable error message explaining why an attribute value
 * does not match its expected type. Handles both plain types and list types
 * (space-separated or comma-separated).
 *
 * @param t - The i18n translator for generating localized messages
 * @param baseTarget - A human-readable description of the attribute being validated
 *   (e.g. `'the "href" attribute'`)
 * @param type - The attribute type definition that the value was validated against
 * @param matches - The result object from a failed type check, containing
 *   details about the mismatch (reason, candidate, part name, etc.)
 * @returns A localized error message describing the expected value
 */
export declare function createMessageValueExpected(t: Translator, baseTarget: string, type: ReadonlyDeep<AttributeType>, matches: UnmatchedResult): string;
/**
 * Assembles the detailed portion of a value-expected error message by
 * inspecting the mismatch reason and composing reason, expectation,
 * candidate suggestion, and fallback parts into a single string.
 *
 * This is an internal helper exposed for testing and advanced use.
 * The double-underscore prefix indicates it is not part of the stable public API.
 *
 * @param t - The i18n translator for generating localized messages
 * @param baseTarget - A human-readable description of the validation target
 * @param expected - A description of the expected value(s), or `null` if unknown
 * @param matches - Partial match result containing reason, candidate, and other details
 * @returns A localized error message string
 */
export declare function __createMessageValueExpected(t: Translator, baseTarget: string, expected: string | null, matches: Pick<UnmatchedResult, 'partName' | 'reason' | 'raw' | 'candidate' | 'ref' | 'extra' | 'fallbackTo'>): string;
