var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Collection_locked, _Collection_matched, _Collection_nodes, _Collection_origin;
import { createSelector } from '@markuplint/selector';
import { bgGreen, green, bgRed, bgBlue, blue, bgMagenta, cyan } from './debug.js';
import { transparentMode } from './represent-transparent-nodes.js';
/**
 * Determines whether a given value is a terminal model (a selector string or an array
 * of selector strings) rather than a nested array of content model patterns.
 * Distinguishes between `Model` (leaf-level selectors) and `PermittedContentPattern[]`
 * (structural pattern arrays that require further recursive evaluation).
 *
 * @param model - The value to check, either a terminal model or a nested pattern array.
 * @returns True if the value is a terminal model (string or string array), false if it is a pattern array.
 */
export function isModel(model) {
    if (typeof model === 'string') {
        return true;
    }
    let modelMode = false;
    for (const m of model) {
        if (typeof m === 'string') {
            modelMode = true;
            continue;
        }
        if (modelMode) {
            throw new TypeError(`Invalid schema: ${JSON.stringify(model)}`);
        }
    }
    return modelMode;
}
/**
 * Tests whether a child node matches a CSS selector string using the markuplint
 * selector engine. Returns whether the node matched and, if not, the deepest
 * unmatched descendant node for diagnostic purposes.
 *
 * @param selector - The CSS selector string to test against.
 * @param node - The child node to test.
 * @param specs - The spec data passed to the selector engine for attribute resolution.
 * @returns An object with `matched: true` if the node matches, or `matched: false` with an optional `not` node.
 */
export function matches(selector, 
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
node, specs) {
    const selectorResult = createSelector(selector, specs).search(node);
    const matched = selectorResult.filter((r) => r.matched);
    if (matched.length > 0) {
        return {
            matched: true,
        };
    }
    const not = selectorResult
        .flatMap(r => (r.matched ? [] : (r.not ?? [])))
        .flatMap(descendants)
        .shift();
    return {
        matched: false,
        not,
    };
}
/**
 * Traverses a chain of nested `:has()` selector results to find the deepest
 * descendant nodes that caused a selector mismatch. Used to provide precise
 * error reporting by identifying the actual offending node in nested selectors.
 *
 * @param selectorResult - A matched selector result that may contain nested `:has()` results.
 * @returns The deepest descendant child nodes from the nested selector chain.
 */
function descendants(
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
selectorResult) {
    let nodes = [...selectorResult.nodes];
    while (selectorResult.has.length > 0) {
        for (const dep of selectorResult.has) {
            if (dep.has.length === 0) {
                nodes = dep.nodes;
                continue;
            }
            // eslint-disable-next-line no-useless-assignment
            selectorResult = dep;
            continue;
        }
        break;
    }
    return nodes;
}
/**
 * Type guard that checks whether a content model pattern is a "require" pattern,
 * indicating one or more required occurrences of a specific element or model.
 *
 * @param content - The content model pattern to check.
 * @returns True if the pattern has a `require` property.
 */
export function isRequire(content) {
    return 'require' in content;
}
/**
 * Type guard that checks whether a content model pattern is an "optional" pattern,
 * indicating zero or one occurrences of a specific element or model.
 *
 * @param content - The content model pattern to check.
 * @returns True if the pattern has an `optional` property.
 */
export function isOptional(content) {
    return 'optional' in content;
}
/**
 * Type guard that checks whether a content model pattern is a "oneOrMore" pattern,
 * indicating one or more occurrences of a specific element or model.
 *
 * @param content - The content model pattern to check.
 * @returns True if the pattern has a `oneOrMore` property.
 */
export function isOneOrMore(content) {
    return 'oneOrMore' in content;
}
/**
 * Type guard that checks whether a content model pattern is a "zeroOrMore" pattern,
 * indicating zero or more occurrences of a specific element or model.
 *
 * @param content - The content model pattern to check.
 * @returns True if the pattern has a `zeroOrMore` property.
 */
