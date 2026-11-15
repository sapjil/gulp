"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const results_1 = require("../../../results");
const AbstractParserWithWordBoundaryChecking_1 = require("./AbstractParserWithWordBoundaryChecking");
const duration_1 = require("../../../calculation/duration");
class ARTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(?:(?:منذ|قبل)\\s*(${constants_1.TIME_UNITS_PATTERN})|(${constants_1.TIME_UNITS_PATTERN})\\s*(?:مضت|سابقاً))`;
    }
    innerExtract(context, match) {
        const timeUnitsText = match[1] || match[2];
        const timeUnits = (0, constants_1.parseDuration)(timeUnitsText);
        const outputTimeUnits = (0, duration_1.reverseDuration)(timeUnits);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
    }
}
exports.default = ARTimeUnitAgoFormatParser;
//# sourceMappingURL=ARTimeUnitAgoFormatParser.js.map