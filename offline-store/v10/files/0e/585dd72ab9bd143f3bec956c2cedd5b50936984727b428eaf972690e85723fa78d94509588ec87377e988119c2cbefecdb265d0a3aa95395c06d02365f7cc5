/** An array of characters recognized as bullet-like symbols indicating list items. */
type Bullets = readonly string[];
/**
 * Configuration options for the use-list rule.
 */
type Options = {
    /** Bullet characters that require a space after them to be considered list items. */
    spaceNeededBullets?: string[];
    /** Whether to report text nodes with no preceding sibling. */
    noPrev?: boolean;
    /** Whether to report text nodes preceded by an element node. */
    prevElement?: boolean;
    /** Whether to report text nodes preceded by a comment node. */
    prevComment?: boolean;
    /** Whether to report text nodes preceded by a preprocessor block. */
    prevCodeBlock?: boolean;
};
/**
 * Rule that suggests using `<li>` elements instead of text with bullet characters.
 *
 * Detects text nodes that start with bullet-like characters (Unicode bullets,
 * markdown-style dashes/asterisks, etc.) and recommends converting them into
 * proper list markup using `<li>` elements.
 */
declare const _default: Readonly<import("@markuplint/ml-core").RuleSeed<Bullets, Options>>;
export default _default;
