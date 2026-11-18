import { getAllProducts, getCategories, getProductVariations } from './woocommerce';
import { normalizeWooProductPricesToMXN } from './pricing';
import { replaceCatalogSnapshot } from './catalogRepository';

export const syncUsCatalog = async (trigger = 'manual') => {
  const [source, categories] = await Promise.all([
    getAllProducts({ status: 'publish', per_page: 100 }),
    getCategories({ per_page: 100, hide_empty: false }),
  ]);
  const products = [];
  // Limit upstream concurrency while retaining real US variation IDs, attributes and prices.
  for (let start = 0; start < source.length; start += 3) {
    const batch = await Promise.all(source.slice(start, start + 3).map(async product => {
      const variations = [];
      if (product.type === 'variable') {
        let page = 1;
        while (true) {
          const items = await getProductVariations(product.id, { per_page: 100, page });
          if (!Array.isArray(items)) throw new Error('Unexpected US variation response.');
          variations.push(...items);
          if (items.length < 100) break;
          if (++page > 100) throw new Error('US variation pagination exceeded its limit.');
        }
      }
      return normalizeWooProductPricesToMXN({
        ...product,
        variations: variations.map(normalizeWooProductPricesToMXN),
      });
    }));
    products.push(...batch);
  }
  return replaceCatalogSnapshot(products, categories, trigger);
};
