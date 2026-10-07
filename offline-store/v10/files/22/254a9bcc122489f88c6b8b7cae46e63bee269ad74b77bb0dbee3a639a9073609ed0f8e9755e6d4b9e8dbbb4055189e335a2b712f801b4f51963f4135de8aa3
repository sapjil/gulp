import type { CustomParser } from './types.js';
/**
 * Tokenizes a JavaScript code string into an array of typed tokens using espree.
 * Each token contains its type (e.g., Identifier, Punctuator) and raw value.
 *
 * @param script - The JavaScript source code to tokenize
 * @returns An array of tokens with their type and string value
 */
export declare function scriptParser(script: string): ScriptTokenType[];
/**
 * Attempts to extract the longest valid JavaScript prefix from a script string
 * that may contain trailing non-JS content (e.g., HTML after an inline expression).
 * Falls back to wrapping the script as an object literal or spread operator
 * if the initial parse fails.
 *
 * @param script - The potentially mixed script/markup string to parse
 * @param parse - A custom parse function to validate the script; defaults to espree with JSX support
 * @returns An object containing the `validScript` prefix and the remaining `leftover` string
 */
export declare function safeScriptParser(script: string, parse?: CustomParser): {
    validScript: string;
    leftover: string;
};
/**
 * A token produced by the script tokenizer, representing a single
 * lexical unit of JavaScript source code.
 */
export type ScriptTokenType = {
    type: 'Identifier' | 'Boolean' | 'Numeric' | 'String' | 'Template' | 'Punctuator';
    value: string;
};
