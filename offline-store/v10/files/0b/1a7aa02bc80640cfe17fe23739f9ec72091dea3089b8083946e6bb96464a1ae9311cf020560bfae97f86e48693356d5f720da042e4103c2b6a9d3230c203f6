/**
 * States of the tag-level state machine used during tokenization.
 * Transitions drive the parser through detecting the opening bracket,
 * tag name, attributes, and closing bracket of an HTML/XML tag.
 */
export var TagState;
(function (TagState) {
    TagState[TagState["BeforeOpenTag"] = 0] = "BeforeOpenTag";
    TagState[TagState["FirstCharOfTagName"] = 1] = "FirstCharOfTagName";
    TagState[TagState["TagName"] = 2] = "TagName";
    TagState[TagState["Attrs"] = 3] = "Attrs";
    TagState[TagState["AfterAttrs"] = 4] = "AfterAttrs";
    TagState[TagState["AfterOpenTag"] = 5] = "AfterOpenTag";
})(TagState || (TagState = {}));
/**
 * States of the attribute-level state machine used during attribute tokenization.
 * Transitions drive the parser through the attribute name, equals sign,
 * and value portions of an HTML/XML attribute.
 */
export var AttrState;
(function (AttrState) {
    AttrState[AttrState["BeforeName"] = 0] = "BeforeName";
    AttrState[AttrState["Name"] = 1] = "Name";
    AttrState[AttrState["Equal"] = 2] = "Equal";
    AttrState[AttrState["BeforeValue"] = 3] = "BeforeValue";
    AttrState[AttrState["Value"] = 4] = "Value";
    AttrState[AttrState["AfterValue"] = 5] = "AfterValue";
})(AttrState || (AttrState = {}));
