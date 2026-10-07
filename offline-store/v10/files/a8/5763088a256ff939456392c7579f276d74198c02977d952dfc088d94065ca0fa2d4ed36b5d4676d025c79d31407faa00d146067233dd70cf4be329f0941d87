/**
 * Represents the outcome of an {@link installModule} operation.
 */
export type InstallModuleResult = {
    success: boolean;
    alreadyExists: boolean;
};
/**
 * Installs one or more npm packages using the detected package manager
 * (yarn or npm). Skips modules that are already installed locally.
 *
 * @param module - An array of module names to install
 * @param dev - When true, installs as a dev dependency (adds the `-D` flag)
 * @returns The result indicating success and whether all modules already existed
 */
export declare function installModule(module: readonly string[], dev?: boolean): Promise<InstallModuleResult>;
