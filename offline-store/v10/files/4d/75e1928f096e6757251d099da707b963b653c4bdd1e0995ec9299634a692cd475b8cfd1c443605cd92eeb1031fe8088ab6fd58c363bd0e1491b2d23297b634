import type { Langs } from './types.js';
/**
 * Determines the list of npm modules that need to be installed based on the
 * user's template language selections.
 *
 * Always includes `markuplint` itself, adds a parser package for each selected
 * language, and includes spec packages for Vue and React when applicable.
 *
 * @param selectedLangs - The template languages/frameworks selected by the user.
 * @returns An array of npm package names to install.
 */
export declare function selectModules(selectedLangs: readonly Langs[]): string[];
