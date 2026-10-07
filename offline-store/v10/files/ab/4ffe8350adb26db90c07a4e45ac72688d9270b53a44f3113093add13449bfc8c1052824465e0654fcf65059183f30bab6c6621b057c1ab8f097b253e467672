/**
 * Defines a question for single or multi-select prompts.
 *
 * @template T - The type of the value associated with each choice
 */
type SelectQuestion<T> = {
    readonly message: string;
    readonly choices: readonly {
        readonly name: string;
        readonly value: T;
    }[];
};
/**
 * Displays an interactive single-select prompt and returns the chosen value.
 *
 * @template T - The type of the value returned by the selected choice
 * @param question - The question configuration including message and available choices
 * @returns The value of the selected choice
 */
export declare function select<T>(question: SelectQuestion<T>): Promise<T>;
/**
 * Displays an interactive multi-select prompt and returns an array of chosen values.
 *
 * @template T - The type of the values returned by the selected choices
 * @param question - The question configuration including message and available choices
 * @returns An array of values corresponding to the selected choices
 */
export declare function multiSelect<T>(question: SelectQuestion<T>): Promise<T[]>;
/**
 * Displays an interactive text input prompt. Re-prompts the user if the
 * input fails the optional validation pattern.
 *
 * @template T - The string subtype returned by the prompt
 * @param question - The message to display as the prompt question
 * @param validation - An optional regex pattern the input must match
 * @returns The validated user input string
 */
export declare function input<T extends string = string>(question: string, validation?: Readonly<RegExp>): Promise<T>;
/**
 * Displays an interactive yes/no confirmation prompt.
 *
 * @param question - The message to display as the confirmation question
 * @param options - Optional settings for the prompt
 * @param options.initial - The default answer when the user presses Enter without input
 * @returns `true` if the user confirmed, `false` otherwise
 */
export declare function confirm(question: string, options?: {
    readonly initial?: boolean;
}): Promise<boolean>;
/**
 * Displays a sequence of yes/no confirmation prompts and collects all answers
 * into a single record keyed by each question's name.
 *
 * @template T - The string literal union type of question names
 * @param questions - An array of question objects, each with a message and a unique name
 * @returns A record mapping each question name to its boolean answer
 */
export declare function confirmSequence<T extends string = string>(questions: readonly {
    readonly message: string;
    readonly name: T;
}[]): Promise<Record<T, boolean>>;
export {};
