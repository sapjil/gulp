import type { MLFile } from './ml-file/index.js';
import type { MLMarkupLanguageParser, MLParser, ParserOptions } from '@markuplint/ml-ast';
import type { ParserConfig } from '@markuplint/ml-config';
/**
 * Resolves the appropriate parser for a given file based on the parser configuration.
 *
 * Matches the file's basename against patterns in the parser config to find
 * the correct parser module. Falls back to the HTML parser if no pattern matches.
 *
 * @param file - The file to find a parser for
 * @param parserConfig - A mapping of file extension patterns to parser module names
 * @param parserOptions - Parser options to pass through
 * @returns The resolved parser, its module name, parser options, and whether a pattern matched
 */
export declare function resolveParser(file: Readonly<MLFile>, parserConfig?: ParserConfig, parserOptions?: ParserOptions): Promise<{
    parserModName: string;
    parser: MLParser | MLMarkupLanguageParser;
    parserOptions: ParserOptions;
    matched: boolean;
}>;
