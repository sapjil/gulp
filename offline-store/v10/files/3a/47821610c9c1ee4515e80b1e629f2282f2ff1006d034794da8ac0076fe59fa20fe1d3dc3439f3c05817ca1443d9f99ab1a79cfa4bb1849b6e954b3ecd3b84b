/**
 * Configuration options for the landmark-roles rule.
 */
type Options = {
    /** Landmark roles to exclude from validation. */
    ignoreRoles: Roles[];
    /** Whether to require a unique accessible name when duplicate landmark roles exist. */
    labelEachArea: boolean;
};
/** Landmark roles that should appear at the top level of the document. */
type TopLevelRoles = 'banner' | 'main' | 'complementary' | 'contentinfo';
/** All recognized ARIA landmark roles for this rule. */
type Roles = TopLevelRoles | 'form' | 'navigation' | 'region';
/**
 * Rule that validates proper usage of ARIA landmark roles.
 *
 * Checks that `banner`, `main`, `complementary`, and `contentinfo` landmarks are
 * top-level (not nested inside other landmarks), and that when duplicate landmarks
 * of the same role exist, each has a unique accessible name.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<boolean, Options>>;
export default _default;
