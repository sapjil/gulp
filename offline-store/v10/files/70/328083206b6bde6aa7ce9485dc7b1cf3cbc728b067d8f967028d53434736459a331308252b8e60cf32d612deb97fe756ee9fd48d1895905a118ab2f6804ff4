/**
 * Determines whether the given node is a child node type
 * (DocumentType, CDATA, Comment, Text, Element, or preprocessor block).
 *
 * @template T - The rule configuration value type
 * @template O - The rule options type
 * @param node - The node to check
 * @returns True if the node is one of the child node types
 */
export function isChildNode(
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
node) {
    return (node.is(node.DOCUMENT_TYPE_NODE) ||
        node.is(node.CDATA_SECTION_NODE) ||
        node.is(node.COMMENT_NODE) ||
        node.is(node.TEXT_NODE) ||
        node.is(node.ELEMENT_NODE) ||
        node.is(node.MARKUPLINT_PREPROCESSOR_BLOCK));
}
