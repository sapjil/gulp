import type { MLResultInfo } from '../types.js';
import type { Config, PlainData, RuleConfigValue } from '@markuplint/ml-config';
import type { MLRule } from '@markuplint/ml-core';
/**
 * Legacy v1 lint function provided for backward compatibility.
 *
 * Translates the v1 option shape into the current `lint` function's parameters
 * and delegates execution to it.
 *
 * @deprecated Use the `lint` function or `MLEngine` class from the current API instead.
 * @param options - The v1-style lint options including file paths, source codes, config, and rules.
 * @returns An array of lint result information objects, one per evaluated file.
 */
export declare function lint_v1(options: {
    /**
     * Glob pattern
     */
    readonly files?: string | readonly string[];
    /**
     * Target source code of evaluation
     */
    readonly sourceCodes?: string | readonly string[];
    /**
     * File names when `sourceCodes`
     */
    readonly names?: string | readonly string[];
    /**
     * Workspace path when `sourceCodes`
     */
    readonly workspace?: string;
    /**
     * Configure file or object
     */
    readonly config?: string | Config;
    /**
     * The config applied when not resolved from files or set it explicitly.
     */
    readonly defaultConfig?: Config;
    /**
     * Rules (default: `@markuplint/rules`)
     */
    readonly rules?: readonly Readonly<MLRule<RuleConfigValue, PlainData>>[];
    /**
     * Auto resolve rules
     *
     * Auto importing form *node_modules* when set `@markuplint/rule-{RULE_NAME}` or `markuplint-rule-{RULE_NAME}` in config rules
     */
    readonly rulesAutoResolve?: boolean;
    /**
     * Auto fix
     */
    readonly fix?: boolean;
    /**
     * Locale
     */
    readonly locale?: string;
}): Promise<MLResultInfo[]>;
