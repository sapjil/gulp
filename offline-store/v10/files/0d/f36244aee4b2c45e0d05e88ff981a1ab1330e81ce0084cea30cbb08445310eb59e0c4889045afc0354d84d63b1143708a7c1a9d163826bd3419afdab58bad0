"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTimeExpressionParser_1 = require("../../../common/parsers/AbstractTimeExpressionParser");
const types_1 = require("../../../types");
const DAY_PERIOD_GROUP = 7;
class IDTimeExpressionParser extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
    primaryPrefix() {
        return "(?:(?:pada\\s+)?(?:pukul|pkl\\.?|jam)\\s*)?";
    }
    followingPhase() {
        return "\\s*(?:\\-|\\–|\\~|\\〜|s\\.d\\.?|s/d|sampai(?:\\s+dengan)?|hingga)\\s*(?:(?:pukul|pkl\\.?|jam)\\s*)?";
    }
    primarySuffix() {
        return "(?:\\s*(pagi|siang|sore|petang|malam))?(?!/)(?=\\W|$)";
    }
    extractPrimaryTimeComponents(context, match) {
        if (match[0].match(/^\s*\d{4}\s*$/)) {
            return null;
        }
        const components = super.extractPrimaryTimeComponents(context, match);
        if (!components || !match[DAY_PERIOD_GROUP] || components.isCertain("meridiem")) {
            return components;
        }
        let hour = components.get("hour");
        if (hour > 12) {
            return components;
        }
        switch (match[DAY_PERIOD_GROUP].toLowerCase()) {
            case "pagi":
                if (hour == 12)
                    hour = 0;
                break;
            case "siang":
                if (hour < 10)
                    hour += 12;
                break;
            case "sore":
            case "petang":
                if (hour < 12)
                    hour += 12;
                break;
            case "malam":
                if (hour == 12)
                    hour = 0;
                else if (hour >= 5)
                    hour += 12;
                break;
        }
        components.assign("hour", hour);
        components.assign("meridiem", hour >= 12 ? types_1.Meridiem.PM : types_1.Meridiem.AM);
        return components;
    }
}
exports.default = IDTimeExpressionParser;
//# sourceMappingURL=IDTimeExpressionParser.js.map