import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser.js";
import { Meridiem } from "../../../types.js";
const DAY_PERIOD_GROUP = 7;
export default class IDTimeExpressionParser extends AbstractTimeExpressionParser {
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
        components.assign("meridiem", hour >= 12 ? Meridiem.PM : Meridiem.AM);
        return components;
    }
}
//# sourceMappingURL=IDTimeExpressionParser.js.map