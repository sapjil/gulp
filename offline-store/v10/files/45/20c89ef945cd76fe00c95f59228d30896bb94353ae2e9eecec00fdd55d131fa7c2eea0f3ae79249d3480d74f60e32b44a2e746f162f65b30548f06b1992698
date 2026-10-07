import { toNoEmptyStringArrayFromStringOrArray } from '@markuplint/shared';
import { lint } from './lint.js';
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
export async function lint_v1(options) {
    const filePathList = toNoEmptyStringArrayFromStringOrArray(options.files);
    const codes = toNoEmptyStringArrayFromStringOrArray(options.sourceCodes);
    const files = [
        ...filePathList,
        ...codes.map((code, i) => ({
            sourceCode: code,
            name: Array.isArray(options.names) ? options.names?.[i] : options.names,
            workspace: options.workspace?.[i],
        })),
    ];
    let config;
    let configFile;
    if (typeof options.config === 'string') {
        configFile = options.config;
    }
    else if (options.config) {
        config = options.config;
    }
    const result = await lint(files, {
        config,
        configFile,
        noSearchConfig: filePathList.length === 0,
        rules: options.rules,
        autoLoad: options.rulesAutoResolve ?? true,
        locale: options.locale,
    });
    return result;
}