export function isZeroOrMore(content) {
    return 'zeroOrMore' in content;
}
/**
 * Type guard that checks whether a content model pattern is a "choice" pattern,
 * representing an alternation between multiple possible content model branches.
 *
 * @param content - The content model pattern to check.
 * @returns True if the pattern has a `choice` property.
 */
export function isChoice(content) {
    return 'choice' in content;
}
/**
 * Type guard that checks whether a content model pattern is a "transparent" pattern,
 * indicating the element inherits its parent's content model.
 *
 * @param content - The content model pattern to check.
 * @returns True if the pattern has a `transparent` property.
 */
export function isTransparent(content) {
    return 'transparent' in content;
}
/**
 * Normalizes a quantified content model pattern (require, optional, oneOrMore, or zeroOrMore)
 * into a uniform representation with the inner model, minimum count, maximum count,
 * a regex-like repeat sign for debug display, and the appropriate missing-node error type.
 *
 * @param pattern - A quantified content model pattern to normalize.
 * @returns An object with `model`, `min`, `max`, `repeat` sign, and optional `missingType`.
 */
export function normalizeModel(pattern) {
    let model;
    let min;
    let max;
    let repeat;
    let missingType;
    if (isRequire(pattern)) {
        model = pattern.require;
        min = pattern.min ?? 1;
        max = Math.max(pattern.max ?? 1, min);
        missingType = 'MISSING_NODE_REQUIRED';
    }
    else if (isOptional(pattern)) {
        model = pattern.optional;
        min = 0;
        max = Math.max(pattern.max ?? 1, 1);
    }
    else if (isOneOrMore(pattern)) {
        model = pattern.oneOrMore;
        min = 1;
        max = Math.max(pattern.max ?? Number.POSITIVE_INFINITY, 1);
        missingType = 'MISSING_NODE_ONE_OR_MORE';
    }
    else if (isZeroOrMore(pattern)) {
        model = pattern.zeroOrMore;
        min = 0;
        max = Math.max(pattern.max ?? Number.POSITIVE_INFINITY, 1);
    }
    else {
        throw new Error('Unreachable code');
    }
    if (min === 0 && max === 1) {
        repeat = '?';
    }
    else if (min === 0 && !Number.isFinite(max)) {
        repeat = '*';
    }
    else if (min === 1 && max === 1) {
        repeat = '';
    }
    else if (min === 1 && !Number.isFinite(max)) {
        repeat = '+';
    }
    else {
        repeat = `{${min},${max}}`;
    }
    return {
        model,
        min,
        max,
        repeat,
        missingType,
    };
}
/**
 * Merges two Hints objects, combining their properties and selecting the
 * `missing` hint with the higher `barelyMatchedElements` count (i.e., the
 * one closest to a successful match) for the most useful error diagnostics.
 *
 * @param a - The first hints object.
 * @param b - The second hints object.
 * @returns A merged hints object with undefined properties removed.
 */
export function mergeHints(
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
a, 
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
b) {
    const missing = [a.missing, b.missing].sort((a, b) => (b?.barelyMatchedElements ?? 0) - (a?.barelyMatchedElements ?? 0))[0];
    return cleanObject({
        ...a,
        ...b,
        missing: missing && cleanObject(missing),
    });
}
/**
 * Creates a shallow copy of an object with all `undefined` values removed.
 * Used to produce clean hint objects for result reporting without
 * extraneous undefined properties.
 *
 * @template T - The object type.
 * @param object - The source object to clean.
 * @returns A new object containing only the defined properties of the input.
 */
export function cleanObject(object) {
    const newObject = {};
    for (const [key, value] of Object.entries(object)) {
        if (value !== undefined) {
            newObject[key] = value;
        }
    }
    return newObject;
}
/**
 * Tracks matched and unmatched child nodes during content model validation.
 * Provides operations for adding matched nodes, backtracking to a locked state,
 * capping matches at a maximum count, and generating colored debug output.
 *
 * The collection maintains an ordered set of original nodes and partitions them
 * into matched and unmatched sets as the validation algorithm progresses.
 */
