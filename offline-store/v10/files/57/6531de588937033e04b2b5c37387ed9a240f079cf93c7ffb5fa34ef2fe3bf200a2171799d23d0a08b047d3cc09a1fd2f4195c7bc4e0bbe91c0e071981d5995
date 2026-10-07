import type { ARIAVersion, ARIARoleInSchema, MLMLSpec, ARIARole } from '../../types/index.js';
import type { NamespaceURI } from '@markuplint/ml-ast';
/**
 * Retrieves the full ARIA role specification for a given role name, including
 * its properties, requirements, and the complete chain of super-class roles.
 * For SVG namespace elements, also searches graphics ARIA roles.
 *
 * @param specs - The full markup language specification
 * @param roleName - The name of the ARIA role to look up
 * @param namespace - The namespace URI of the element context
 * @param version - The ARIA specification version to use
 * @returns The role specification with super-class roles, or null if the role does not exist
 */
export declare function getRoleSpec(specs: MLMLSpec, roleName: string, namespace: NamespaceURI, version: ARIAVersion): (ARIARole & {
    superClassRoles: ARIARoleInSchema[];
}) | null;
