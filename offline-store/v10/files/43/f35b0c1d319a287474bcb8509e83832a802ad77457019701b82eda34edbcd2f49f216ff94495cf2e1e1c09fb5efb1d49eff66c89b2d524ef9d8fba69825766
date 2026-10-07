/**
 * Shape of the global settings that apply across all markuplint operations.
 */
export type GlobalSettings = {
    readonly locale: string;
};
/**
 * Merges the provided settings into the current global settings.
 *
 * Settings are shallowly merged, so only the specified keys are overwritten.
 *
 * @param settings - A partial set of global settings to apply.
 */
export declare function setGlobal(settings: Partial<GlobalSettings>): void;
/**
 * Returns the current global settings as a read-only object.
 *
 * @returns The current global settings.
 */
export declare function getGlobal(): Readonly<Partial<GlobalSettings>>;
