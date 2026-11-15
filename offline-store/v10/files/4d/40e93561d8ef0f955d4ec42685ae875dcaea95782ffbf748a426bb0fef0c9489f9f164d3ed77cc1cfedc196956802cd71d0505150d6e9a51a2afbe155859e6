"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const years_1 = require("../../../calculation/years");
const constants_1 = require("../constants");
const pattern_1 = require("../../../utils/pattern");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const PATTERN = new RegExp(`(${(0, pattern_1.matchAnyPattern)(constants_1.MONTH_DICTIONARY)})` +
    "(?:-|/|\\s*,?\\s*)" +
    "([0-9]{1,2})" +
    "(?:" +
    "\\s*(?:-|–|s\\.d\\.?|s/d|sampai(?:\\s+dengan)?|hingga)\\s*" +
    "([0-9]{1,2})" +
    ")?" +
    "(?:" +
    "(?:-|/|\\s*,\\s*|\\s+)" +
    `(?:tahun\\s+)?(${constants_1.YEAR_PATTERN})` +
    ")?" +
    "(?=\\W|$)(?![.:]\\d)", "i");
const MONTH_NAME_GROUP = 1;
const DATE_GROUP = 2;
const DATE_TO_GROUP = 3;
const YEAR_GROUP = 4;
class IDMonthNameMiddleEndianParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseInt(match[DATE_GROUP]);
        if (day > 31) {
            return null;
        }
        const components = context.createParsingComponents({ day: day, month: month });
        if (match[YEAR_GROUP]) {
            components.assign("year", (0, constants_1.parseYear)(match[YEAR_GROUP]));
        }
        else {
            components.imply("year", (0, years_1.findYearClosestToRef)(context.refDate, day, month));
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
exports.default = IDMonthNameMiddleEndianParser;
//# sourceMappingURL=IDMonthNameMiddleEndianParser.js.map