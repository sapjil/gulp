import { parse } from 'bcp-47';
/**
 * Checks whether a string is a valid BCP 47 language tag.
 *
 * @see https://tools.ietf.org/rfc/bcp/bcp47.html
 */
export const isBCP47 = () => {
    return value => {
        const { language } = parse(value);
        return !!language;
    };
};
