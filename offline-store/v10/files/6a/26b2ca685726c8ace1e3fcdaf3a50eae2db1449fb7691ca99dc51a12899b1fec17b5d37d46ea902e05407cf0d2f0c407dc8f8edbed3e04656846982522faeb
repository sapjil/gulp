"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const years_1 = require("../../../calculation/years");
const constants_1 = require("../constants");
const pattern_1 = require("../../../utils/pattern");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const PATTERN = new RegExp("(?:(?:pada\\s+)?(?:tanggal|tgl\\.?)\\s*)?" +
    "([0-9]{1,2})" +
    "(?:\\s*(?:-|–|s\\.d\\.?|s/d|sampai(?:\\s+dengan)?|hingga)\\s*([0-9]{1,2}))?" +
    "(?:\\s*|-|/)" +
    `(${(0, pattern_1.matchAnyPattern)(constants_1.MONTH_DICTIONARY)})` +
    `(?:(?:\\s*|-|/|,\\s*)(?:tahun\\s+)?(${constants_1.YEAR_PATTERN}))?` +
    "(?=\\W|$)", "i");
const DATE_GROUP = 1;
const DATE_TO_GROUP = 2;
const MONTH_NAME_GROUP = 3;
const YEAR_GROUP = 4;
class IDMonthNameLittleEndianParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const result = context.createParsingResult(match.index, match[0]);
        const month = constants_1.MONTH_DICTIONARY[match[MONTH_NAME_GROUP].toLowerCase()];
        const day = parseInt(match[DATE_GROUP]);
        if (day > 31) {
            match.index = match.index + match[DATE_GROUP].length;
            return null;
        }
        result.start.assign("month", month);
        result.start.assign("day", day);
        if (match[YEAR_GROUP]) {
            result.start.assign("year", (0, constants_1.parseYear)(match[YEAR_GROUP]));
        }
        else {
            result.start.imply("year", (0, years_1.findYearClosestToRef)(context.refDate, day, month));
        }
        if (match[DATE_TO_GROUP]) {
            const endDate = parseInt(match[DATE_TO_GROUP]);
            if (endDate > 31) {
                return null;
            }
            result.end = result.start.clone();
            result.end.assign("day", endDate);
        }
        return result;
    }
}
exports.default = IDMonthNameLittleEndianParser;
//# sourceMappingURL=IDMonthNameLittleEndianParser.js.map