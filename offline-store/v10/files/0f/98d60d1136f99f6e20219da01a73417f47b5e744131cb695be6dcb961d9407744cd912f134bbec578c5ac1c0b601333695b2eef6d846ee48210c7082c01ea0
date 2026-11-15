"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const years_1 = require("../../../calculation/years");
const constants_1 = require("../constants");
const pattern_1 = require("../../../utils/pattern");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const PATTERN = new RegExp("(?:(?:pada\\s+)?bulan\\s+)?" +
    `(${(0, pattern_1.matchAnyPattern)(constants_1.MONTH_DICTIONARY)})` +
    `(?:\\s*[,-]?\\s*(?:tahun\\s+)?(${constants_1.YEAR_PATTERN}))?` +
    "(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)", "i");
const MONTH_NAME_GROUP = 1;
const YEAR_GROUP = 2;
class IDMonthNameParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        if (monthName.length <= 3 && monthName !== "mei" && !match[YEAR_GROUP]) {
            return null;
        }
        const components = context.createParsingComponents();
        const month = constants_1.MONTH_DICTIONARY[monthName];
        components.imply("day", 1);
        components.assign("month", month);
        if (match[YEAR_GROUP]) {
            components.assign("year", (0, constants_1.parseYear)(match[YEAR_GROUP]));
        }
        else {
            components.imply("year", (0, years_1.findYearClosestToRef)(context.refDate, 1, month));
        }
        return components;
    }
}
exports.default = IDMonthNameParser;
//# sourceMappingURL=IDMonthNameParser.js.map