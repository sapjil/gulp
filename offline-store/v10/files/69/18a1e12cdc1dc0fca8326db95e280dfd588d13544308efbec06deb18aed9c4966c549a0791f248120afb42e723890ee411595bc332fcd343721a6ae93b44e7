import type { AnyMLRule, Ruleset, Plugin } from '@markuplint/ml-core';
/**
 * Resolves all rules from preset rules, plugins, and auto-loaded rules into
 * a flat array of {@link MLRule} instances.
 *
 * @param plugins - The resolved plugins that may provide custom rules
 * @param ruleset - The current ruleset (used for auto-loading)
 * @param importPreset - Whether to import the built-in preset rules from `@markuplint/rules`
 * @param autoLoad - Whether to auto-load rules referenced in the ruleset
 * @returns An array of all resolved MLRule instances
 *
 * @deprecated The `autoLoad` parameter is deprecated
 */
export declare function resolveRules(plugins: readonly Plugin[], ruleset: Ruleset, importPreset: boolean, 
/**
 * @deprecated
 */
autoLoad: boolean): Promise<Readonly<AnyMLRule>[]>;
