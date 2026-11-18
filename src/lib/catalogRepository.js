import { query, withTransaction } from './database.js';
import { publicCatalogProduct, markStoredUsdPrice } from './catalogData.mjs';

// The market is fixed here: URL parameters and MX imports cannot select another catalogue.
const STORE = 'US';
const productSelect = `
  SELECT c.payload, c.status, r.final_price, r.final_currency, r.verified,
    (COALESCE(l.metadata->>'wooFrozen', 'false') = 'true' OR l.active = FALSE) AS blocked
  FROM storefront_catalog_products c
  LEFT JOIN product_price_registry r ON r.store_code = c.store_id AND r.woo_product_id = c.woo_id
  LEFT JOIN store_listings l ON l.external_id = 'wp-dosalga-usa-' || c.woo_id::text
`;
const visible = "c.store_id = $1 AND c.status = 'publish' AND COALESCE(l.metadata->>'wooFrozen', 'false') <> 'true' AND COALESCE(l.active, TRUE) = TRUE";

export const getCatalogProducts = async (options = {}) => {
  const values = [STORE];
  const conditions = [visible];
  const parameter = value => { values.push(value); return `$${values.length}`; };
  if (Number.isSafeInteger(Number(options.category)) && Number(options.category) > 0) conditions.push(`c.category_ids @> ARRAY[${parameter(Number(options.category))}]::bigint[]`);
  if (options.search) conditions.push(`c.search_text ILIKE ${parameter(`%${options.search}%`)}`);
  if (options.sku) conditions.push(`LOWER(c.sku) = LOWER(${parameter(options.sku)})`);
  if (options.onSale !== undefined) conditions.push(`c.on_sale = ${parameter(options.onSale)}`);
  if (options.featured !== undefined) conditions.push(`c.featured = ${parameter(options.featured)}`);
  const sort = { date: 'c.date_created', price: "CASE WHEN r.verified AND r.final_currency = 'USD' THEN r.final_price ELSE c.price END", title: 'c.name', popularity: 'c.total_sales', rating: 'c.average_rating' }[options.orderby] || 'c.date_created';
  const direction = String(options.order).toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  const pagination = options.all ? '' : `LIMIT ${parameter(options.perPage || 10)} OFFSET ${parameter(((options.page || 1) - 1) * (options.perPage || 10))}`;
  const result = await query(`${productSelect} WHERE ${conditions.join(' AND ')} ORDER BY ${sort} ${direction} NULLS LAST, c.woo_id DESC ${pagination}`, values);
  return result.rows.map(publicCatalogProduct).filter(Boolean);
};

export const getCatalogProduct = async id => {
  if (!/^[1-9]\d*$/.test(String(id))) return null;
  const result = await query(`${productSelect} WHERE ${visible} AND c.woo_id = $2 LIMIT 1`, [STORE, id]);
  return publicCatalogProduct(result.rows[0]);
};

export const getCatalogCategories = async ({ hideEmpty = false, perPage = 100 } = {}) => {
  const result = await query(`SELECT payload FROM storefront_catalog_categories WHERE store_id = $1 ${hideEmpty ? 'AND product_count > 0' : ''} ORDER BY name LIMIT $2`, [STORE, perPage]);
  return result.rows.map(row => row.payload);
};

export const replaceCatalogSnapshot = async (products, categories, trigger = 'manual') => {
  if (!Array.isArray(products) || !products.length || !Array.isArray(categories) || !categories.length) {
    throw new Error('An empty upstream response cannot replace the US catalogue.');
  }
  return withTransaction(async client => {
    const run = await client.query("INSERT INTO storefront_catalog_sync_runs (store_id, trigger_name, status) VALUES ($1,$2,'running') RETURNING id", [STORE, trigger]);
    for (const product of products) {
      const id = Number(product.id);
      if (!Number.isSafeInteger(id) || id <= 0 || product.status !== 'publish') throw new Error('Only published US WooCommerce products can enter the public catalogue.');
      const payload = markStoredUsdPrice(product);
      const categoryIds = (payload.categories || []).map(category => Number(category.id)).filter(Number.isSafeInteger);
      const text = [payload.name, payload.sku, payload.slug, payload.description, ...(payload.categories || []).map(c => c.name)].join(' ').replace(/<[^>]+>/g, ' ');
      await client.query(`INSERT INTO storefront_catalog_products (store_id, woo_id, sku, slug, name, status,
        price, regular_price, sale_price, on_sale, featured, stock_status, total_sales, average_rating,
        date_created, date_modified, category_ids, search_text, payload)
        VALUES ($1,$2,$3,$4,$5,'publish',$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18::jsonb)
        ON CONFLICT (store_id, woo_id) DO UPDATE SET sku=EXCLUDED.sku, slug=EXCLUDED.slug, name=EXCLUDED.name,
          status=EXCLUDED.status, price=EXCLUDED.price, regular_price=EXCLUDED.regular_price, sale_price=EXCLUDED.sale_price,
          on_sale=EXCLUDED.on_sale, featured=EXCLUDED.featured, stock_status=EXCLUDED.stock_status,
          total_sales=EXCLUDED.total_sales, average_rating=EXCLUDED.average_rating, date_created=EXCLUDED.date_created,
          date_modified=EXCLUDED.date_modified, category_ids=EXCLUDED.category_ids, search_text=EXCLUDED.search_text,
          payload=EXCLUDED.payload, synced_at=NOW()`,
      [STORE, id, payload.sku || null, payload.slug, payload.name, payload.price || null, payload.regular_price || null,
        payload.sale_price || null, Boolean(payload.on_sale), Boolean(payload.featured), payload.stock_status,
        Number(payload.total_sales) || 0, Number(payload.average_rating) || 0,
        payload.date_created || null, payload.date_modified || null, categoryIds, text, JSON.stringify(payload)]);
    }
    for (const category of categories) await client.query(`INSERT INTO storefront_catalog_categories (store_id,woo_id,slug,name,product_count,payload)
      VALUES ($1,$2,$3,$4,$5,$6::jsonb) ON CONFLICT (store_id,woo_id) DO UPDATE SET slug=EXCLUDED.slug,
      name=EXCLUDED.name,product_count=EXCLUDED.product_count,payload=EXCLUDED.payload,synced_at=NOW()`,
    [STORE, category.id, category.slug, category.name, Number(category.count) || 0, JSON.stringify(category)]);
    // Imports awaiting US review live in storefront_catalog_imports and are never touched by a Woo sync.
    await client.query('DELETE FROM storefront_catalog_products WHERE store_id=$1 AND NOT(woo_id=ANY($2::bigint[]))', [STORE, products.map(p => p.id)]);
    await client.query('DELETE FROM storefront_catalog_categories WHERE store_id=$1 AND NOT(woo_id=ANY($2::bigint[]))', [STORE, categories.map(c => c.id)]);
    await client.query("UPDATE storefront_catalog_sync_runs SET status='complete',product_count=$2,category_count=$3,completed_at=NOW() WHERE id=$1", [run.rows[0].id, products.length, categories.length]);
    return { products: products.length, categories: categories.length, runId: run.rows[0].id };
  });
};
