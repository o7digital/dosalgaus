const managedCurrencyKeys = new Set(['dosalga_price_display_currency', 'dosalga_price_value_currency']);

export const markStoredUsdPrice = (product) => ({
  ...product,
  priceValueCurrency: 'USD',
  price_html: '',
  meta_data: [
    ...(product.meta_data || []).filter(meta => !managedCurrencyKeys.has(meta.key)),
    { key: 'dosalga_price_display_currency', value: 'USD' },
    { key: 'dosalga_price_value_currency', value: 'USD' },
  ],
});

export const applyUsPriceRegistry = (product, registry) => {
  if (registry?.verified !== true || String(registry.final_currency).trim() !== 'USD'
      || !(Number(registry.final_price) > 0)) return markStoredUsdPrice(product);
  const price = Number(registry.final_price).toFixed(2);
  const update = item => markStoredUsdPrice({ ...item, price, regular_price: price, sale_price: '', on_sale: false });
  return {
    ...update(product),
    variations: (product.variations || []).map(variation => typeof variation === 'object' ? update(variation) : variation),
  };
};

export const publicCatalogProduct = (row) => {
  if (!row || row.status !== 'publish' || row.blocked === true) return null;
  return applyUsPriceRegistry(row.payload, row);
};
