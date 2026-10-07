/**
 * Positional and contextual information associated with a parser error,
 * used to construct meaningful error messages with source locations.
 */
export type ParserErrorInfo = {
    readonly line?: number;
    readonly col?: number;
    readonly raw?: string;
    readonly stack?: string;
};
/**
 * An error that occurs during parsing, carrying the source line, column,
 * and raw text where the error was encountered.
 */
export declare class ParserError extends Error {
    readonly col: number;
    readonly line: number;
    name: string;
    readonly raw: string;
    constructor(message: string, info: ParserErrorInfo);
}
/**
 * A parser error specific to a particular HTML element, including
 * the node name of the element that caused the error in the message.
 */
export declare class TargetParserError extends ParserError {
    name: string;
    readonly nodeName: string | null;
    constructor(message: string, info: ParserErrorInfo & {
        readonly nodeName?: string | null;
    });
}
/**
 * A parser error that occurs while reading a configuration file,
 * including the file path in the error message for easier debugging.
 */
export declare class ConfigParserError extends ParserError {
    readonly filePath: string;
    name: string;
    constructor(message: string, info: ParserErrorInfo & {
        readonly filePath: string;
    });
}
