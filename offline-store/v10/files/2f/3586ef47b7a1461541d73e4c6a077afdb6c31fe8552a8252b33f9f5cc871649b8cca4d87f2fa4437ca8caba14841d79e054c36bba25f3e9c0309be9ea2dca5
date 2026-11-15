import { parseDuration, TIME_UNITS_PATTERN } from "../constants.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
const PATTERN = new RegExp(`(?:dalam\\s+(?:waktu\\s+)?)(${TIME_UNITS_PATTERN})(?=\\W|$)`, "i");
export default class IDTimeUnitWithinFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const duration = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
//# sourceMappingURL=IDTimeUnitWithinFormatParser.js.map