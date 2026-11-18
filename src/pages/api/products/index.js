/**
 * API Route: /api/products
 * Récupère tous les produits depuis WooCommerce
 */
import { getCatalogProducts } from '@/src/lib/catalogRepository';
import {
  translateWooProductsDescriptionsToSpanish,
  translateWooProductsTextToEnglish,
} from '@/src/lib/productText';
import { isProductVisible } from '@/src/lib/productVisibility';

const parsePositiveInteger = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return parsedValue;
};

const normalizePerPage = (value, fallback) => {
  return Math.min(parsePositiveInteger(value, fallback), 100);
};

const isTrue = (value) => value === true || value === 'true';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Dosalga-Catalog-Source', 'railway');
  res.setHeader('X-Dosalga-Catalog-Market', 'US');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      page = 1, 
      per_page = 10, 
      limit,
      category, 
      search, 
      sku,
      orderby = 'date', 
      order = 'desc',
      on_sale,
      featured,
      all = false,
      lang = 'en',
    } = req.query;

    const fetchAllProducts = isTrue(all);
    const resolvedPerPage = normalizePerPage(limit ?? per_page, fetchAllProducts ? 100 : 10);

    const params = {
      perPage: resolvedPerPage,
      orderby,
      order,
      all: fetchAllProducts,
    };

    if (!fetchAllProducts) {
      params.page = parsePositiveInteger(page, 1);
    }

    // Ajouter les filtres optionnels
    if (category) params.category = category;
    if (search) params.search = search;
    if (sku) params.sku = String(sku).trim();
    if (on_sale !== undefined) params.onSale = isTrue(on_sale);
    if (featured !== undefined) params.featured = isTrue(featured);

    const products = await getCatalogProducts(params);

    // Guard: if upstream (SiteGround captcha) returns HTML/string, treat as error
    if (!Array.isArray(products)) {
      throw new Error('WooCommerce API returned unexpected payload (possibly captcha).');
    }

    const normalizedProducts = products.filter(isProductVisible);
    const visibleProducts = String(lang).toLowerCase() === 'es'
      ? translateWooProductsDescriptionsToSpanish(normalizedProducts)
      : translateWooProductsTextToEnglish(normalizedProducts);

    res.status(200).json({
      success: true,
      data: visibleProducts,
      count: visibleProducts.length,
      all: fetchAllProducts,
      source: 'railway',
      market: 'US',
    });
  } catch (error) {
    console.error('Error reading US Railway products:', error.message);
    res.status(503).json({
      success: false,
      message: 'Erreur lors de la récupération des produits',
      error: error.message 
    });
  }
}
