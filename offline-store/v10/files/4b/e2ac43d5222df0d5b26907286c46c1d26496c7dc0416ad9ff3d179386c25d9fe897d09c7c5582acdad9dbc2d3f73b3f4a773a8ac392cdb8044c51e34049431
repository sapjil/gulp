"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_UNITS_PATTERN = exports.YEAR_PATTERN = exports.NUMBER_PATTERN = exports.TIME_UNIT_DICTIONARY = exports.INTEGER_WORD_DICTIONARY = exports.MONTH_DICTIONARY = exports.WEEKDAY_DICTIONARY = void 0;
exports.parseNumberPattern = parseNumberPattern;
exports.parseYear = parseYear;
exports.parseDuration = parseDuration;
const pattern_1 = require("../../utils/pattern");
const years_1 = require("../../calculation/years");
exports.WEEKDAY_DICTIONARY = {
    "minggu": 0,
    "ahad": 0,
    "senin": 1,
    "selasa": 2,
    "rabu": 3,
    "kamis": 4,
    "jumat": 5,
    "jum'at": 5,
    "sabtu": 6,
};
exports.MONTH_DICTIONARY = {
    "januari": 1,
    "jan": 1,
    "jan.": 1,
    "februari": 2,
    "pebruari": 2,
    "feb": 2,
    "feb.": 2,
    "peb": 2,
    "peb.": 2,
    "maret": 3,
    "mar": 3,
    "mar.": 3,
    "april": 4,
    "apr": 4,
    "apr.": 4,
    "mei": 5,
    "juni": 6,
    "jun": 6,
    "jun.": 6,
    "juli": 7,
    "jul": 7,
    "jul.": 7,
    "agustus": 8,
    "agu": 8,
    "agu.": 8,
    "agt": 8,
    "agt.": 8,
    "ags": 8,
    "ags.": 8,
    "september": 9,
    "sep": 9,
    "sep.": 9,
    "sept": 9,
    "sept.": 9,
    "oktober": 10,
    "okt": 10,
    "okt.": 10,
    "november": 11,
    "nopember": 11,
    "nov": 11,
    "nov.": 11,
    "nop": 11,
    "nop.": 11,
    "desember": 12,
    "des": 12,
    "des.": 12,
};
exports.INTEGER_WORD_DICTIONARY = {
    "satu": 1,
    "dua": 2,
    "tiga": 3,
    "empat": 4,
    "lima": 5,
    "enam": 6,
    "tujuh": 7,
    "delapan": 8,
    "sembilan": 9,
    "sepuluh": 10,
    "sebelas": 11,
    "dua belas": 12,
};
exports.TIME_UNIT_DICTIONARY = {
    "detik": "second",
    "menit": "minute",
    "jam": "hour",
    "hari": "day",
    "minggu": "week",
    "pekan": "week",
    "bulan": "month",
    "tahun": "year",
};
exports.NUMBER_PATTERN = `(?:${(0, pattern_1.matchAnyPattern)(exports.INTEGER_WORD_DICTIONARY)}|[0-9]+|[0-9]+[\\.,][0-9]+|setengah)`;
function parseNumberPattern(match) {
    const num = match.toLowerCase();
    if (exports.INTEGER_WORD_DICTIONARY[num] !== undefined) {
        return exports.INTEGER_WORD_DICTIONARY[num];
    }
    else if (num === "setengah") {
        return 0.5;
    }
    return parseFloat(num.replace(",", "."));
}
exports.YEAR_PATTERN = `(?:[1-9][0-9]{0,3}\\s*(?:SM|M)(?=\\W|$)|[1-2][0-9]{3}|[5-9][0-9])`;
function parseYear(match) {
    if (/SM/i.test(match)) {
        return -parseInt(match.replace(/SM/i, ""));
    }
    if (/M/i.test(match)) {
        return parseInt(match.replace(/M/i, ""));
    }
    return (0, years_1.findMostLikelyADYear)(parseInt(match));
}
const SINGLE_TIME_UNIT_PATTERN = `(?:(${exports.NUMBER_PATTERN})\\s{0,5}|se)(${(0, pattern_1.matchAnyPattern)(exports.TIME_UNIT_DICTIONARY)})\\s{0,5}`;
const SINGLE_TIME_UNIT_REGEX = new RegExp(SINGLE_TIME_UNIT_PATTERN, "i");
exports.TIME_UNITS_PATTERN = (0, pattern_1.repeatedTimeunitPattern)("", SINGLE_TIME_UNIT_PATTERN, "\\s{0,5}(?:,|dan)?\\s{0,5}");
function parseDuration(timeunitText) {
    const fragments = {};
    let remainingText = timeunitText;
    let match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    while (match) {
        const num = match[1] ? parseNumberPattern(match[1]) : 1;
        const unit = exports.TIME_UNIT_DICTIONARY[match[2].toLowerCase()];
        fragments[unit] = num;
        remainingText = remainingText.substring(match.index + match[0].length);
        match = SINGLE_TIME_UNIT_REGEX.exec(remainingText);
    }
    return fragments;
}
//# sourceMappingURL=constants.js.map