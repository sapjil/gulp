"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strict = exports.casual = exports.Weekday = exports.Meridiem = exports.ReferenceWithTimezone = exports.ParsingComponents = exports.ParsingResult = exports.Chrono = void 0;
exports.parse = parse;
exports.parseDate = parseDate;
exports.createCasualConfiguration = createCasualConfiguration;
exports.createConfiguration = createConfiguration;
const configurations_1 = require("../../configurations");
const chrono_1 = require("../../chrono");
Object.defineProperty(exports, "Chrono", { enumerable: true, get: function () { return chrono_1.Chrono; } });
const results_1 = require("../../results");
Object.defineProperty(exports, "ParsingResult", { enumerable: true, get: function () { return results_1.ParsingResult; } });
Object.defineProperty(exports, "ParsingComponents", { enumerable: true, get: function () { return results_1.ParsingComponents; } });
Object.defineProperty(exports, "ReferenceWithTimezone", { enumerable: true, get: function () { return results_1.ReferenceWithTimezone; } });
const types_1 = require("../../types");
Object.defineProperty(exports, "Meridiem", { enumerable: true, get: function () { return types_1.Meridiem; } });
Object.defineProperty(exports, "Weekday", { enumerable: true, get: function () { return types_1.Weekday; } });
const SlashDateFormatParser_1 = __importDefault(require("../../common/parsers/SlashDateFormatParser"));
const ARCasualDateParser_1 = __importDefault(require("./parsers/ARCasualDateParser"));
const ARCasualTimeParser_1 = __importDefault(require("./parsers/ARCasualTimeParser"));
const ARWeekdayParser_1 = __importDefault(require("./parsers/ARWeekdayParser"));
const ARMonthNameLittleEndianParser_1 = __importDefault(require("./parsers/ARMonthNameLittleEndianParser"));
const ARMonthNameParser_1 = __importDefault(require("./parsers/ARMonthNameParser"));
const ARTimeExpressionParser_1 = __importDefault(require("./parsers/ARTimeExpressionParser"));
const ARTimeUnitAgoFormatParser_1 = __importDefault(require("./parsers/ARTimeUnitAgoFormatParser"));
const ARTimeUnitLaterFormatParser_1 = __importDefault(require("./parsers/ARTimeUnitLaterFormatParser"));
const ARTimeUnitWithinFormatParser_1 = __importDefault(require("./parsers/ARTimeUnitWithinFormatParser"));
const ARRelativeDateFormatParser_1 = __importDefault(require("./parsers/ARRelativeDateFormatParser"));
const ARMergeDateTimeRefiner_1 = __importDefault(require("./refiners/ARMergeDateTimeRefiner"));
const ARMergeDateRangeRefiner_1 = __importDefault(require("./refiners/ARMergeDateRangeRefiner"));
exports.casual = new chrono_1.Chrono(createCasualConfiguration());
exports.strict = new chrono_1.Chrono(createConfiguration(true));
function parse(text, ref, option) {
    return exports.casual.parse(text, ref, option);
}
function parseDate(text, ref, option) {
    return exports.casual.parseDate(text, ref, option);
}
function createCasualConfiguration(littleEndian = true) {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new ARCasualDateParser_1.default());
    option.parsers.unshift(new ARCasualTimeParser_1.default());
    option.parsers.unshift(new ARMonthNameParser_1.default());
    option.parsers.unshift(new ARRelativeDateFormatParser_1.default());
    return option;
}
function createConfiguration(strictMode = true, littleEndian = true) {
    return (0, configurations_1.includeCommonConfiguration)({
        parsers: [
            new SlashDateFormatParser_1.default(littleEndian),
            new ARTimeUnitWithinFormatParser_1.default(),
            new ARMonthNameLittleEndianParser_1.default(),
            new ARWeekdayParser_1.default(),
            new ARTimeExpressionParser_1.default(strictMode),
            new ARTimeUnitAgoFormatParser_1.default(),
            new ARTimeUnitLaterFormatParser_1.default(),
        ],
        refiners: [new ARMergeDateTimeRefiner_1.default(), new ARMergeDateRangeRefiner_1.default()],
    }, strictMode);
}
//# sourceMappingURL=index.js.map