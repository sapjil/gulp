import { MONTH_DICTIONARY } from "../constants.js";
import { findYearClosestToRef } from "../../../calculation/years.js";
import { matchAnyPattern } from "../../../utils/pattern.js";
import { YEAR_PATTERN, parseYear } from "../constants.js";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking.js";
const MONTH_NAME_GROUP = 1;
const YEAR_GROUP = 2;
export default class ARMonthNameParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return (`(?:(?:في|خلال)\\s*)?` +
            `(?:شهر\\s*)?` +
            `(${matchAnyPattern(MONTH_DICTIONARY)})` +
            `(?:` +
            `(?:\\s*(?:،|,)?\\s*(?:سنة|عام)?\\s*)` +
            `(${YEAR_PATTERN})` +
            `)?`);
    }
    innerExtract(context, match) {
        if (context.text.substring(0, match.index).match(/[0-9٠-٩]+\s*$/)) {
            return null;
        }
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        const month = MONTH_DICTIONARY[monthName];
        if (!month) {
            return null;
        }
        const result = context.createParsingResult(match.index, match[0]);
        result.start.imply("day", 1);
        result.start.assign("month", month);
        if (match[YEAR_GROUP]) {
            const year = parseYear(match[YEAR_GROUP]);
            result.start.assign("year", year);
        }
        else {
            const year = findYearClosestToRef(context.refDate, 1, month);
            result.start.imply("year", year);
        }
        return result;
    }
}
//# sourceMappingURL=ARMonthNameParser.js.map