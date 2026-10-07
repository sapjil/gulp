import { MLRule } from '@markuplint/ml-core';
import { lint } from '../api/index.js';
import { getGlobal } from '../global-settings.js';
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
export async function mlTest(sourceCode, config, rules, locale = 'en', fix = false) {
    const global = getGlobal();
    const results = await lint([{ sourceCode }], {
        config,
        rules,
        locale: locale ?? global.locale,
        fix,
        ignoreExt: true,
        autoLoad: true,
        importPresetRules: !rules,
    });
    const result = results[0];
    return {
        violations: result?.violations ?? [],
        fixedCode: result?.fixedCode ?? sourceCode,
    };
}
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
export async function mlRuleTest(rule, sourceCode, 
// eslint-disable-next-line unicorn/no-object-as-default-parameter
config = { rule: true }, fix = false, locale = 'en') {
    if (config.rule === undefined && (config.nodeRule || config.childNodeRule)) {
        config.rule = true;
    }
    const _config = {
        ...config,
        rules: config.rule === undefined
            ? config.rule === undefined && config.nodeRule === undefined && config.childNodeRule === undefined
                ? {
                    '<current-rule>': true,
                }
                : undefined
            : {
                '<current-rule>': config.rule,
            },
        nodeRules: config.nodeRule === undefined
            ? undefined
            : config.nodeRule.map(nodeConfig => ({
                ...nodeConfig,
                rules: nodeConfig.rule === undefined
                    ? undefined
                    : {
                        '<current-rule>': nodeConfig.rule,
                    },
            })),
        childNodeRules: config.childNodeRule === undefined
            ? undefined
            : config.childNodeRule.map(childNodeConfig => ({
                ...childNodeConfig,
                rules: childNodeConfig.rule === undefined
                    ? undefined
                    : {
                        '<current-rule>': childNodeConfig.rule,
                    },
            })),
    };
    const res = await mlTest(sourceCode, _config, [
        new MLRule({
            name: '<current-rule>',
            ...rule,
        }),
    ], locale, fix);
    res.violations.map(v => {
        // @ts-ignore
        delete v.ruleId;
    });
    return res;
}
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
export async function mlTestFile(target, config, rules, locale, fix = false) {
    const global = getGlobal();
    const results = await lint([target], {
        config,
        rules,
        locale: locale ?? global.locale,
        fix,
        ignoreExt: true,
        noSearchConfig: !!config,
        autoLoad: true,
        importPresetRules: !rules,
    });
    const result = results[0];
    return {
        violations: result?.violations ?? [],
        fixedCode: result?.fixedCode ?? result?.sourceCode,
    };
}
