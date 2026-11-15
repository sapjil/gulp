"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const results_1 = require("../../../results");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const PATTERN = new RegExp(`(?:dalam\\s+(?:waktu\\s+)?)(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
class IDTimeUnitWithinFormatParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const duration = (0, constants_1.parseDuration)(match[1]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
exports.default = IDTimeUnitWithinFormatParser;
//# sourceMappingURL=IDTimeUnitWithinFormatParser.js.map