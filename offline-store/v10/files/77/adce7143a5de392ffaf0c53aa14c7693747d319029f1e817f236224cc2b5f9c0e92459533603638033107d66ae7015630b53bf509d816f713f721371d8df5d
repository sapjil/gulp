import type { CellType } from './types.js';
import type { Element } from '@markuplint/ml-core';
/**
 * Represents a table as a grid model, splitting it into thead, tbody, and tfoot sections.
 *
 * Each section is modeled as a 2D array of `CellType` values that account for
 * `colspan` and `rowspan` attributes. Used by the `table-row-column-alignment`
 * rule to detect misaligned rows and overlapping cells.
 */
export declare class Grid {
    #private;
    /** The grid model for the `<tbody>` section. */
    readonly tbodyGrid: ReadonlyArray<ReadonlyArray<CellType>>;
    /** The grid model for the `<tfoot>` section. */
    readonly tfootGrid: ReadonlyArray<ReadonlyArray<CellType>>;
    /** The grid model for the `<thead>` section. */
    readonly theadGrid: ReadonlyArray<ReadonlyArray<CellType>>;
    /**
     * Constructs a grid model from a `<table>` element.
     *
     * @param table - The table element to model.
     */
    constructor(table: Element<boolean>);
    /**
     * Returns all `<tr>` elements across all table sections in document order.
     *
     * @returns Combined array of row elements from thead, tbody, and tfoot.
     */
    getAllRowElements(): Element<boolean, undefined>[];
    /**
     * Returns all grid rows that contain at least one actual cell element.
     *
     * @returns Combined array of grid rows from thead, tbody, and tfoot, filtered to rows with real cells.
     */
    getAllRows(): (readonly CellType[])[];
    /**
     * Determines the expected (base) column count for the table.
     *
     * Prefers the thead section if available, then tfoot, then tbody.
     *
     * @returns The base number of columns that rows should have.
     */
    getBaseColLength(): number;
    /**
     * Returns the grid and row elements for each table section (thead, tbody, tfoot).
     *
     * @returns An array of objects, each containing the section grid and its row elements.
     */
    getSections(): {
        section: readonly (readonly CellType[])[];
        elements: readonly Element<boolean, undefined>[];
    }[];
    /**
     * Checks whether any cell in the table grid has been marked as overlapping.
     *
     * @returns `true` if any cell has the overlap marker `'x'`.
     */
    hasOverlapped(): boolean;
    /** Logs the grid data for all three table sections to the console (for debugging). */
    log(): void;
}
/**
 * Detects a rowspan that extends beyond the available rows in a table section.
 *
 * When a grid row exists without a corresponding row element, it indicates
 * a rowspan overflow. Returns the offending `rowspan` attribute node if found.
 *
 * @param rows - The grid rows for a single table section.
 * @param rowElements - The `<tr>` elements for the section.
 * @returns An object containing the overflowing `rowSpan` attribute, or `null`.
 */
export declare function getOverflowRowSpan(rows: ReadonlyArray<ReadonlyArray<CellType>>, rowElements: ReadonlyArray<Element<boolean>>): {
    rowSpan: import("@markuplint/ml-core").Attr<boolean, undefined>;
} | null;
/**
 * Maps each cell in a grid row to its source cell index (for cells that correspond
 * to actual `<td>`/`<th>` elements), or `null` for spanned cells.
 *
 * @param row - A single row of cell types from the grid model.
 * @returns An array of cell indices or `null` values, one per grid column.
 */
export declare function getIndexes(row: readonly CellType[]): (number | null)[];
