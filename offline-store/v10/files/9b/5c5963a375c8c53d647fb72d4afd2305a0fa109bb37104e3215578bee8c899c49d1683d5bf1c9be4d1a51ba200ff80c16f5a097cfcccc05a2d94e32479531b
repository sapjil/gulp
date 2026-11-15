"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const pattern_1 = require("../../../utils/pattern");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const weekdays_1 = require("../../../calculation/weekdays");
const PATTERN = new RegExp("(?:pada\\s+)?(hari\\s+)?" +
    `(${(0, pattern_1.matchAnyPattern)(constants_1.WEEKDAY_DICTIONARY)})` +
    "(?:\\s+(?:(?:minggu|pekan)\\s+)?(ini|depan|berikutnya|mendatang|yang\\s+lalu|lalu|kemarin))?" +
    "(?=\\W|$)", "i");
const HARI_PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const MODIFIER_GROUP = 3;
class IDWeekdayParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const weekdayWord = match[WEEKDAY_GROUP].toLowerCase();
        if (weekdayWord === "minggu" && !match[HARI_PREFIX_GROUP]) {
            return null;
        }
        const weekday = constants_1.WEEKDAY_DICTIONARY[weekdayWord];
        const modifierWord = (match[MODIFIER_GROUP] || "").toLowerCase().replace(/\s+/g, " ");
        let modifier = null;
        if (modifierWord === "ini") {
            modifier = "this";
        }
        else if (modifierWord === "depan" || modifierWord === "berikutnya" || modifierWord === "mendatang") {
            modifier = "next";
        }
        else if (modifierWord === "lalu" || modifierWord === "yang lalu" || modifierWord === "kemarin") {
            modifier = "last";
        }
        return (0, weekdays_1.createParsingComponentsAtWeekday)(context.reference, weekday, modifier);
    }
}
exports.default = IDWeekdayParser;
//# sourceMappingURL=IDWeekdayParser.js.map