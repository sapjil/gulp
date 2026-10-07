import type { MLFile } from './ml-file/index.js';
import type { ConfigSet } from './types.js';
import type { OptimizedConfig } from '@markuplint/ml-config';
import type { Nullable } from '@markuplint/shared';
/**
 * Manages loading, caching, and resolving markuplint configuration files.
 *
 * Handles `extends` chains, plugins, presets, overrides, and circular reference detection.
 * Configuration files are searched via cosmiconfig and cached by file path.
 */
export declare class ConfigProvider {
    #private;
    /**
     * Recursively loads a configuration and all its `extends` dependencies.
     *
     * @param key - The config file path or module name to load
     * @param cache - Whether to use cached results
     * @param referrer - The file path of the config that referenced this key
     * @param depth - Current recursion depth (for circular reference detection)
     * @returns A set of loaded config keys and any errors encountered
     */
    recursiveLoad(key: string, cache: boolean, referrer: string, depth?: number): Promise<{
        stack: Set<string>;
        errs: Error[];
    }>;
    /**
     * Resolves the full configuration for a target file by merging all named configs,
     * resolving plugins, and applying file-specific overrides.
     *
     * @param targetFile - The file being linted
     * @param names - Config file paths or module names to merge
     * @param cache - Whether to use cached results
     * @returns The fully resolved configuration set including plugins and errors
     */
    resolve(targetFile: Readonly<MLFile>, names: readonly Nullable<string>[], cache?: boolean): Promise<ConfigSet>;
    /**
     * Searches for a markuplint configuration file starting from the target file's directory.
     *
     * @param targetFile - The file whose directory to search from
     * @returns The file path of the found config, or `null` if none was found
     */
    search(targetFile: Readonly<MLFile>): Promise<string | null>;
    /**
     * Stores a pre-built configuration in the provider's internal store.
     *
     * @param config - The optimized configuration to store
     * @param key - An optional key to store the config under; auto-generated if omitted
     * @returns The key under which the config was stored
     */
    set(config: OptimizedConfig, key?: string): string;
    private _load;
    private _mergeConfigs;
    private _pathResolve;
    private _validateConfig;
}
