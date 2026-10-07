import type { Options } from '../types.js';
import type { ElementChecker } from '@markuplint/ml-core';
/**
 * Checks whether a focusable interactive element is inside an `aria-hidden=true` subtree.
 *
 * Including Elements in the Accessibility Tree
 *
 * @see https://w3c.github.io/aria/#tree_inclusion
 * > Elements that are not hidden and may fire an accessibility API event, including:
 * > - Elements that are currently focused, even if the element or one of its ancestor elements has its aria-hidden attribute set to true.
 * > - Elements that are a valid target of an aria-activedescendant attribute.
 *
 * When a focused element exists within an `aria-hidden=true` ancestor, it is still
 * exposed to the accessibility tree. This situation is almost always unintentional --
 * while not strictly invalid per spec, it requires careful attention from the developer.
 *
 * @param el - The element node to inspect for focusability within a hidden context.
 * @returns A violation if the element is focusable and has `aria-hidden=true` on itself or an ancestor.
 */
export declare const checkingInteractionInHidden: ElementChecker<boolean, Options>;
