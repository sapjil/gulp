import type { MLASTAttr, MLASTNode } from '@markuplint/ml-ast';
/**
 * Converts a list of AST nodes into human-readable debug strings showing
 * each node's position, type, and raw content. Useful for snapshot testing.
 *
 * @param nodeList - The flat list of AST nodes to convert
 * @param withAttr - Whether to include detailed attribute debug info for start tags
 * @returns An array of formatted debug strings, one per node (plus attribute lines when enabled)
 */
export declare function nodeListToDebugMaps(nodeList: readonly (MLASTNode | null)[], withAttr?: boolean): string[];
/**
 * Converts a list of AST attributes into detailed debug strings showing
 * each attribute's components (name, equal sign, value, quotes) with
 * their positions and additional metadata like directives and dynamic values.
 *
 * @param attributes - The list of attributes to convert into debug representations
 * @returns An array of string arrays, one inner array per attribute containing its debug lines
 */
export declare function attributesToDebugMaps(attributes: readonly MLASTAttr[]): string[][];
/**
 * Produces a tree-style debug view of AST nodes, showing indentation
 * based on depth, parent-child relationships, pair node links,
 * and ghost/bogus markers. Useful for visualizing the parsed DOM structure.
 *
 * @param nodeTree - The flat list of AST nodes to visualize as a tree
 * @param idFilter - Whether to replace UUIDs with short sequential hex IDs for readability
 * @returns An array of formatted strings representing the tree view
 */
export declare function nodeTreeDebugView(nodeTree: readonly MLASTNode[], idFilter?: boolean): (string | undefined)[];
