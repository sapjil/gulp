import type { ChildNode, Result } from './types.js';
/**
 * Handles the transparent content model pattern by passing all child nodes
 * through as matched. In HTML, a transparent element inherits the content model
 * of its parent, so its children are validated against the parent's model instead.
 *
 * If the element is a component root (has no grandparent element), all children
 * are treated as matched. Otherwise, validation is deferred to the parent's
 * content model processing.
 *
 * @param childNodes - The child nodes to evaluate under the transparent model.
 * @returns A result indicating all children are matched (validation deferred to parent).
 */
export declare function transparent(childNodes: readonly ChildNode[]): Result;
