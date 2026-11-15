import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary.js";
import * as references from "../../../common/casualReferences.js";
export default class ESCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context) {
        return /(ahora|hoy|mañana|manana|ayer)(?=\W|$)/i;
    }
    innerExtract(context, match) {
        const lowerText = match[0].toLowerCase();
        const component = context.createParsingComponents();
        if ((lowerText === "mañana" || lowerText === "manana") &&
            context.text.substring(0, match.index).match(/(?:^|[^\p{L}\p{N}\p{M}_])(?:a|en)\s+la\s*$/iu)) {
            return null;
        }
        switch (lowerText) {
            case "ahora":
                return references.now(context.reference);
            case "hoy":
                return references.today(context.reference);
            case "mañana":
            case "manana":
                return references.tomorrow(context.reference);
            case "ayer":
                return references.yesterday(context.reference);
        }
        return component;
    }
}
//# sourceMappingURL=ESCasualDateParser.js.map