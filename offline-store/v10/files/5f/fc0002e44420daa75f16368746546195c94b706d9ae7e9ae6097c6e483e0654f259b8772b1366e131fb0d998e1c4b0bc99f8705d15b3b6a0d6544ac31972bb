"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("../../../results");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const PATTERN = new RegExp("(minggu|pekan|bulan|tahun)\\s+(ini|depan|berikutnya|mendatang|yang\\s+lalu|lalu|kemarin)(?=\\W|$)", "i");
const UNIT_WORD_GROUP = 1;
const MODIFIER_WORD_GROUP = 2;
const UNIT_WORD_TO_TIMEUNIT = {
    minggu: "week",
    pekan: "week",
    bulan: "month",
    tahun: "year",
};
class IDRelativeDateFormatParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const unitWord = match[UNIT_WORD_GROUP].toLowerCase();
        const modifier = match[MODIFIER_WORD_GROUP].toLowerCase().replace(/\s+/g, " ");
        const timeunit = UNIT_WORD_TO_TIMEUNIT[unitWord];
        if (modifier == "depan" || modifier == "berikutnya" || modifier == "mendatang") {
            return results_1.ParsingComponents.createRelativeFromReference(context.reference, { [timeunit]: 1 });
        }
        if (modifier == "lalu" || modifier == "yang lalu" || modifier == "kemarin") {
            return results_1.ParsingComponents.createRelativeFromReference(context.reference, { [timeunit]: -1 });
        }
        const components = context.createParsingComponents();
        const date = new Date(context.reference.instant.getTime());
        if (timeunit == "week") {
            date.setDate(date.getDate() - date.getDay());
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.imply("year", date.getFullYear());
        }
        else if (timeunit == "month") {
            date.setDate(1);
            components.imply("day", date.getDate());
            components.assign("year", date.getFullYear());
            components.assign("month", date.getMonth() + 1);
        }
        else if (timeunit == "year") {
            date.setDate(1);
            date.setMonth(0);
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
        }
        return components;
    }
}
exports.default = IDRelativeDateFormatParser;
//# sourceMappingURL=IDRelativeDateFormatParser.js.map