"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const references = __importStar(require("../../../common/casualReferences"));
const AbstractParserWithWordBoundaryChecking_1 = require("./AbstractParserWithWordBoundaryChecking");
class ARCasualDateParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(الآن|الان|حالياً|حاليا|اليوم|أول\\s*(?:من\\s*)?أمس|اول\\s*(?:من\\s*)?امس|أول\\s*(?:من\\s*)?البارحة|اول\\s*(?:من\\s*)?البارحة|قبل\\s*(?:من\\s*)?أمس|قبل\\s*(?:من\\s*)?امس|أمس|امس|البارحة|بعد\\s*غد(?:اً|ا)?|بعد\\s*بكر[ةا]|غداً|غدا|بكر[ةا])`;
    }
    innerExtract(context, match) {
        const lowerText = match[1].toLowerCase();
        const component = context.createParsingComponents();
        if (lowerText === "الآن" || lowerText === "الان" || lowerText === "حالياً" || lowerText === "حاليا") {
            return references.now(context.reference);
        }
        if (lowerText === "اليوم") {
            return references.today(context.reference);
        }
        if (lowerText.match(/أول\s*(?:من\s*)?أمس/) ||
            lowerText.match(/اول\s*(?:من\s*)?امس/) ||
            lowerText.match(/أول\s*(?:من\s*)?البارحة/) ||
            lowerText.match(/اول\s*(?:من\s*)?البارحة/) ||
            lowerText.match(/قبل\s*(?:من\s*)?أمس/) ||
            lowerText.match(/قبل\s*(?:من\s*)?امس/)) {
            return references.theDayBefore(context.reference, 2);
        }
        if (lowerText === "أمس" || lowerText === "امس" || lowerText === "البارحة") {
            return references.yesterday(context.reference);
        }
        if (lowerText.match(/بعد\s*غد/) || lowerText.match(/بعد\s*بكر/)) {
            return references.theDayAfter(context.reference, 2);
        }
        if (lowerText === "غداً" || lowerText === "غدا" || lowerText.match(/^بكر[ةا]$/)) {
            return references.tomorrow(context.reference);
        }
        return component;
    }
}
exports.default = ARCasualDateParser;
//# sourceMappingURL=ARCasualDateParser.js.map