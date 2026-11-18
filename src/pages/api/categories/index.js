/**
 * API Route: /api/categories
 * Récupère toutes les catégories depuis WooCommerce
 */
import { getCatalogCategories } from '@/src/lib/catalogRepository';
import { isHiddenCreamCategory } from '@/src/lib/productVisibility';
import { normalizeCategoriesToEnglish, translateCategoriesToSpanish } from '@/src/lib/productText';

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
    const { per_page = 100, hide_empty = true, lang = 'en' } = req.query;

    const params = {
      perPage: Math.min(Math.max(Number.parseInt(per_page, 10) || 100, 1), 100),
      hideEmpty: hide_empty === true || hide_empty === 'true'
    };

    const categories = await getCatalogCategories(params);
    const filteredCategories = Array.isArray(categories)
      ? categories.filter((category) => !isHiddenCreamCategory(category))
      : [];
    const visibleCategories = String(lang).toLowerCase() === 'es'
      ? translateCategoriesToSpanish(filteredCategories)
      : normalizeCategoriesToEnglish(filteredCategories);
    
    res.status(200).json({
      success: true,
      data: visibleCategories,
      count: visibleCategories.length,
      source: 'railway', market: 'US',
    });
  } catch (error) {
    console.error('Error reading US categories:', error.message);
    res.status(503).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories',
      error: error.message 
    });
  }
}
