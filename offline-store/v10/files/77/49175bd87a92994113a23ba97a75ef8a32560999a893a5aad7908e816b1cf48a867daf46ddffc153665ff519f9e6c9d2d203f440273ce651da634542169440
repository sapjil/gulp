let globalSettings = {};
/**
 * Merges the provided settings into the current global settings.
 *
 * Settings are shallowly merged, so only the specified keys are overwritten.
 *
 * @param settings - A partial set of global settings to apply.
 */
export function setGlobal(settings) {
    globalSettings = {
        ...globalSettings,
        ...settings,
    };
}
/**
 * Returns the current global settings as a read-only object.
 *
 * @returns The current global settings.
 */
export function getGlobal() {
    return globalSettings;
}
