const cache = new Map();
/**
 * Converts a content model category (e.g., `#flow`, `#phrasing`) to a sorted,
 * frozen array of HTML/SVG tag names that belong to that category.
 * Results are cached for repeated lookups.
 *
 * @param contentModel - The content model category identifier
 * @param def - The specification definitions containing content model mappings
 * @returns A frozen, sorted array of tag name strings belonging to the category
 */
export function contentModelCategoryToTagNames(contentModel, def) {
    const cached = cache.get(contentModel);
    if (cached) {
        return cached;
    }
    const tags = def['#contentModels'][contentModel];
    const sortedTag = Object.freeze(tags && Array.isArray(tags) ? tags.sort() : []);
    cache.set(contentModel, sortedTag);
    return sortedTag;
}
