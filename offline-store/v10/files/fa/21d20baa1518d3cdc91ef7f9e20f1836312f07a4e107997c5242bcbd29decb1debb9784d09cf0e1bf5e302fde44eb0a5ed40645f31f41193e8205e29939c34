/**
 * States of the tag-level state machine used during tokenization.
 * Transitions drive the parser through detecting the opening bracket,
 * tag name, attributes, and closing bracket of an HTML/XML tag.
 */
export declare enum TagState {
    BeforeOpenTag = 0,
    FirstCharOfTagName = 1,
    TagName = 2,
    Attrs = 3,
    AfterAttrs = 4,
    AfterOpenTag = 5
}
/**
 * States of the attribute-level state machine used during attribute tokenization.
 * Transitions drive the parser through the attribute name, equals sign,
 * and value portions of an HTML/XML attribute.
 */
export declare enum AttrState {
    BeforeName = 0,
    Name = 1,
    Equal = 2,
    BeforeValue = 3,
    Value = 4,
    AfterValue = 5
}
