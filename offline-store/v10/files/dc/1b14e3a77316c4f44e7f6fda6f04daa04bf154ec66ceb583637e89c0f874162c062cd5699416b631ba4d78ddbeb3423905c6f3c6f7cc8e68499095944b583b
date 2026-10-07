import type { ElementSpec, ExtendedSpec, MLMLSpec } from '../types/index.js';
/**
 * Merges an HTML-spec schema with zero or more extended spec schemas into a single
 * unified specification. Extended specs can add or override global attributes,
 * ARIA definitions, content models, and element specifications.
 *
 * Ex: `@markuplint/html-spec` + `{ specs: { "\\.vue$": "@markuplint/vue-spec" } }` in configure files.
 *
 * @param schemas - A tuple where the first element is the base `MLMLSpec` and subsequent elements are extended specs to merge
 * @returns The merged specification combining the base spec with all extensions
 */
export declare function schemaToSpec(schemas: readonly [MLMLSpec, ...ExtendedSpec[]]): {
    cites: import("../types/index.js").Cites;
    def: import("../types/index.js").SpecDefs;
    specs: readonly ElementSpec[];
};
