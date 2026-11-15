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
const IDCasualDateParser_1 = __importDefault(require("./parsers/IDCasualDateParser"));
const IDCasualTimeParser_1 = __importDefault(require("./parsers/IDCasualTimeParser"));
const IDMonthNameLittleEndianParser_1 = __importDefault(require("./parsers/IDMonthNameLittleEndianParser"));
const IDMonthNameParser_1 = __importDefault(require("./parsers/IDMonthNameParser"));
const IDMonthNameMiddleEndianParser_1 = __importDefault(require("./parsers/IDMonthNameMiddleEndianParser"));
const IDWeekdayParser_1 = __importDefault(require("./parsers/IDWeekdayParser"));
const IDTimeExpressionParser_1 = __importDefault(require("./parsers/IDTimeExpressionParser"));
const IDTimeUnitAgoFormatParser_1 = __importDefault(require("./parsers/IDTimeUnitAgoFormatParser"));
const IDTimeUnitLaterFormatParser_1 = __importDefault(require("./parsers/IDTimeUnitLaterFormatParser"));
const IDTimeUnitWithinFormatParser_1 = __importDefault(require("./parsers/IDTimeUnitWithinFormatParser"));
const IDRelativeDateFormatParser_1 = __importDefault(require("./parsers/IDRelativeDateFormatParser"));
const IDMergeDateRangeRefiner_1 = __importDefault(require("./refiners/IDMergeDateRangeRefiner"));
const IDMergeDateTimeRefiner_1 = __importDefault(require("./refiners/IDMergeDateTimeRefiner"));
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
    option.parsers.unshift(new IDCasualDateParser_1.default());
    option.parsers.unshift(new IDCasualTimeParser_1.default());
    option.parsers.unshift(new IDMonthNameParser_1.default());
    option.parsers.unshift(new IDRelativeDateFormatParser_1.default());
    return option;
}
function createConfiguration(strictMode = true, littleEndian = true) {
    return (0, configurations_1.includeCommonConfiguration)({
        parsers: [
            new SlashDateFormatParser_1.default(littleEndian),
            new IDMonthNameLittleEndianParser_1.default(),
            new IDMonthNameMiddleEndianParser_1.default(),
            new IDWeekdayParser_1.default(),
            new IDTimeExpressionParser_1.default(strictMode),
            new IDTimeUnitWithinFormatParser_1.default(),
            new IDTimeUnitAgoFormatParser_1.default(),
            new IDTimeUnitLaterFormatParser_1.default(),
        ],
        refiners: [new IDMergeDateTimeRefiner_1.default(), new IDMergeDateRangeRefiner_1.default()],
    }, strictMode);
}
//# sourceMappingURL=index.js.map