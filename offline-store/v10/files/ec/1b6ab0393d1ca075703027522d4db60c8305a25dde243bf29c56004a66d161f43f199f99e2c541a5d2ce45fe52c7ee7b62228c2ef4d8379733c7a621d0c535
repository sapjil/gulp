import { WEEKDAY_DICTIONARY } from "../constants.js";
import { matchAnyPattern } from "../../../utils/pattern.js";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
import { createParsingComponentsAtWeekday } from "../../../calculation/weekdays.js";
const PATTERN = new RegExp("(?:pada\\s+)?(hari\\s+)?" +
    `(${matchAnyPattern(WEEKDAY_DICTIONARY)})` +
    "(?:\\s+(?:(?:minggu|pekan)\\s+)?(ini|depan|berikutnya|mendatang|yang\\s+lalu|lalu|kemarin))?" +
    "(?=\\W|$)", "i");
const HARI_PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const MODIFIER_GROUP = 3;
export default class IDWeekdayParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const weekdayWord = match[WEEKDAY_GROUP].toLowerCase();
        if (weekdayWord === "minggu" && !match[HARI_PREFIX_GROUP]) {
            return null;
        }
        const weekday = WEEKDAY_DICTIONARY[weekdayWord];
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
        return createParsingComponentsAtWeekday(context.reference, weekday, modifier);
    }
}
//# sourceMappingURL=IDWeekdayParser.js.map