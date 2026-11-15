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
const AbstractParserWithWordBoundary_1 = require("../../../common/parsers/AbstractParserWithWordBoundary");
const references = __importStar(require("../../../common/casualReferences"));
const PATTERN = /(sekarang|saat\s+ini|hari\s+ini|kemarin\s+lusa|kemarin|besok\s+lusa|besok|lusa|nanti\s+malam|malam\s+ini|tadi\s+malam|semalam)(?=\W|$)/i;
class IDCasualDateParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        const lowerText = match[1].toLowerCase().replace(/\s+/g, " ");
        switch (lowerText) {
            case "sekarang":
            case "saat ini":
                return references.now(context.reference);
            case "hari ini":
                return references.today(context.reference);
            case "kemarin":
                return references.yesterday(context.reference);
            case "kemarin lusa":
                return references.theDayBefore(context.reference, 2);
            case "besok":
                return references.tomorrow(context.reference);
            case "lusa":
            case "besok lusa":
                return references.theDayAfter(context.reference, 2);
            case "nanti malam":
            case "malam ini":
                return references.tonight(context.reference);
            case "tadi malam":
            case "semalam":
                return references.lastNight(context.reference);
        }
        return context.createParsingComponents();
    }
}
exports.default = IDCasualDateParser;
//# sourceMappingURL=IDCasualDateParser.js.map