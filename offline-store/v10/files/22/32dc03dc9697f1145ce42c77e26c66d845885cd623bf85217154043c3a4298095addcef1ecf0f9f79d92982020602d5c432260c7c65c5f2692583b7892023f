import type { MLResultInfo } from '../types.js';
/**
 * Formats lint results as GitHub Actions workflow commands.
 *
 * Each violation is emitted as a `::error`, `::warning`, or `::notice` command
 * that GitHub Actions interprets as an inline annotation on the affected file and line.
 *
 * @param results - The lint result information for a single file.
 * @returns An array of GitHub Actions workflow command strings.
 */
export declare function githubReporter(results: MLResultInfo): string[];
