/**
 * @module cli/search
 *
 * Element search subcommand for the markuplint CLI.
 * Finds lines of code that match the given CSS selectors across the target files
 * and outputs their locations in `file:line:col` format.
 */
import type { CLIOptions } from '../bootstrap.js';
/**
 * Searches the given files for elements matching a CSS selector and prints their locations.
 *
 * Internally creates a temporary lint rule that uses `document.querySelectorAll`
 * to find matching nodes, then outputs each match as `file:line:col` to stdout.
 *
 * @param files - The file paths (or glob patterns) to search.
 * @param options - CLI options forwarded to the underlying lint command.
 * @param selectors - A CSS selector string to match elements against.
 */
export declare function search(files: readonly string[], options: CLIOptions, selectors: string): Promise<void>;
