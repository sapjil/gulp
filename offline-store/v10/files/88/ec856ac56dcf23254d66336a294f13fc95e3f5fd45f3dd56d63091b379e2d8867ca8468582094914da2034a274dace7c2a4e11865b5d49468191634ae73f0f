import type { ChildNode, Options, Result, Specs } from './types.js';
/**
 * A map tracking child nodes that are currently being evaluated through
 * a transparent content model. Used to prevent infinite recursion and
 * to enable special handling in error messages and debug output.
 */
export declare const transparentMode: Map<ChildNode, true>;
/**
 * Represents a possible resolution of transparent content model nodes,
 * containing the flattened list of child nodes to validate and any
 * errors detected during transparent model resolution.
 */
type TransparentNode = {
    nodes: ChildNode[];
    errors: Result[];
};
/**
 * Resolves transparent content model elements by replacing them with their
 * children for validation purposes. In HTML, elements like `<a>`, `<ins>`, and `<del>`
 * have transparent content models, meaning their children must be valid in the
 * parent's content model as if the transparent element were not present.
 *
 * This function:
 * 1. Identifies child elements with transparent content models.
 * 2. Filters out children that match non-transparent parts of the element's content model.
 * 3. Replaces the transparent element with its remaining (unmatched) children.
 * 4. Validates that each remaining child satisfies the transparent model's condition selector.
 * 5. Recursively resolves parent-level transparent nodes to propagate errors up the tree.
 * 6. Uses `branchesToPatterns` to handle branching when multiple resolutions are possible.
 *
 * @param childNodes - The child nodes of the element being validated, some of which may be transparent.
 * @param specs - The resolved spec data for content model lookups.
 * @param options - Validation behavior options.
 * @returns An array of possible transparent node resolutions, each with flattened nodes and accumulated errors.
 */
export declare function representTransparentNodes(childNodes: readonly ChildNode[], specs: Specs, options: Options): TransparentNode[];
export {};
