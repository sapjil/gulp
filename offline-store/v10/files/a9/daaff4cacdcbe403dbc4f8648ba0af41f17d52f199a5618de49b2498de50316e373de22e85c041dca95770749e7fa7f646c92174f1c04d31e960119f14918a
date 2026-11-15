import { ParsingContext } from "../../../chrono.js";
import { ParsingComponents } from "../../../results.js";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser.js";
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
