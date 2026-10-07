import type { Violation } from '@markuplint/ml-config';
/**
 * Collects and manages lint violations across multiple files.
 * Supports a maximum violation count to stop collecting early.
 */
export declare class ViolationCollector {
    #private;
    /**
     * @param maxCount - Maximum number of violations to collect; 0 means unlimited
     */
    constructor(maxCount?: number);
    /**
     * Adds violations associated with a specific file path.
     * Stops collecting once the maximum count is reached.
     *
     * @param filePath - The file that produced these violations
     * @param violations - The violations to add
     * @returns The current total number of collected violations
     */
    pushWithFile(filePath: string, ...violations: readonly Violation[]): number;
    /**
     * The total number of collected violations.
     */
    get length(): number;
    /**
     * Whether the collector has reached its maximum count and will no longer accept violations.
     *
     * @returns `true` if the collector is locked
     */
    isLocked(): boolean;
    /**
     * Returns a copy of all collected violations as an array.
     *
     * @returns An array of violations with their associated file paths
     */
    toArray(): (Violation & {
        filePath: string;
    })[];
    /**
     * Groups collected violations by their file path.
     *
     * @returns A Map from file path to an array of violations for that file
     */
    groupByFile(): Map<string, Violation[]>;
}
