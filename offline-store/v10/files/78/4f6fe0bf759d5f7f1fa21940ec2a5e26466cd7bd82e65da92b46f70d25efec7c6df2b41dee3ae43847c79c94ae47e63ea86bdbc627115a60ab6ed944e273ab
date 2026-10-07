import type { Target } from '@markuplint/file-resolver';
import type { Config, RuleConfigValue, Rule, RegexSelector, PlainData } from '@markuplint/ml-config';
import type { AnyMLRule, RuleSeed } from '@markuplint/ml-core';
/**
 * Lints inline source code with a given configuration. Convenience function for testing.
 *
 * @param sourceCode - The markup source code to lint
 * @param config - The markuplint configuration to apply
 * @param rules - Optional custom rules; if omitted, preset rules are imported
 * @param locale - The locale for error messages (defaults to `'en'`)
 * @param fix - Whether to attempt auto-fixing
 * @returns An object containing violations and the fixed code
 */
export declare function mlTest(sourceCode: string, config: Config, rules?: readonly Readonly<AnyMLRule>[], locale?: string, fix?: boolean): Promise<{
    violations: readonly import("@markuplint/ml-config").Violation[];
    fixedCode: string;
}>;
/**
 * Tests a single rule against inline source code. Designed for rule unit testing.
 *
 * @template T - The rule's configuration value type
 * @template O - The rule's options type
 * @param rule - The rule seed to test
 * @param sourceCode - The markup source code to lint
 * @param config - Configuration with rule settings, nodeRule, and childNodeRule
 * @param fix - Whether to attempt auto-fixing
 * @param locale - The locale for error messages (defaults to `'en'`)
 * @returns An object containing violations (without ruleId) and the fixed code
 */
export declare function mlRuleTest<T extends RuleConfigValue, O extends PlainData>(rule: Readonly<RuleSeed<T, O>>, sourceCode: string, config?: Omit<Config, 'rules' | 'nodeRules' | 'childNodeRules'> & {
    rule?: Rule<T, Partial<O>>;
    nodeRule?: NodeRule<T, Partial<O>>[];
    childNodeRule?: ChildNodeRule<T, Partial<O>>[];
}, fix?: boolean, locale?: string): Promise<{
    violations: readonly import("@markuplint/ml-config").Violation[];
    fixedCode: string;
}>;
/**
 * Lints a file target with a given configuration. Convenience function for integration testing.
 *
 * @param target - A file path or inline source code target
 * @param config - The markuplint configuration to apply
 * @param rules - Optional custom rules; if omitted, preset rules are imported
 * @param locale - The locale for error messages
 * @param fix - Whether to attempt auto-fixing
 * @returns An object containing violations and the fixed code
 */
export declare function mlTestFile(target: Target, config?: Config, rules?: readonly Readonly<AnyMLRule>[], locale?: string, fix?: boolean): Promise<{
    violations: readonly import("@markuplint/ml-config").Violation[];
    fixedCode: string | undefined;
}>;
/**
 * A node-level rule override configuration for testing, targeting elements by selector.
 *
 * @template T - The rule's configuration value type
 * @template O - The rule's options type
 */
export interface NodeRule<T extends RuleConfigValue, O extends PlainData = undefined> {
    selector?: string;
    regexSelector?: RegexSelector;
    categories?: string[];
    roles?: string[];
    obsolete?: boolean;
    rule?: Rule<T, O>;
}
/**
 * A child-node-level rule override configuration for testing, targeting child elements by selector.
 *
 * @template T - The rule's configuration value type
 * @template O - The rule's options type
 */
export interface ChildNodeRule<T extends RuleConfigValue, O extends PlainData = undefined> {
    selector?: string;
    regexSelector?: RegexSelector;
    inheritance?: boolean;
    rule?: Rule<T, O>;
}
