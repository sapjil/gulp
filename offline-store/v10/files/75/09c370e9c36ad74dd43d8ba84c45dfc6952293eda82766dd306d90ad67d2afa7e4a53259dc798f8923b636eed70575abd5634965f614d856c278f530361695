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
var _ViolationCollector_violations, _ViolationCollector_maxCount, _ViolationCollector_locked;
/**
 * Collects and manages lint violations across multiple files.
 * Supports a maximum violation count to stop collecting early.
 */
export class ViolationCollector {
    /**
     * @param maxCount - Maximum number of violations to collect; 0 means unlimited
     */
    constructor(maxCount = 0) {
        _ViolationCollector_violations.set(this, []);
        _ViolationCollector_maxCount.set(this, 0);
        _ViolationCollector_locked.set(this, false);
        __classPrivateFieldSet(this, _ViolationCollector_maxCount, maxCount, "f");
        __classPrivateFieldSet(this, _ViolationCollector_locked, false, "f");
    }
    /**
     * Adds violations associated with a specific file path.
     * Stops collecting once the maximum count is reached.
     *
     * @param filePath - The file that produced these violations
     * @param violations - The violations to add
     * @returns The current total number of collected violations
     */
    pushWithFile(filePath, ...violations) {
        if (__classPrivateFieldGet(this, _ViolationCollector_locked, "f")) {
            return __classPrivateFieldGet(this, _ViolationCollector_violations, "f").length;
        }
        for (const violation of violations) {
            __classPrivateFieldGet(this, _ViolationCollector_violations, "f").push({ ...violation, filePath });
            if (__classPrivateFieldGet(this, _ViolationCollector_maxCount, "f") > 0 && __classPrivateFieldGet(this, _ViolationCollector_violations, "f").length >= __classPrivateFieldGet(this, _ViolationCollector_maxCount, "f")) {
                __classPrivateFieldSet(this, _ViolationCollector_locked, true, "f");
                break;
            }
        }
        return __classPrivateFieldGet(this, _ViolationCollector_violations, "f").length;
    }
    /**
     * The total number of collected violations.
     */
    get length() {
        return __classPrivateFieldGet(this, _ViolationCollector_violations, "f").length;
    }
    /**
     * Whether the collector has reached its maximum count and will no longer accept violations.
     *
     * @returns `true` if the collector is locked
     */
    isLocked() {
        return __classPrivateFieldGet(this, _ViolationCollector_locked, "f");
    }
    /**
     * Returns a copy of all collected violations as an array.
     *
     * @returns An array of violations with their associated file paths
     */
    toArray() {
        return [...__classPrivateFieldGet(this, _ViolationCollector_violations, "f")];
    }
    /**
     * Groups collected violations by their file path.
     *
     * @returns A Map from file path to an array of violations for that file
     */
    groupByFile() {
        const grouped = new Map();
        for (const violation of __classPrivateFieldGet(this, _ViolationCollector_violations, "f")) {
            const { filePath, ...violationWithoutPath } = violation;
            if (!grouped.has(filePath)) {
                grouped.set(filePath, []);
            }
            grouped.get(filePath).push(violationWithoutPath);
        }
        return grouped;
    }
}
_ViolationCollector_violations = new WeakMap(), _ViolationCollector_maxCount = new WeakMap(), _ViolationCollector_locked = new WeakMap();
