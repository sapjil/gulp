import { parseDuration, TIME_UNITS_PATTERN } from "../constants.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
const PATTERN = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:lagi|kemudian|setelahnya|sesudahnya|mendatang|ke\\s*depan)(?=\\W|$)`, "i");
export default class IDTimeUnitLaterFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const duration = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, duration);
    }
}
//# sourceMappingURL=IDTimeUnitLaterFormatParser.js.map