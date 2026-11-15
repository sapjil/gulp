import { findYearClosestToRef } from "../../../calculation/years.js";
import { MONTH_DICTIONARY, YEAR_PATTERN, parseYear } from "../constants.js";
import { matchAnyPattern } from "../../../utils/pattern.js";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
const PATTERN = new RegExp(`(${matchAnyPattern(MONTH_DICTIONARY)})` +
    "(?:-|/|\\s*,?\\s*)" +
    "([0-9]{1,2})" +
    "(?:" +
    "\\s*(?:-|–|s\\.d\\.?|s/d|sampai(?:\\s+dengan)?|hingga)\\s*" +
    "([0-9]{1,2})" +
    ")?" +
    "(?:" +
    "(?:-|/|\\s*,\\s*|\\s+)" +
    `(?:tahun\\s+)?(${YEAR_PATTERN})` +
    ")?" +
    "(?=\\W|$)(?![.:]\\d)", "i");
const MONTH_NAME_GROUP = 1;
const DATE_GROUP = 2;
const DATE_TO_GROUP = 3;
const YEAR_GROUP = 4;
export default class IDMonthNameMiddleEndianParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const month = MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseInt(match[DATE_GROUP]);
        if (day > 31) {
            return null;
        }
        const components = context.createParsingComponents({ day: day, month: month });
        if (match[YEAR_GROUP]) {
            components.assign("year", parseYear(match[YEAR_GROUP]));
        }
        else {
            components.imply("year", findYearClosestToRef(context.refDate, day, month));
        }
        if (!match[DATE_TO_GROUP]) {
            return components;
        }
        const endDate = parseInt(match[DATE_TO_GROUP]);
        if (endDate > 31) {
            return null;
        }
        const result = context.createParsingResult(match.index, match[0]);
        result.start = components;
        result.end = components.clone();
        result.end.assign("day", endDate);
        return result;
    }
}
//# sourceMappingURL=IDMonthNameMiddleEndianParser.js.map