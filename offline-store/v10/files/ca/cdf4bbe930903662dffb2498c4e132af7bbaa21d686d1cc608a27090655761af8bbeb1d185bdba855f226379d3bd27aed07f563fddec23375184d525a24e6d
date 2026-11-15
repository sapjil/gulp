import { includeCommonConfiguration } from "../../configurations.js";
import { Chrono } from "../../chrono.js";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results.js";
import { Meridiem, Weekday } from "../../types.js";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser.js";
import IDCasualDateParser from "./parsers/IDCasualDateParser.js";
import IDCasualTimeParser from "./parsers/IDCasualTimeParser.js";
import IDMonthNameLittleEndianParser from "./parsers/IDMonthNameLittleEndianParser.js";
import IDMonthNameParser from "./parsers/IDMonthNameParser.js";
import IDMonthNameMiddleEndianParser from "./parsers/IDMonthNameMiddleEndianParser.js";
import IDWeekdayParser from "./parsers/IDWeekdayParser.js";
import IDTimeExpressionParser from "./parsers/IDTimeExpressionParser.js";
import IDTimeUnitAgoFormatParser from "./parsers/IDTimeUnitAgoFormatParser.js";
import IDTimeUnitLaterFormatParser from "./parsers/IDTimeUnitLaterFormatParser.js";
import IDTimeUnitWithinFormatParser from "./parsers/IDTimeUnitWithinFormatParser.js";
import IDRelativeDateFormatParser from "./parsers/IDRelativeDateFormatParser.js";
import IDMergeDateRangeRefiner from "./refiners/IDMergeDateRangeRefiner.js";
import IDMergeDateTimeRefiner from "./refiners/IDMergeDateTimeRefiner.js";
export { Chrono, ParsingResult, ParsingComponents, ReferenceWithTimezone };
export { Meridiem, Weekday };
export const casual = new Chrono(createCasualConfiguration());
export const strict = new Chrono(createConfiguration(true));
export function parse(text, ref, option) {
    return casual.parse(text, ref, option);
}
export function parseDate(text, ref, option) {
    return casual.parseDate(text, ref, option);
}
export function createCasualConfiguration(littleEndian = true) {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new IDCasualDateParser());
    option.parsers.unshift(new IDCasualTimeParser());
    option.parsers.unshift(new IDMonthNameParser());
    option.parsers.unshift(new IDRelativeDateFormatParser());
    return option;
}
export function createConfiguration(strictMode = true, littleEndian = true) {
    return includeCommonConfiguration({
        parsers: [
            new SlashDateFormatParser(littleEndian),
            new IDMonthNameLittleEndianParser(),
            new IDMonthNameMiddleEndianParser(),
            new IDWeekdayParser(),
            new IDTimeExpressionParser(strictMode),
            new IDTimeUnitWithinFormatParser(),
            new IDTimeUnitAgoFormatParser(),
            new IDTimeUnitLaterFormatParser(),
        ],
        refiners: [new IDMergeDateTimeRefiner(), new IDMergeDateRangeRefiner()],
    }, strictMode);
}
//# sourceMappingURL=index.js.map