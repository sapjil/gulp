import { TIME_UNITS_PATTERN, parseDuration } from "../constants.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking.js";
export default class ARTimeUnitWithinFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(?:في\\s*خلال|في\\s*غضون|في\\s*ظرف|خلال)\\s*(${TIME_UNITS_PATTERN})`;
    }
    innerExtract(context, match) {
        const timeUnits = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
//# sourceMappingURL=ARTimeUnitWithinFormatParser.js.map