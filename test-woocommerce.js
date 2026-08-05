/**
 * Script de test pour vérifier la connexion à l'API WooCommerce
 * Usage: node test-woocommerce.js
 */

const https = require('https');

const WORDPRESS_URL = 'https://oliviers55.sg-host.com';
const CONSUMER_KEY = 'ck_962f8b4455545de9a9a6155616535fdf8d9eb1db';
const CONSUMER_SECRET = 'cs_4242ab75e9fb88408afd2961efb76b7ce9211bc9';

// Test 1: Vérifier la connexion à l'API
console.log('🧪 Test de connexion à WooCommerce...\n');

const apiUrl = `${WORDPRESS_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=5`;

https.get(apiUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Connexion réussie!\n');
      const products = JSON.parse(data);
      
      if (products.length === 0) {
        console.log('ℹ️  Aucun produit trouvé. Ajoutez des produits dans WooCommerce.\n');
      } else {
        console.log(`📦 ${products.length} produit(s) trouvé(s):\n`);
        products.forEach((product, index) => {
          console.log(`${index + 1}. ${product.name}`);
          console.log(`   Prix: ${product.price}€`);
          console.log(`   Stock: ${product.stock_status}`);
          console.log('');
        });
      }
    } else {
      console.log(`❌ Erreur ${res.statusCode}: ${res.statusMessage}`);
      console.log('Réponse:', data);
    }
  });
}).on('error', (err) => {
  console.log('❌ Erreur de connexion:', err.message);
});

// Test 2: Vérifier les catégories
console.log('\n🏷️  Test des catégories...\n');

const catUrl = `${WORDPRESS_URL}/wp-json/wc/v3/products/categories?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

https.get(catUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const categories = JSON.parse(data);
      console.log(`✅ ${categories.length} catégorie(s) trouvée(s):\n`);
      categories.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name} (ID: ${cat.id})`);
      });
    }
  });
}).on('error', (err) => {
  console.log('❌ Erreur:', err.message);
});
