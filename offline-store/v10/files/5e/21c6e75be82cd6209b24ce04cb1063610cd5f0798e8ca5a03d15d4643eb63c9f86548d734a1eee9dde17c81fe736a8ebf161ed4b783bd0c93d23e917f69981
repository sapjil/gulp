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
class ARCasualTimeParser extends AbstractParserWithWordBoundaryChecking_1.AbstractParserWithLeftRightBoundaryChecking {
    innerPatternString(context) {
        return `(مساء\\s*(?:أمس|امس|البارحة)|(?:أمس|امس|البارحة)\\s*مساءً?|ليلة\\s*(?:أمس|امس|البارحة)|(?:أمس|امس|البارحة)\\s*ليلاً?|الليلة\\s*الماضية|منتصف\\s*النهار|منتصف\\s*الليل|هذا\\s*الصباح|هذا\\s*المساء|هذه\\s*الليلة|بعد\\s*الظهر|ظهر\\s*اليوم|الصباح|صباحاً|صباحا|الظهر|ظهراً|ظهرا|العصر|عصراً|عصرا|المساء|مساءً|مساء|الليلة|الليل|ليلاً|ليلا)`;
    }
    innerExtract(context, match) {
        const lowerText = match[1].toLowerCase();
        const component = context.createParsingComponents();
        if (lowerText.match(/مساء\s*(?:أمس|امس|البارحة)/) || lowerText.match(/(?:أمس|امس|البارحة)\s*مساء/)) {
            return references.yesterdayEvening(context.reference);
        }
        if (lowerText.match(/ليلة\s*(?:أمس|امس|البارحة)/) ||
            lowerText.match(/(?:أمس|امس|البارحة)\s*ليلاً?/) ||
            lowerText === "الليلة الماضية") {
            return references.lastNight(context.reference);
        }
        if (lowerText === "هذه الليلة" || lowerText === "الليلة") {
            return references.tonight(context.reference);
        }
        if (lowerText === "منتصف الليل") {
            return references.midnight(context.reference);
        }
        if (lowerText === "منتصف النهار" ||
            lowerText === "ظهر اليوم" ||
            lowerText === "الظهر" ||
            lowerText === "ظهراً" ||
            lowerText === "ظهرا") {
            return references.noon(context.reference);
        }
        if (lowerText === "بعد الظهر" || lowerText === "العصر" || lowerText === "عصراً" || lowerText === "عصرا") {
            return references.afternoon(context.reference);
        }
        if (lowerText === "هذا الصباح" || lowerText === "الصباح" || lowerText === "صباحاً" || lowerText === "صباحا") {
            return references.morning(context.reference);
        }
        if (lowerText === "هذا المساء" || lowerText === "المساء" || lowerText === "مساءً" || lowerText === "مساء") {
            return references.evening(context.reference);
        }
        if (lowerText === "الليل" || lowerText === "ليلاً" || lowerText === "ليلا") {
            return references.evening(context.reference, 22);
        }
        return component;
    }
}
exports.default = ARCasualTimeParser;
//# sourceMappingURL=ARCasualTimeParser.js.map