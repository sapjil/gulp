import { createRule } from '@markuplint/ml-core';
import meta from './meta.js';
/**
 * Rule that validates the presence and correctness of the document's DOCTYPE
 * declaration.
 *
 * Reports an error when no DOCTYPE is found (skipped for document fragments)
 * and when an obsolete DOCTYPE (one with a public or system identifier) is
 * declared.
 */
export default createRule({
    meta: meta,
    defaultValue: 'always',
    defaultOptions: {
        denyObsoleteType: true,
    },
    verify({ document, report, t }) {
        if (document.isFragment) {
            return;
        }
        const doctype = document.doctype;
        if (!doctype) {
            report({
                message: t('Require {0}', 'doctype'),
                line: 1,
                col: 1,
                raw: '',
            });
            return;
        }
        if ((doctype.name.toLowerCase() === 'html' && doctype.publicId) || doctype.systemId) {
            report({
                scope: doctype,
                message: t('Never {0} {1}', 'declare', 'obsolete doctype'),
            });
        }
    },
});
