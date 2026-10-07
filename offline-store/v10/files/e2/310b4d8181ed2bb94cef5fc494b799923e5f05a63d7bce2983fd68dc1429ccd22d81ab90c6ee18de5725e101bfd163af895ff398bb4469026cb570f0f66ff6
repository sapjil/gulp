import type { CLIOptions } from './bootstrap.js';
import type { APIOptions } from '../api/types.js';
import type { Target } from '@markuplint/file-resolver';
/**
 * Executes the markuplint linting command against the given files.
 *
 * Resolves file targets, creates an {@link MLEngine} for each file, collects
 * violations, and outputs results in the requested format. When the `--fix`
 * flag is set, overwrites files with their auto-fixed content.
 *
 * @param files - The list of file targets (paths or inline source code) to lint.
 * @param options - CLI options controlling output format, fix mode, locale, and other behaviors.
 * @param apiOptions - Optional overrides for the underlying API (e.g., custom rules or config).
 * @returns `true` if any errors were found (or warnings exceeded the limit), `false` otherwise.
 */
export declare function command(files: readonly Readonly<Target>[], options: CLIOptions, apiOptions?: APIOptions): Promise<boolean>;
