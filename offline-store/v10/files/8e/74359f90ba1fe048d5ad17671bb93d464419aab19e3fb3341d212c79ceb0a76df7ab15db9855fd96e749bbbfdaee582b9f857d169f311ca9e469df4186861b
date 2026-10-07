import type { CLIOptions } from './bootstrap.js';
import type { MLResultInfo } from '../types.js';
/**
 * Writes lint results to stdout or stderr using the reporter selected by `--format`.
 *
 * Violations are written to stderr (and set `process.exitCode` to 1),
 * while clean results are written to stdout. When `--no-color` is set,
 * ANSI escape codes are stripped before output. JSON format is handled
 * separately by the caller, so this function returns early for JSON.
 *
 * @param results - The lint result information for a single file.
 * @param options - CLI options that control the output format and color.
 */
export declare function output(results: MLResultInfo, options: CLIOptions): void;
