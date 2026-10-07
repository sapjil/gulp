"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translator = translator;
exports.taggedTemplateTranslator = taggedTemplateTranslator;
const defaultListFormat = {
    quoteStart: '"',
    quoteEnd: '"',
    separator: ', ',
    lastSeparator: ' and ',
};
/**
 * Creates a {@link Translator} function bound to the given locale set.
 *
 * The returned translator supports two call signatures:
 * - **Message template**: `t("The {0} is {1}", keyword1, keyword2)` – interpolates keywords into
 *   a message template, looking up translations from the locale set's `sentences` and `keywords`.
 * - **List formatting**: `t(["apple", "banana", "cherry"], true)` – formats an array of strings
 *   into a human-readable list (e.g. `"apple", "banana" and "cherry"`).
 *
 * @param localeSet - The locale configuration providing translations and formatting rules
 * @returns A translator function for producing localized messages
 */
function translator(localeSet) {
    return (messageTmpl, ...keywords) => {
        if (typeof messageTmpl !== 'string') {
            if (messageTmpl.length === 0) {
                return '';
            }
            const format = localeSet?.listFormat ?? defaultListFormat;
            const useLastSeparator = keywords[0] == null || keywords[0] == false ? false : true;
            const lastSeparator = useLastSeparator ? (format.lastSeparator ?? format.separator) : format.separator;
            const list = messageTmpl.map(keyword => format.quoteStart + translateKeyword(keyword, '', localeSet) + format.quoteEnd);
            if (list.length === 1) {
                return list[0];
            }
            const last = list.pop();
            return list.join(format.separator) + lastSeparator + last;
        }
        const input = messageTmpl;
        if (keywords.length === 0) {
            return translateKeyword(messageTmpl, '', localeSet);
        }
        const noTranslateIndex = new Set([
            ...messageTmpl.matchAll(
            // eslint-disable-next-line regexp/strict
            /(?<={)\d+(?=\*})/g),
        ].map(m => m[0]));
        const key = removeNoTranslateMark(messageTmpl).toLowerCase();
        const sentences = Object.entries(localeSet?.sentences ?? {});
        const sentence = sentences.find(([sentenceKey]) => sentenceKey.toLowerCase() === key)?.[1];
        messageTmpl = sentence ?? key;
        messageTmpl =
            removeNoTranslateMark(input.toLowerCase()) === messageTmpl ? removeNoTranslateMark(input) : messageTmpl;
        const message = messageTmpl.replaceAll(
        // eslint-disable-next-line regexp/strict
        /{(\d+)(?::(c))?}/g, ($0, number, flag) => {
            const num = Number.parseInt(number);
            if (Number.isNaN(num)) {
                return $0;
            }
            const keyword = keywords[num] == null ? '' : toString(keywords[num], localeSet?.locale);
            // No translate
            if (noTranslateIndex.has(number)) {
                return keyword;
            }
            return translateKeyword(keyword, flag, localeSet);
        });
        return message;
    };
}
/**
 * Creates a tagged template literal translator function.
 *
 * Allows using template literal syntax for translations:
 * ```ts
 * const tt = taggedTemplateTranslator(localeSet);
 * const msg = tt`The ${name} is ${value}`;
 * ```
 *
 * @experimental
 * @param localeSet - The locale configuration providing translations and formatting rules
 * @returns A tagged template function that produces localized strings
 */
function taggedTemplateTranslator(localeSet) {
    const t = translator(localeSet);
    return (strings, ...keys) => {
        let i = 0;
        const template = strings.raw
            .map((place, index) => {
            if (index === strings.raw.length - 1)
                return place;
            const value = keys[i];
            const cFlag = (typeof value === 'string' ? value : '').startsWith('c:') ? ':c' : '';
            return `${place}{${i++}${cFlag}}`;
        })
            .join('');
        return t(template, ...keys);
    };
}
function translateKeyword(keyword, flag, localeSet) {
    // No translate
    if (/^%[^%]+%$/.test(keyword)) {
        return keyword.replaceAll(/^%|%$/g, '');
    }
    // "%" prefix and suffix escaped
    keyword = keyword.replaceAll(/^%%|%%$/g, '%');
    const key = flag ? `${flag}:${keyword}` : keyword;
    const replacedWord = 
    // finding with flag
    localeSet?.keywords?.[key.toLowerCase()] ||
        // finding without flag
        localeSet?.keywords?.[keyword.toLowerCase()];
    return replacedWord || keyword;
}
function toString(value, locale = 'en') {
    switch (typeof value) {
        case 'string': {
            return value;
        }
        case 'number': {
            return toLocaleString(value, locale);
        }
        case 'boolean': {
            return `${value}`;
        }
    }
}
function toLocaleString(value, locale) {
    try {
        return value.toLocaleString(locale);
    }
    catch (error) {
        if (error instanceof RangeError) {
            try {
                return value.toLocaleString('en');
            }
            catch {
                // void
            }
        }
    }
    return value.toString(10);
}
function removeNoTranslateMark(message) {
    return message.replaceAll(
    // eslint-disable-next-line regexp/strict
    /(?<={\d+)\*(?=})/g, '');
}
