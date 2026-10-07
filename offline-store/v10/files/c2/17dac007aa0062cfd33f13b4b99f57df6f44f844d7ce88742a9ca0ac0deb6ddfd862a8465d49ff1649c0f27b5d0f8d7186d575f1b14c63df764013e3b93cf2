import type { Lang } from './types.js';
/**
 * Configuration options for the require-datetime rule.
 */
type Options = {
    /** Languages to use when parsing natural language date/time text content. */
    langs?: Lang[];
};
/**
 * Rule that validates `<time>` elements without a `datetime` attribute have
 * machine-readable date/time content.
 *
 * When a `<time>` element lacks the `datetime` attribute, this rule checks
 * whether the text content is a valid datetime string. If not, it attempts
 * to parse the content as natural language and suggests a `datetime` value.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<boolean, Options>>;
export default _default;
