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
const casualReferences = __importStar(require("../../../common/casualReferences"));
const PATTERN = /(?:(?:pada|di)\s+)?(tengah\s+malam|tengah\s+hari|pagi|siang|sore|petang|malam(?!\s+ini))(?:\s+ini)?(?=\W|$)/i;
class IDCasualTimeParser extends AbstractParserWithWordBoundary_1.AbstractParserWithWordBoundaryChecking {
    innerPattern() {
        return PATTERN;
    }
    innerExtract(context, match) {
        switch (match[1].toLowerCase().replace(/\s+/g, " ")) {
            case "pagi":
                return casualReferences.morning(context.reference);
            case "siang":
            case "tengah hari":
                return casualReferences.noon(context.reference);
            case "sore":
            case "petang":
                return casualReferences.afternoon(context.reference);
            case "malam":
                return casualReferences.evening(context.reference);
            case "tengah malam":
                return casualReferences.midnight(context.reference);
        }
        return null;
    }
}
exports.default = IDCasualTimeParser;
//# sourceMappingURL=IDCasualTimeParser.js.map