import type { DateTime, Lang } from './types.js';
/**
 * Parses natural language datetime text into structured datetime data.
 *
 * Tries multiple locale parsers and returns the first successful parse result
 * with only the certain (non-implied) date/time components included.
 *
 * @param content - The text content to parse as a datetime.
 * @param langs - Locale codes to attempt parsing with.
 * @param base - Optional reference date for relative date parsing (e.g., "tomorrow").
 * @returns Parsed datetime data with timezone, or `null` if parsing fails.
 */
export declare function parseADatetime(content: string, langs: readonly Lang[], base?: Readonly<Date>): DateTime | null;
/**
 * Generates an HTML `datetime` attribute value from natural language text.
 *
 * Parses the text content using chrono-node and formats the result as an
 * ISO 8601-like datetime string suitable for the `datetime` attribute.
 *
 * @param content - The text content to parse.
 * @param langs - Locale codes to use for parsing. Defaults to all supported languages.
 * @returns A formatted datetime string, or `null` if the content cannot be parsed.
 */
export declare function getCandidateDatetimeString(content: string, langs?: Lang[]): string | null;
