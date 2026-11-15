"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const years_1 = require("../../../calculation/years");
const pattern_1 = require("../../../utils/pattern");
const constants_2 = require("../constants");
const AbstractParserWithWordBoundaryChecking_1 = require("./AbstractParserWithWordBoundaryChecking");
const MONTH_NAME_GROUP = 1;
const YEAR_GROUP = 2;
class ARMonthNameParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return (`(?:(?:في|خلال)\\s*)?` +
            `(?:شهر\\s*)?` +
            `(${(0, pattern_1.matchAnyPattern)(constants_1.MONTH_DICTIONARY)})` +
            `(?:` +
            `(?:\\s*(?:،|,)?\\s*(?:سنة|عام)?\\s*)` +
            `(${constants_2.YEAR_PATTERN})` +
            `)?`);
    }
    innerExtract(context, match) {
        if (context.text.substring(0, match.index).match(/[0-9٠-٩]+\s*$/)) {
            return null;
        }
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        const month = constants_1.MONTH_DICTIONARY[monthName];
        if (!month) {
            return null;
        }
        const result = context.createParsingResult(match.index, match[0]);
        result.start.imply("day", 1);
        result.start.assign("month", month);
        if (match[YEAR_GROUP]) {
            const year = (0, constants_2.parseYear)(match[YEAR_GROUP]);
            result.start.assign("year", year);
        }
        else {
            const year = (0, years_1.findYearClosestToRef)(context.refDate, 1, month);
            result.start.imply("year", year);
        }
        return result;
    }
}
exports.default = ARMonthNameParser;
//# sourceMappingURL=ARMonthNameParser.js.map