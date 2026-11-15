import { findYearClosestToRef } from "../../../calculation/years.js";
import { MONTH_DICTIONARY } from "../constants.js";
import { YEAR_PATTERN, parseYear } from "../constants.js";
import { ORDINAL_NUMBER_PATTERN, parseOrdinalNumberPattern } from "../constants.js";
import { matchAnyPattern } from "../../../utils/pattern.js";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking.js";
const DATE_GROUP = 1;
const DATE_TO_GROUP = 2;
const MONTH_NAME_GROUP = 3;
const YEAR_GROUP = 4;
export default class ARMonthNameLittleEndianParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return (`(?:(?:في|من)\\s*)?` +
            `(${ORDINAL_NUMBER_PATTERN})` +
            `(?:` +
            `\\s*(?:إلى|وحتى|حتى|-|–)\\s*` +
            `(${ORDINAL_NUMBER_PATTERN})` +
            `)?` +
            `(?:\\s*(?:من)?\\s*)` +
            `(${matchAnyPattern(MONTH_DICTIONARY)})` +
            `(?:` +
            `(?:\\s*(?:،|,)?\\s*(?:سنة|عام)?\\s*)` +
            `(${YEAR_PATTERN}(?![^\\s]\\d))` +
            `)?`);
    }
    innerExtract(context, match) {
        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseOrdinalNumberPattern(match[DATE_GROUP]);
        if (day > 31 || day < 1) {
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }
        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
            const yearNumber = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", yearNumber);
        }
        else {
            const year = findYearClosestToRef(context.refDate, day, month);
            result.start.imply("year", year);
        }
        if (match[DATE_TO_GROUP]) {
            const endDate = parseOrdinalNumberPattern(match[DATE_TO_GROUP]);
            result.end = result.start.clone();
            result.end.assign("day", endDate);
        }
        return result;
    }
}
//# sourceMappingURL=ARMonthNameLittleEndianParser.js.map