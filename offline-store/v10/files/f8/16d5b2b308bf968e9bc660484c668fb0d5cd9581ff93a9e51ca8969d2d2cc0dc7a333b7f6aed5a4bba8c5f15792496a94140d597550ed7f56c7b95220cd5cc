import path from 'node:path';
import { generalImport } from './general-import.js';
import { toRegexp } from './utils.js';
const caches = new Map();
/**
 * Loading and importing form specs.
 *
 * Import a package or load a local file if regexp matches `filePath`.
 * ```json
 * {
 *   "specs": {
 *     "\\.html$": "aaa-aaa",
 *     "\\.ext$": "./bbb-bbb.json"
 *   },
 * }
 * ```
 *
 * The below ways are deprecated.
 *
 * ```json
 * {
 *   "specs": "xxx-xxx",
 * }
 * ```
 * ```json
 * {
 *   "specs": ["xxx-xxx", "./yyy-yyy.json"],
 * }
 * ```
 *
 * @param filePath - The path of the file being linted, used for pattern matching
 * @param specConfig - The `specs` property from the config, mapping file patterns to spec module names
 * @returns An object containing the base HTML spec and any matched extended specs as a schemas tuple
 */
export async function resolveSpecs(filePath, specConfig) {
    const htmlSpec = await importSpecs('@markuplint/html-spec');
    const extendedSpecs = [];
    if (specConfig) {
        if (typeof specConfig === 'string') {
            const spec = await importSpecs(specConfig);
            extendedSpecs.push(spec);
        }
        else {
            for (const pattern of Object.keys(specConfig)) {
                // eslint-disable-next-line unicorn/prefer-regexp-test
                if (path.basename(filePath).match(toRegexp(pattern))) {
                    const specModName = specConfig[pattern];
                    if (!specModName) {
                        continue;
                    }
                    const spec = await importSpecs(specModName);
                    extendedSpecs.push(spec);
                }
            }
        }
    }
    const schemas = [htmlSpec, ...extendedSpecs];
    return {
        schemas,
    };
}
async function importSpecs(specModName) {
    {
        // @ts-ignore
        const spec = caches.get(specModName);
        if (spec) {
            return spec;
        }
    }
    const spec = await generalImport(specModName);
    if (!spec) {
        throw new Error(`Spec "${specModName}" is not found.`);
    }
    caches.set(specModName, spec);
    return spec;
}
