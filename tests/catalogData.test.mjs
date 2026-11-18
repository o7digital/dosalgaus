import test from 'node:test';
import assert from 'node:assert/strict';
import { publicCatalogProduct, applyUsPriceRegistry, markStoredUsdPrice } from '../src/lib/catalogData.mjs';
import { getWooProductMXNPrice, normalizeWooProductPricesToMXN } from '../src/lib/pricing.js';

process.env.NEXT_PUBLIC_STORE_CURRENCY = 'USD';
process.env.NEXT_PUBLIC_MXN_PER_USD = '17.49';

test('draft and blocked snapshots never become public products', () => {
  assert.equal(publicCatalogProduct({ status: 'draft', payload: { id: 1 } }), null);
  assert.equal(publicCatalogProduct({ status: 'publish', blocked: true, payload: { id: 1 } }), null);
});

test('verified US decisions keep US product and variation identities with one final USD price', () => {
  const product = { id: 7, price: '28.52', variations: [{ id: 8, parent_id: 7, price: '28.52', attributes: [{ name: 'Color', option: 'Blue' }] }] };
  const result = applyUsPriceRegistry(product, { verified: true, final_currency: 'USD', final_price: '498.78' });
  assert.equal(result.price, '498.78');
  assert.equal(result.variations[0].price, '498.78');
  assert.equal(result.variations[0].id, 8);
  assert.equal(result.variations[0].parent_id, 7);
  assert.deepEqual(result.variations[0].attributes, product.variations[0].attributes);
  assert.equal(getWooProductMXNPrice(result, result.price), 498.78);
  assert.equal(product.price, '28.52');
});

test('unverified or MXN registry amounts cannot replace a US snapshot price', () => {
  for (const registry of [{ verified: false, final_currency: 'USD', final_price: 900 }, { verified: true, final_currency: 'MXN', final_price: 900 }]) {
    assert.equal(applyUsPriceRegistry({ price: '20' }, registry).price, '20');
  }
});

test('cached USD values stay unchanged across repeated normalizations', () => {
  const product = markStoredUsdPrice({ price: '125.50', meta_data: [{ key: 'dosalga_price_display_currency', value: 'MXN' }] });
  const once = normalizeWooProductPricesToMXN(product);
  const twice = normalizeWooProductPricesToMXN(once);
  assert.equal(once.price, '125.50');
  assert.equal(twice.price, '125.50');
  assert.equal(twice.meta_data.filter(m => m.key === 'dosalga_price_display_currency').length, 1);
  assert.equal(twice.meta_data.find(m => m.key === 'dosalga_price_display_currency').value, 'USD');
});

test('legacy unmarked values keep the existing conversion during the migration', () => {
  assert.ok(Math.abs(getWooProductMXNPrice({ price: '1749' }, '1749') - 100) < 0.000001);
});
