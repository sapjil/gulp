import type { SpecConfig } from '@markuplint/ml-config';
import type { ExtendedSpec, MLMLSpec } from '@markuplint/ml-spec';
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
export declare function resolveSpecs(filePath: string, specConfig?: SpecConfig): Promise<{
    schemas: readonly [MLMLSpec, ...ExtendedSpec[]];
}>;
