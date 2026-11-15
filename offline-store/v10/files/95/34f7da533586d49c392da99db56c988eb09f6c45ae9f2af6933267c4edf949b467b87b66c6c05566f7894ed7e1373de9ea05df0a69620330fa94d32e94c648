"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const results_1 = require("../../../results");
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const PATTERN_WITH_OPTIONAL_PREFIX = new RegExp(`(?:(?:en|por|durante|de|dentro de)\\s*)?(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
const PATTERN_WITH_PREFIX = new RegExp(`(?:en|por|durante|de|dentro de)\\s*(${constants_1.TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
class ESTimeUnitWithinFormatParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    constructor(strictMode) {
        super();
        this.strictMode = strictMode;
    }
    innerPattern(context) {
        return !this.strictMode && context.option.forwardDate ? PATTERN_WITH_OPTIONAL_PREFIX : PATTERN_WITH_PREFIX;
    }
    innerExtract(context, match) {
        const timeUnits = (0, constants_1.parseDuration)(match[1]);
        return results_1.ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
exports.default = ESTimeUnitWithinFormatParser;
//# sourceMappingURL=ESTimeUnitWithinFormatParser.js.map