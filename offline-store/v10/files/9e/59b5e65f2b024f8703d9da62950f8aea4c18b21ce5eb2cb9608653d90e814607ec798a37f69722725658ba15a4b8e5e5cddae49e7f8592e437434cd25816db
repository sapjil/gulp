import type { CLIOptions } from '../cli/bootstrap.js';
import type { MLResultInfo } from '../types.js';
/**
 * Formats lint results using the simple (compact) reporter.
 *
 * Produces one line per violation showing location, severity icon,
 * message, and rule ID in a condensed format. Clean files display
 * a check mark or warning icon unless `--problem-only` is set.
 *
 * @param results - The lint result information for a single file.
 * @param options - CLI options controlling problem-only output.
 * @returns An array of formatted output lines.
 */
export declare function simpleReporter(results: MLResultInfo, options: CLIOptions): string[];
