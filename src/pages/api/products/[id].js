/**
 * API Route: /api/products/[id]
 * Récupère un produit par ID depuis WooCommerce
 */
import { getCatalogProduct } from '@/src/lib/catalogRepository';
import {
  translateWooProductDescriptionsToSpanish,
  translateWooProductTextToEnglish,
} from '@/src/lib/productText';
import { isProductVisible } from '@/src/lib/productVisibility';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Dosalga-Catalog-Source', 'railway');
  res.setHeader('X-Dosalga-Catalog-Market', 'US');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, lang = 'en' } = req.query;

  try {
    const product = await getCatalogProduct(id);

    // Guard contre les réponses HTML/captcha
    if (!product || !isProductVisible(product)) {
      return res.status(404).json({
        success: false,
        message: 'Produit indisponible',
      });
    }
    
    // Si le produit a des variations, les récupérer aussi
    const variations = Array.isArray(product.variations) ? product.variations : [];

    const productWithReviews = {
      ...product,
      reviews: [],
    };
    const normalizedProduct = String(lang).toLowerCase() === 'es'
      ? translateWooProductDescriptionsToSpanish(productWithReviews)
      : translateWooProductTextToEnglish(productWithReviews);

    res.status(200).json({
      success: true,
      data: {
        ...normalizedProduct,
        variations,
      },
      source: 'railway',
      market: 'US',
    });
  } catch (error) {
    console.error(`Error reading US product ${id}:`, error.message);
    res.status(503).json({
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message 
    });
  }
}
