import type { ARIA } from '../../types/aria.js';
import type { ARIAVersion, Matches, MLMLSpec } from '../../types/index.js';
import type { ReadonlyDeep } from 'type-fest';
/**
 * Retrieves the resolved ARIA specification for an element, taking into account
 * ARIA version differences and conditional overrides based on the element's
 * current attribute state (e.g., `input[type=checkbox]` vs `input[type=text]`).
 *
 * @param specs - The full markup language specification
 * @param localName - The local tag name of the element
 * @param namespace - The namespace URI of the element, or null
 * @param version - The ARIA specification version to use
 * @param matches - A function that tests whether the element matches a CSS selector
 * @returns The resolved ARIA specification for the element, or null if no spec exists
 */
export declare function getARIA(specs: MLMLSpec, localName: string, namespace: string | null, version: ARIAVersion, matches: Matches): Omit<ReadonlyDeep<ARIA>, ARIAVersion | 'conditions'> | null;
