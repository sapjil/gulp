import { parseDuration, TIME_UNITS_PATTERN } from "../constants.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking.js";
import { reverseDuration } from "../../../calculation/duration.js";
export default class ARTimeUnitAgoFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(?:(?:منذ|قبل)\\s*(${TIME_UNITS_PATTERN})|(${TIME_UNITS_PATTERN})\\s*(?:مضت|سابقاً))`;
    }
    innerExtract(context, match) {
        const timeUnitsText = match[1] || match[2];
        const timeUnits = parseDuration(timeUnitsText);
        const outputTimeUnits = reverseDuration(timeUnits);
        return ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
    }
}
//# sourceMappingURL=ARTimeUnitAgoFormatParser.js.map