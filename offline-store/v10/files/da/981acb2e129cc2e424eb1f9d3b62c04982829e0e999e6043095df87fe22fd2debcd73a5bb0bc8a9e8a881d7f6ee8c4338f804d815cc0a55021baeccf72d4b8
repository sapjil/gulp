"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const years_1 = require("../../../calculation/years");
const pattern_1 = require("../../../utils/pattern");
const constants_2 = require("../constants");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const PATTERN = new RegExp(`((?:en)\\s*)?` +
    `(${(0, pattern_1.matchAnyPattern)(constants_1.MONTH_DICTIONARY)})` +
    `\\s*` +
    `(?:` +
    `(?:,|-|de)?\\s*(${constants_2.YEAR_PATTERN})?` +
    ")?" +
    "(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)", "i");
const PREFIX_GROUP = 1;
const MONTH_NAME_GROUP = 2;
const YEAR_GROUP = 3;
const DATE_PREFIX_PATTERN = new RegExp(`(?:^|[^\\p{L}\\p{N}\\p{M}_])${constants_1.ORDINAL_NUMBER_PATTERN}` +
    `(?:\\s*(?:desde|de|-|–|ao?|\\s)\\s*${constants_1.ORDINAL_NUMBER_PATTERN})?` +
    `\\s*(?:de)?\\s*(?:-|/|\\s*(?:de|,)?\\s*)$`, "iu");
class ESMonthNameParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const monthName = match[MONTH_NAME_GROUP].toLowerCase();
        if (context.text.substring(0, match.index).match(DATE_PREFIX_PATTERN)) {
            return null;
        }
        if (match[0].length <= 3 && !constants_1.FULL_MONTH_NAME_DICTIONARY[monthName]) {
            return null;
        }
        const result = context.createParsingResult(match.index + (match[PREFIX_GROUP] || "").length, match.index + match[0].length);
        result.start.imply("day", 1);
        result.start.addTag("parser/ESMonthNameParser");
        const month = constants_1.MONTH_DICTIONARY[monthName];
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
exports.default = ESMonthNameParser;
//# sourceMappingURL=ESMonthNameParser.js.map