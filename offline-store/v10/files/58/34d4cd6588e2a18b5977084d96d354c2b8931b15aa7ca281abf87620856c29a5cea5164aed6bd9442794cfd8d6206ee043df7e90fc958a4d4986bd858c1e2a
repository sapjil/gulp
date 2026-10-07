import type { DefaultRules, Langs, RuleSettingMode } from './types.js';
import type { Config } from '@markuplint/ml-config';
/**
 * Human-readable display names for each supported template language/framework,
 * shown in the interactive init wizard prompts.
 */
export declare const langs: Record<Langs, string>;
/**
 * Builds a markuplint configuration object based on the user's init wizard selections.
 *
 * Configures parsers and spec modules for the selected template languages,
 * and populates rules based on the chosen rule-setting mode (custom categories,
 * recommended preset, or all defaults).
 *
 * @param langs - The template languages/frameworks selected by the user.
 * @param mode - The rule selection mode: an array of categories, `'recommended'`, or `'none'`.
 * @param defaultRules - The full set of available default rules with their categories and values.
 * @returns A complete markuplint `Config` object ready to be serialized to a file.
 */
export declare function createConfig(langs: readonly Langs[], mode: RuleSettingMode, defaultRules: DefaultRules): Config;
