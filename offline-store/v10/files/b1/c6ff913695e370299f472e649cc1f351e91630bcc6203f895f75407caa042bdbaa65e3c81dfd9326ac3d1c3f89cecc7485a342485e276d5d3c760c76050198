"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const pattern_1 = require("../../../utils/pattern");
const weekdays_1 = require("../../../calculation/weekdays");
const AbstractParserWithWordBoundaryChecking_1 = require("./AbstractParserWithWordBoundaryChecking");
const PREFIX_GROUP = 1;
const WEEKDAY_GROUP = 2;
const POSTFIX_GROUP = 3;
class ARWeekdayParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return (`(?:(?:,|\\(|（)\\s*)?` +
            `(?:يوم\\s*)?` +
            `(?:(هذا|هذه|الماضي|الماضية|السابق|السابقة|القادم|القادمة|المقبل|المقبلة)\\s+)?` +
            `(${(0, pattern_1.matchAnyPattern)(constants_1.WEEKDAY_DICTIONARY)})` +
            `(?:\\s+(هذا|هذه|الماضي|الماضية|السابق|السابقة|المنصرم|المنصرمة|القادم|القادمة|المقبل|المقبلة))?` +
            `(?:\\s*(?:,|\\)|）))?`);
    }
    innerExtract(context, match) {
        const dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        const weekday = constants_1.WEEKDAY_DICTIONARY[dayOfWeek];
        const prefix = match[PREFIX_GROUP];
        const postfix = match[POSTFIX_GROUP];
        const modifierWord = (prefix || postfix || "").toLowerCase();
        let modifier = null;
        if (modifierWord === "الماضي" ||
            modifierWord === "الماضية" ||
            modifierWord === "السابق" ||
            modifierWord === "السابقة" ||
            modifierWord === "المنصرم" ||
            modifierWord === "المنصرمة") {
            modifier = "last";
        }
        else if (modifierWord === "القادم" ||
            modifierWord === "القادمة" ||
            modifierWord === "المقبل" ||
            modifierWord === "المقبلة") {
            modifier = "next";
        }
        else if (modifierWord === "هذا" || modifierWord === "هذه") {
            modifier = "this";
        }
        return (0, weekdays_1.createParsingComponentsAtWeekday)(context.reference, weekday, modifier);
    }
}
exports.default = ARWeekdayParser;
//# sourceMappingURL=ARWeekdayParser.js.map