export class Collection {
    /**
     * Creates a new Collection from the given child nodes.
     *
     * @param origin - The initial list of child nodes to track.
     */
    constructor(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    origin) {
        _Collection_locked.set(this, new Set());
        _Collection_matched.set(this, new Set());
        _Collection_nodes.set(this, void 0);
        _Collection_origin.set(this, void 0);
        __classPrivateFieldSet(this, _Collection_origin, [...origin], "f");
        __classPrivateFieldSet(this, _Collection_nodes, new Set(__classPrivateFieldGet(this, _Collection_origin, "f")), "f");
    }
    /**
     * Returns a copy of the currently matched nodes in insertion order.
     */
    get matched() {
        return [...__classPrivateFieldGet(this, _Collection_matched, "f")];
    }
    /**
     * Returns the number of currently matched nodes.
     */
    get matchedCount() {
        return __classPrivateFieldGet(this, _Collection_matched, "f").size;
    }
    /**
     * Returns a copy of all original nodes in their original order.
     */
    get nodes() {
        return [...__classPrivateFieldGet(this, _Collection_origin, "f")];
    }
    /**
     * Returns the nodes that have not yet been matched, preserving original order.
     */
    get unmatched() {
        return [...__classPrivateFieldGet(this, _Collection_nodes, "f")].filter(n => !__classPrivateFieldGet(this, _Collection_matched, "f").has(n));
    }
    /**
     * Adds nodes to the matched set. All nodes must belong to the original
     * collection; external nodes will cause a ReferenceError.
     *
     * @param nodes - The child nodes to mark as matched.
     * @returns True if the matched set grew (new nodes were added), false otherwise.
     */
    addMatched(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    nodes) {
        const i = __classPrivateFieldGet(this, _Collection_matched, "f").size;
        for (const node of nodes) {
            if (!__classPrivateFieldGet(this, _Collection_nodes, "f").has(node)) {
                throw new ReferenceError(`External Node: ${node.nodeName}`);
            }
            __classPrivateFieldGet(this, _Collection_matched, "f").add(node);
        }
        return i < __classPrivateFieldGet(this, _Collection_matched, "f").size;
    }
    /**
     * Reverts the matched set to the last locked state, discarding
     * any matches added since the last `lock()` call. Used for backtracking
     * when a pattern match attempt fails after a zero-match.
     */
    back() {
        __classPrivateFieldSet(this, _Collection_matched, new Set(__classPrivateFieldGet(this, _Collection_locked, "f")), "f");
    }
    /**
     * Saves the current matched set as a checkpoint that `back()` can
     * revert to. Called after a successful backtrack recovery to preserve
     * the known-good state.
     */
    lock() {
        __classPrivateFieldSet(this, _Collection_locked, new Set(__classPrivateFieldGet(this, _Collection_matched, "f")), "f");
    }
    /**
     * Trims the matched set to at most `max` entries by removing
     * the most recently added nodes beyond the limit. Used when the
     * maximum occurrence count for a pattern is exceeded.
     *
     * @param max - The maximum number of matched nodes to retain.
     */
    max(max) {
        const sliced = [...__classPrivateFieldGet(this, _Collection_matched, "f")].slice(max);
        for (const n of sliced)
            __classPrivateFieldGet(this, _Collection_matched, "f").delete(n);
    }
    /**
     * Returns a colored string representation of all nodes for debug logging.
     * Matched nodes are shown in green, locked nodes in bold green, unmatched
     * extra nodes in red (when highlighted), and transparent-mode nodes in
     * blue/cyan/magenta variants.
     *
     * @param highlightExtraNodes - When true, unmatched nodes are highlighted in red/magenta.
     * @returns A formatted string like `[ <div>, <span>, <p> ]` with ANSI colors.
     */
    toString(highlightExtraNodes = false) {
        const out = [];
        for (const n of __classPrivateFieldGet(this, _Collection_origin, "f")) {
            const raw = n.is(n.TEXT_NODE) ? `:text(${n.raw.replaceAll('\n', '\\n')})` : n.raw;
            if (__classPrivateFieldGet(this, _Collection_locked, "f").has(n)) {
                if (transparentMode.has(n)) {
                    out.push(bgBlue.bold(raw));
                }
                else {
                    out.push(bgGreen.bold(raw));
                }
                continue;
            }
            if (__classPrivateFieldGet(this, _Collection_matched, "f").has(n)) {
                if (transparentMode.has(n)) {
                    out.push(blue.bold(raw));
                }
                else {
                    out.push(green.bold(raw));
                }
                continue;
            }
            if (highlightExtraNodes) {
                if (transparentMode.has(n)) {
                    out.push(bgMagenta.bold(raw));
                }
                else {
                    out.push(bgRed.bold(raw));
                }
                continue;
            }
            if (transparentMode.has(n)) {
                out.push(cyan(raw));
            }
            else {
                out.push(raw);
            }
        }
        return `[ ${out.join(', ')} ]`;
    }
}
_Collection_locked = new WeakMap(), _Collection_matched = new WeakMap(), _Collection_nodes = new WeakMap(), _Collection_origin = new WeakMap();
/**
 * Error class representing an unsupported content model feature.
 * Thrown when the validation engine encounters a pattern type or
 * configuration that is not yet implemented.
 */
