"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const results_1 = require("../../../results");
const AbstractParserWithWordBoundaryChecking_1 = require("./AbstractParserWithWordBoundaryChecking");
class ARTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(?:في\\s*خلال|في\\s*غضون|في\\s*ظرف|خلال)\\s*(${constants_1.TIME_UNITS_PATTERN})`;
    }
    innerExtract(context, match) {
        const timeUnits = (0, constants_1.parseDuration)(match[1]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
exports.default = ARTimeUnitWithinFormatParser;
//# sourceMappingURL=ARTimeUnitWithinFormatParser.js.map