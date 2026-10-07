import type { CustomSyntaxChecker } from '../types.js';
/**
 * Validates a link type attribute value against WHATWG and Microformats registries.
 *
 * Filters allowed keywords based on the element context (link, body link, a/area, or form).
 * Rejects dropped, non-HTML, and rejected link types from the Microformats wiki.
 *
 * @see https://html.spec.whatwg.org/multipage/links.html#linkTypes
 */
export declare const checkLinkType: CustomSyntaxChecker<{
    el: 'link' | 'body link' | 'a, area' | 'form';
}>;
