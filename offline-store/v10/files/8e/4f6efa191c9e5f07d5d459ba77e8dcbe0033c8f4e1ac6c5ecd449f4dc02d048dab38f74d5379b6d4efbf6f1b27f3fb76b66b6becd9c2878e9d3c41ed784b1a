import type { CLIOptions } from '../cli/bootstrap.js';
import type { MLResultInfo } from '../types.js';
/**
 * Formats lint results using the standard (detailed) reporter.
 *
 * Produces multi-line output that shows each violation's message with
 * surrounding source code context, highlighted error regions, and
 * line numbers. Clean files are reported as "passed" or "skipped"
 * unless `--problem-only` is set.
 *
 * @param results - The lint result information for a single file.
 * @param options - CLI options controlling color and problem-only output.
 * @returns An array of formatted output lines.
 */
export declare function standardReporter(results: MLResultInfo, options: CLIOptions): string[];
