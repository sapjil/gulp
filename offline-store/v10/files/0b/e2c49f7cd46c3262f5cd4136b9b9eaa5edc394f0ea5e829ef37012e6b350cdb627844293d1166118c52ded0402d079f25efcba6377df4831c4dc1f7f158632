import type { RuleSeed } from './types.js';
import type { MLDocument } from '../ml-dom/node/document.js';
import type { Ruleset } from '../ruleset/index.js';
import type { LocaleSet } from '@markuplint/i18n';
import type { GlobalRuleInfo, PlainData, Rule, RuleConfigValue, RuleInfo, Severity, Violation } from '@markuplint/ml-config';
/**
 * Represents a single markuplint rule that can verify documents and report violations.
 *
 * @template T - The type of the rule's configuration value
 * @template O - The type of the rule's options
 */
export declare class MLRule<T extends RuleConfigValue, O extends PlainData = undefined> {
    #private;
    readonly defaultOptions: O;
    readonly defaultSeverity: Severity;
    readonly defaultValue: T;
    readonly name: string;
    constructor(o: Readonly<RuleSeed<T, O>> & {
        readonly name: string;
    });
    /**
     * The following getter is unused internally,
     * only for extending from 3rd party library
     */
    protected get f(): RuleSeed<T, O>['fix'];
    /**
     * The following getter is unused internally,
     * only for extending from 3rd party library
     */
    protected get v(): RuleSeed<T, O>['verify'];
    /**
     * Resolves the full rule information from a ruleset, including node-level
     * and child-node-level overrides.
     *
     * @param ruleSet - The ruleset containing rule definitions and overrides
     * @param ruleName - The name of this rule
     * @returns The global rule info with node and child-node overrides
     */
    getRuleInfo(ruleSet: Ruleset, ruleName: string): GlobalRuleInfo<T, O>;
    /**
     * Normalizes a raw rule setting into a fully resolved {@link RuleInfo} object,
     * applying defaults for any unspecified fields.
     *
     * @param configSettings - The raw rule configuration value
     * @returns The resolved rule info with defaults applied
     */
    optimizeOption(configSettings: Rule<T, O> | null | undefined): RuleInfo<T, O>;
    /**
     * Executes this rule's verify (and optionally fix) function against a document,
     * then collects and returns the resulting violations.
     *
     * @param document - The parsed document to verify
     * @param locale - The locale set for translating violation messages
     * @param fix - Whether to also run the fix function
     * @returns An array of violations found by this rule
     */
    verify(document: MLDocument<T, O>, locale: LocaleSet, fix: boolean): Promise<Violation[]>;
    private _optimize;
}
/**
 * An MLRule with any value and option types. Used when the specific types are not known.
 */
export type AnyMLRule = MLRule<RuleConfigValue, PlainData>;
