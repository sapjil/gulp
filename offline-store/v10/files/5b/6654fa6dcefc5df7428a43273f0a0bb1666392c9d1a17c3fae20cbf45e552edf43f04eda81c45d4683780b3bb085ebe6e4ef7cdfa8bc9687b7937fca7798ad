import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
export default class ARTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode?: boolean);
    patternFlags(): string;
    primaryPatternLeftBoundary(): string;
    followingPhase(): string;
    primaryPrefix(): string;
    primarySuffix(): string;
    followingSuffix(): string;
    getPrimaryTimePatternThroughCache(): RegExp;
    getFollowingTimePatternThroughCache(): RegExp;
    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents;
    extractFollowingTimeComponents(context: ParsingContext, match: RegExpMatchArray, result: any): null | ParsingComponents;
}
