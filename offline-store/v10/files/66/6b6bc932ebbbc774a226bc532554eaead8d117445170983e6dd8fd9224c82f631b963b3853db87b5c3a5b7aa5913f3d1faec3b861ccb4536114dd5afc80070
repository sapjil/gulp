import { findYearClosestToRef } from "../../../calculation/years.js";
import { MONTH_DICTIONARY, YEAR_PATTERN, parseYear } from "../constants.js";
import { matchAnyPattern } from "../../../utils/pattern.js";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
const PATTERN = new RegExp("(?:(?:pada\\s+)?bulan\\s+)?" +
    `(${matchAnyPattern(MONTH_DICTIONARY)})` +
    `(?:\\s*[,-]?\\s*(?:tahun\\s+)?(${YEAR_PATTERN}))?` +
    "(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)", "i");
const MONTH_NAME_GROUP = 1;
const YEAR_GROUP = 2;
export default class IDMonthNameParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        if (monthName.length <= 3 && monthName !== "mei" && !match[YEAR_GROUP]) {
            return null;
        }
        const components = context.createParsingComponents();
        const month = MONTH_DICTIONARY[monthName];
        components.imply("day", 1);
        components.assign("month", month);
        if (match[YEAR_GROUP]) {
            components.assign("year", parseYear(match[YEAR_GROUP]));
        }
        else {
            components.imply("year", findYearClosestToRef(context.refDate, 1, month));
        }
        return components;
    }
}
//# sourceMappingURL=IDMonthNameParser.js.map