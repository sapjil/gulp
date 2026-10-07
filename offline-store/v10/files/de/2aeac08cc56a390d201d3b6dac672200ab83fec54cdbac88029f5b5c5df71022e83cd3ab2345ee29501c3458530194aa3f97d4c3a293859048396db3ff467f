import { resolveFiles } from '@markuplint/file-resolver';
import { MLEngine } from './ml-engine.js';
/**
 * Lints multiple targets (files or inline sources) and returns results for each.
 *
 * @param targetList - An array of file paths/globs or inline source code targets
 * @param options - API options for configuration, locale, rules, and behavior
 * @returns An array of lint results, one per processed file
 */
export async function lint(targetList, options) {
    const res = [];
    const files = await resolveFiles(targetList);
    for (const file of files) {
        const engine = new MLEngine(file, options);
        const result = await engine.exec();
        if (!result) {
            continue;
        }
        res.push(result);
    }
    return res;
}
