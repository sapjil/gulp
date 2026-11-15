"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const years_1 = require("../../../calculation/years");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
const constants_3 = require("../constants");
const pattern_1 = require("../../../utils/pattern");
const AbstractParserWithWordBoundaryChecking_1 = require("./AbstractParserWithWordBoundaryChecking");
const DATE_GROUP = 1;
const DATE_TO_GROUP = 2;
const MONTH_NAME_GROUP = 3;
const YEAR_GROUP = 4;
class ARMonthNameLittleEndianParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return (`(?:(?:في|من)\\s*)?` +
            `(${constants_3.ORDINAL_NUMBER_PATTERN})` +
            `(?:` +
            `\\s*(?:إلى|وحتى|حتى|-|–)\\s*` +
            `(${constants_3.ORDINAL_NUMBER_PATTERN})` +
            `)?` +
            `(?:\\s*(?:من)?\\s*)` +
            `(${(0, pattern_1.matchAnyPattern)(constants_1.MONTH_DICTIONARY)})` +
            `(?:` +
            `(?:\\s*(?:،|,)?\\s*(?:سنة|عام)?\\s*)` +
            `(${constants_2.YEAR_PATTERN}(?![^\\s]\\d))` +
            `)?`);
    }
    innerExtract(context, match) {
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = (0, constants_3.parseOrdinalNumberPattern)(match[DATE_GROUP]);
        if (day > 31 || day < 1) {
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }
        const result = context.createParsingResult(match.index, match[0]);
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
            const yearNumber = (0, constants_2.parseYear)(match[YEAR_GROUP]);
            result.start.assign("year", yearNumber);
        }
        else {
            const year = (0, years_1.findYearClosestToRef)(context.refDate, day, month);
            result.start.imply("year", year);
        }
        if (match[DATE_TO_GROUP]) {
            const endDate = (0, constants_3.parseOrdinalNumberPattern)(match[DATE_TO_GROUP]);
            result.end = result.start.clone();
            result.end.assign("day", endDate);
        }
        return result;
    }
}
exports.default = ARMonthNameLittleEndianParser;
//# sourceMappingURL=ARMonthNameLittleEndianParser.js.map