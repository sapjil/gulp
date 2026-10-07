/**
 * A resolved set of rules, node-specific rule overrides, and child-node-specific
 * rule overrides extracted from a markuplint {@link Config}.
 */
export class Ruleset {
    /**
     * @param config - The markuplint configuration to extract rules from
     */
    constructor(config) {
        this.rules = config.rules ?? {};
        this.nodeRules = config.nodeRules ?? [];
        this.childNodeRules = config.childNodeRules ?? [];
    }
}
