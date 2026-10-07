import type { Token } from '../../token/index.js';
import type { CustomSyntaxChecker } from '../../types.js';
/**
 * Validates a time-zone offset string (`Z`, `+HH:MM`, or `-HH:MM`).
 *
 * @see https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#time-zones
 */
export declare const checkTimeZoneOffsetString: CustomSyntaxChecker;
/**
 * Parses and validates a time-zone offset string (e.g., `Z`, `+09:00`, `-05:30`).
 *
 * @param zone - The time-zone string or token to validate
 * @returns The validation result
 */
export declare function parseTimeZone(zone: string | Readonly<Token>): import("../../types.js").Result;
