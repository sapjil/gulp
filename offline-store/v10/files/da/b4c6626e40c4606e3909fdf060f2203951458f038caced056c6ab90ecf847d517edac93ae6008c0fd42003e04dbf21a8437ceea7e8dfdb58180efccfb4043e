/**
 * An error that occurs during parsing, carrying the source line, column,
 * and raw text where the error was encountered.
 */
export class ParserError extends Error {
    constructor(message, info) {
        super(message);
        this.name = 'ParserError';
        this.line = info.line ?? 1;
        this.col = info.col ?? 0;
        this.raw = info.raw ?? '';
        this.stack = info.stack ?? this.stack;
    }
}
/**
 * A parser error specific to a particular HTML element, including
 * the node name of the element that caused the error in the message.
 */
export class TargetParserError extends ParserError {
    constructor(message, info) {
        const errMsg = info.nodeName
            ? `The ${info.nodeName} is invalid element (${info.line}:${info.col}): ${message}`
            : message;
        super(errMsg, info);
        this.name = 'TargetParserError';
        this.nodeName = info.nodeName ?? null;
    }
}
/**
 * A parser error that occurs while reading a configuration file,
 * including the file path in the error message for easier debugging.
 */
export class ConfigParserError extends ParserError {
    constructor(message, info) {
        const pos = info.line != null && info.line != null ? `(${info.line}:${info.col})` : '';
        const file = ` in ${info.filePath}${pos}`;
        const errMsg = `${message}${file}`;
        super(errMsg, info);
        this.name = 'ConfigParserError';
        this.filePath = info.filePath;
    }
}
