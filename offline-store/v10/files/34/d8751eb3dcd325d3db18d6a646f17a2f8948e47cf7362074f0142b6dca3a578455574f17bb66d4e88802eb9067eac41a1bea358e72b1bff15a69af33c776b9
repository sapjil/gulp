import type { Config, AnyRule, AnyRuleV2, OptimizedConfig } from './types.js';
import type { Nullable } from '@markuplint/shared';
/**
 * Deep-merges two markuplint configurations into an optimized result.
 *
 * Plugins, arrays, and rules are merged with specific strategies:
 * - Plugins are concatenated and deduplicated by name
 * - Arrays (excludeFiles, nodeRules, childNodeRules) are concatenated
 * - Rules are merged per-key with right-side precedence
 * - The `extends` property is removed from the result when `b` is provided
 *
 * @param a - The base configuration
 * @param b - The configuration to merge on top of `a`
 * @returns The merged and optimized configuration
 */
export declare function mergeConfig(a: Config, b?: Config): OptimizedConfig;
/**
 * Merges two rule configurations with right-side precedence.
 *
 * If `b` is `false`, the rule is unconditionally disabled.
 * If `b` is a direct value, it replaces or extends `a`.
 * If both are full config objects, their properties are merged.
 *
 * @param a - The base rule configuration (may be `null` or `undefined`)
 * @param b - The rule configuration to merge on top
 * @returns The merged rule configuration
 */
export declare function mergeRule(a: Nullable<AnyRule | AnyRuleV2>, b: AnyRule | AnyRuleV2): AnyRule;
