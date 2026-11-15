import { parseDuration, TIME_UNITS_PATTERN } from "../constants.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractParserWithLeftRightBoundaryChecking } from "./AbstractParserWithWordBoundaryChecking.js";
export default class ARTimeUnitLaterFormatParser extends AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(?:(?:بعد)\\s*(${TIME_UNITS_PATTERN})(?:\\s*من\\s*الآن)?|(${TIME_UNITS_PATTERN})\\s*(?:من\\s*الآن|لاحقاً|لاحقا))`;
    }
    innerExtract(context, match) {
        const timeUnitsText = match[1] || match[2];
        const timeUnits = parseDuration(timeUnitsText);
        return ParsingComponents.createRelativeFromReference(context.reference, timeUnits);
    }
}
//# sourceMappingURL=ARTimeUnitLaterFormatParser.js.map