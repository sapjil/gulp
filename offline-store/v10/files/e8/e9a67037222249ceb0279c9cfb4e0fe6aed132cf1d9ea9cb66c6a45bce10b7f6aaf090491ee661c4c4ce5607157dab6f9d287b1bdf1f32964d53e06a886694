import type { LocaleSet, Primitive, Translator } from './types.js';
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
export declare function translator(localeSet?: LocaleSet): Translator;
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
export declare function taggedTemplateTranslator(localeSet?: LocaleSet): (strings: Readonly<TemplateStringsArray>, ...keys: readonly Primitive[]) => string;
