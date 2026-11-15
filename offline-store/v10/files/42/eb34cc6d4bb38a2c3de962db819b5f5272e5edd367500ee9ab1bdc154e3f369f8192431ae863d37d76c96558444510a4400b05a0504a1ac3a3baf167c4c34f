"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const results_1 = require("../../../results");
const AbstractParserWithWordBoundaryChecking_1 = require("./AbstractParserWithWordBoundaryChecking");
class ARTimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(?:(?:بعد)\\s*(${constants_1.TIME_UNITS_PATTERN})(?:\\s*من\\s*الآن)?|(${constants_1.TIME_UNITS_PATTERN})\\s*(?:من\\s*الآن|لاحقاً|لاحقا))`;
    }
    innerExtract(context, match) {
        const timeUnitsText = match[1] || match[2];
        const timeUnits = (0, constants_1.parseDuration)(timeUnitsText);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
exports.default = ARTimeUnitLaterFormatParser;
//# sourceMappingURL=ARTimeUnitLaterFormatParser.js.map