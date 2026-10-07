/**
 * Error thrown when a CSS selector string cannot be parsed.
 */
export class InvalidSelectorError extends Error {
    /**
     * @param selector - The invalid selector string
     * @param message - An optional custom error message
     */
    constructor(selector, message) {
        super(message ?? `Invalid selector: "${selector}"`);
        this.name = 'InvalidSelectorError';
        this.selector = selector;
    }
}
