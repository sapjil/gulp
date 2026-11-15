import { Duration } from "../../calculation/duration";
import { Timeunit } from "../../types";
export declare const REGEX_PARTS: {
    leftBoundary: string;
    rightBoundary: string;
    flags: string;
};
export declare function toWesternDigits(text: string): string;
export declare const WEEKDAY_DICTIONARY: {
    [word: string]: number;
};
export declare const FULL_MONTH_NAME_DICTIONARY: {
    [word: string]: number;
};
export declare const MONTH_DICTIONARY: {
    [word: string]: number;
};
export declare const INTEGER_WORD_DICTIONARY: {
    [word: string]: number;
};
export declare const ORDINAL_WORD_DICTIONARY: {
    [word: string]: number;
};
export declare const TIME_UNIT_DICTIONARY: {
    [word: string]: Timeunit;
};
export declare const DUAL_TIME_UNIT_DICTIONARY: {
    [word: string]: Timeunit;
};
export declare const NUMBER_PATTERN: string;
export declare function parseNumberPattern(match: string): number;
export declare const ORDINAL_NUMBER_PATTERN: string;
export declare function parseOrdinalNumberPattern(match: string): number;
export declare const YEAR_PATTERN = "(?:[1-9\u0661-\u0669][0-9\u0660-\u0669]{0,3}(?:\\s*(?:\u0645\u064A\u0644\u0627\u062F\u064A\u0629|\u0645\u064A\u0644\u0627\u062F\u064A|\u0645))?(?:\\s*(?:\u0642\u0628\u0644 \u0627\u0644\u0645\u064A\u0644\u0627\u062F|\u0642\\.\u0645))|[1-2\u0661-\u0662][0-9\u0660-\u0669]{3}(?:\\s*(?:\u0645\u064A\u0644\u0627\u062F\u064A\u0629|\u0645\u064A\u0644\u0627\u062F\u064A|\u0645))?|[5-9\u0665-\u0669][0-9\u0660-\u0669](?:\\s*(?:\u0645\u064A\u0644\u0627\u062F\u064A\u0629|\u0645\u064A\u0644\u0627\u062F\u064A|\u0645))?)";
export declare function parseYear(match: string): number;
export declare const TIME_UNIT_CONNECTOR_PATTERN = "\\s{0,5},?(?:\\s*\u0648)?\\s{0,5}";
export declare const TIME_UNITS_PATTERN: string;
export declare function parseDuration(timeunitText: string): Duration;
