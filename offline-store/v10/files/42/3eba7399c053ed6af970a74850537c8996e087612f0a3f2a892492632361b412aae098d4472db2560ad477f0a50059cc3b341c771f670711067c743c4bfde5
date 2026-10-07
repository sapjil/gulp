import type { MLBlock } from './block.js';
import type { MLCharacterData } from './character-data.js';
import type { MLDocumentType } from './document-type.js';
import type { MLElement } from './element.js';
import type { MLNode } from './node.js';
import type { PlainData, RuleConfigValue } from '@markuplint/ml-config';
/**
 * > Element includes NonDocumentTypeChildNode;
 * > CharacterData includes NonDocumentTypeChildNode;
 *
 * > DocumentType includes ChildNode;
 * > Element includes ChildNode;
 * > CharacterData includes ChildNode;
 *
 * @see https://dom.spec.whatwg.org/#idl-index
 */
export type MLChildNode<T extends RuleConfigValue, O extends PlainData = undefined> = MLDocumentType<T, O> | MLCharacterData<T, O> | MLElement<T, O> | MLBlock<T, O>;
/**
 * Determines whether the given node is a child node type
 * (DocumentType, CDATA, Comment, Text, Element, or preprocessor block).
 *
 * @template T - The rule configuration value type
 * @template O - The rule options type
 * @param node - The node to check
 * @returns True if the node is one of the child node types
 */
export declare function isChildNode<T extends RuleConfigValue, O extends PlainData = undefined>(node: MLNode<T, O>): node is MLChildNode<T, O>;
