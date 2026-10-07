import type { TokenEachCheck } from '../../token/token-collection.js';
/**
 * Collection of token check functions for datetime component validation.
 *
 * Each property is a {@link TokenEachCheck} function that validates a specific
 * datetime component (year, month, date, hour, minute, second, etc.)
 * according to the WHATWG specification.
 */
export declare const datetimeTokenCheck: Record<'year' | 'month' | 'date' | 'hour' | 'minute' | 'second' | 'secondFractionalPart' | 'week' | 'hyphen' | 'colon' | 'extra' | 'colonOrEnd' | 'decimalPointOrEnd' | 'localDateTimeSeparator' | 'normalizedlocalDateTimeSeparator' | 'plusOrMinusSign' | 'weekSign', TokenEachCheck> & Record<'_year' | '_month', number | null>;
/**
 * Calculates the maximum ISO week number for a given year.
 *
 * @param year - The year to calculate for
 * @returns The maximum week number (52 or 53) for the year
 */
export declare function getMaxWeekNum(year: number): number;
