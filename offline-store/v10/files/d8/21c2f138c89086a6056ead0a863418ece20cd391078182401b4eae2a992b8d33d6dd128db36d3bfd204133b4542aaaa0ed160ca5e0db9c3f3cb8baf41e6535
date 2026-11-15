import { TIME_UNITS_PATTERN, parseDuration } from "../constants.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
const PATTERN_WITH_OPTIONAL_PREFIX = new RegExp(`(?:(?:en|por|durante|de|dentro de)\\s*)?(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
const PATTERN_WITH_PREFIX = new RegExp(`(?:en|por|durante|de|dentro de)\\s*(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
export default class ESTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    strictMode;
    constructor(strictMode) {
        super();
        this.strictMode = strictMode;
    }
    innerPattern(context) {
        return !this.strictMode && context.option.forwardDate ? PATTERN_WITH_OPTIONAL_PREFIX : PATTERN_WITH_PREFIX;
    }
    innerExtract(context, match) {
        const timeUnits = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
//# sourceMappingURL=ESTimeUnitWithinFormatParser.js.map