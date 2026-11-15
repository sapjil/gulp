import { includeCommonConfiguration } from "../../configurations.js";
import { Chrono } from "../../chrono.js";
import { ParsingResult, ParsingComponents, ReferenceWithTimezone } from "../../results.js";
import { Meridiem, Weekday } from "../../types.js";
import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser.js";
import ARCasualDateParser from "./parsers/ARCasualDateParser.js";
import ARCasualTimeParser from "./parsers/ARCasualTimeParser.js";
import ARWeekdayParser from "./parsers/ARWeekdayParser.js";
import ARMonthNameLittleEndianParser from "./parsers/ARMonthNameLittleEndianParser.js";
import ARMonthNameParser from "./parsers/ARMonthNameParser.js";
import ARTimeExpressionParser from "./parsers/ARTimeExpressionParser.js";
import ARTimeUnitAgoFormatParser from "./parsers/ARTimeUnitAgoFormatParser.js";
import ARTimeUnitLaterFormatParser from "./parsers/ARTimeUnitLaterFormatParser.js";
import ARTimeUnitWithinFormatParser from "./parsers/ARTimeUnitWithinFormatParser.js";
import ARRelativeDateFormatParser from "./parsers/ARRelativeDateFormatParser.js";
import ARMergeDateTimeRefiner from "./refiners/ARMergeDateTimeRefiner.js";
import ARMergeDateRangeRefiner from "./refiners/ARMergeDateRangeRefiner.js";
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
    option.parsers.unshift(new ARCasualDateParser());
    option.parsers.unshift(new ARCasualTimeParser());
    option.parsers.unshift(new ARMonthNameParser());
    option.parsers.unshift(new ARRelativeDateFormatParser());
    return option;
}
export function createConfiguration(strictMode = true, littleEndian = true) {
    return includeCommonConfiguration({
        parsers: [
            new SlashDateFormatParser(littleEndian),
            new ARTimeUnitWithinFormatParser(),
            new ARMonthNameLittleEndianParser(),
            new ARWeekdayParser(),
            new ARTimeExpressionParser(strictMode),
            new ARTimeUnitAgoFormatParser(),
            new ARTimeUnitLaterFormatParser(),
        ],
        refiners: [new ARMergeDateTimeRefiner(), new ARMergeDateRangeRefiner()],
    }, strictMode);
}
//# sourceMappingURL=index.js.map