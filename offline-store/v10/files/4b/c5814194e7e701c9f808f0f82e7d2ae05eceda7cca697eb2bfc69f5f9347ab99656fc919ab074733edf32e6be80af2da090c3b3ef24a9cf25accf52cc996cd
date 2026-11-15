import { parseDuration, TIME_UNITS_PATTERN } from "../constants.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
import { reverseDuration } from "../../../calculation/duration.js";
const PATTERN = new RegExp(`(${TIME_UNITS_PATTERN})\\s{0,5}(?:yang\\s+)?(?:lalu|silam|sebelumnya)(?=\\W|$)`, "i");
export default class IDTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const duration = parseDuration(match[1]);
        return ParsingComponents.createRelativeFromReference(context.reference, reverseDuration(duration));
    }
}
//# sourceMappingURL=IDTimeUnitAgoFormatParser.js.map