export class UnsupportedError extends Error {
}
/**
 * Formats a content model (terminal model or pattern array) and its repeat sign
 * into a regex-like string for debug logging output. Terminal selectors are
 * rendered as `<selector>`, arrays of selectors as `(<s1>|<s2>)`, and
 * nested patterns are recursively formatted.
 *
 * @param model - The model or pattern array to format.
 * @param repeat - The quantifier sign to append (e.g., `+`, `*`, `?`, or `{m,n}`).
 * @returns A human-readable regex-like string representation of the model.
 */
export function modelLog(model, repeat) {
    if (!isModel(model)) {
        return orderLog(model, repeat);
    }
    if (typeof model === 'string') {
        return `<${model}>${repeat}`;
    }
    return `(<${model.join('>|<')}>)${repeat}`;
}
/**
 * Formats an ordered array of content model patterns into a regex-like
 * string for debug logging, with an optional repeat quantifier wrapping
 * the entire sequence.
 *
 * @param order - The ordered array of patterns to format.
 * @param repeat - The quantifier sign to wrap around the sequence.
 * @returns A formatted string representation of the ordered patterns.
 */
function orderLog(order, repeat) {
    return order.length === 1 && order[0]
        ? markRepeat(patternLog(order[0]), repeat)
        : markRepeat(order.map(pattern => patternLog(pattern)).join(''), repeat);
}
/**
 * Formats a single content model pattern into a regex-like string for debug logging.
 * Handles transparent, choice, and quantified patterns by dispatching to the
 * appropriate formatting logic.
 *
 * @param pattern - The content model pattern to format.
 * @returns A human-readable string representation of the pattern.
 */
function patternLog(pattern) {
    if (isTransparent(pattern)) {
        // 適当
        return `:transparent(${modelLog(pattern.transparent, '')})`;
    }
    if (isChoice(pattern)) {
        return `(${pattern.choice.map(candidate => orderLog(candidate, '')).join('|')})`;
    }
    const { model, repeat } = normalizeModel(pattern);
    return modelLog(model, repeat);
}
/**
 * Wraps a pattern string with parentheses and a repeat quantifier if a
 * repeat sign is present. If no repeat sign is given, returns the pattern unchanged.
 *
 * @param pattern - The pattern string to wrap.
 * @param repeat - The quantifier sign to append, or an empty string for no repetition.
 * @returns The pattern string, optionally wrapped as `(pattern)quantifier`.
 */
function markRepeat(pattern, repeat) {
    return repeat ? `(${pattern})${repeat}` : pattern;
}
