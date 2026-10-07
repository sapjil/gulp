import type { APIOptions, MLEngineEventMap } from './types.js';
import type { MLResultInfo } from '../types.js';
import type { ConfigSet, MLFile, Target } from '@markuplint/file-resolver';
import type { PlainData } from '@markuplint/ml-config';
import type { Document, RuleConfigValue } from '@markuplint/ml-core';
import { Emitter } from 'strict-event-emitter';
type MLEngineOptions = {
    readonly debug?: boolean;
    readonly watch?: boolean;
};
/**
 * Options for creating an {@link MLEngine} from inline source code.
 */
export type FromCodeOptions = APIOptions & MLEngineOptions & {
    /** Optional filename for the inline source code */
    readonly name?: string;
    /** Optional working directory for config resolution */
    readonly dirname?: string;
};
/**
 * The main markuplint engine that orchestrates file resolution, configuration loading,
 * parsing, and linting. Supports both single-file and watch-mode operation.
 *
 * Emits events at each stage of the linting pipeline for monitoring and debugging.
 */
export declare class MLEngine extends Emitter<MLEngineEventMap> {
    #private;
    /**
     * Creates an MLEngine instance from inline source code.
     *
     * @param sourceCode - The markup source code to lint
     * @param options - Options for configuration, naming, and behavior
     * @returns A new MLEngine instance ready to lint the provided code
     */
    static fromCode(sourceCode: string, options?: FromCodeOptions): Promise<MLEngine>;
    /**
     * Converts a target (file path or inline source) into an MLFile instance.
     *
     * @param target - A file path string or inline source code target
     * @returns The resolved MLFile, or `undefined` if resolution failed
     */
    static toMLFile(target: Target): Promise<MLFile | undefined>;
    constructor(file: Readonly<MLFile>, options?: APIOptions & MLEngineOptions);
    /**
     * The parsed document, or `null` if not yet set up or if parsing failed.
     */
    get document(): Document<RuleConfigValue, PlainData> | null;
    /**
     * Closes the engine, removing all event listeners and stopping the file watcher.
     */
    close(): Promise<void>;
    /**
     * Executes linting on the target file and returns the results.
     *
     * Sets up the engine on first call, then verifies the document against all rules.
     *
     * @returns The lint result including violations and fixed code, or `null` if setup was skipped
     */
    exec(): Promise<MLResultInfo | null>;
    /**
     * Updates the source code and re-parses the document without re-resolving configuration.
     *
     * @param code - The new markup source code
     */
    setCode(code: string): Promise<void>;
    /**
     * Enables or disables watch mode. When enabled, the engine watches config files
     * for changes and re-lints automatically.
     *
     * @param enable - Whether to enable watch mode
     */
    watchMode(enable: boolean): void;
    private createCore;
    private i18n;
    private onChange;
    private provide;
    resolveConfig(cache: boolean): Promise<ConfigSet>;
    private resolveParser;
    private resolvePretenders;
    private resolveRules;
    private resolveRuleset;
    private resolveSchemas;
    private setup;
}
export {};
