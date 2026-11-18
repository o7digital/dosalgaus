// Bootstrap from an explicit snapshot captured before switching the public API.
// Later refreshes use the authenticated /api/catalog/sync endpoint.
import fs from 'node:fs/promises';
import { replaceCatalogSnapshot } from '../src/lib/catalogRepository.js';
import { db } from '../src/lib/database.js';

const file = process.argv[2];
if (!file) throw new Error('Usage: node scripts/seed-railway-catalog.mjs <US snapshot JSON>');
try {
  const snapshot = JSON.parse(await fs.readFile(file, 'utf8'));
  if (snapshot.market !== 'US') throw new Error('Only a US snapshot may seed the US public catalogue.');
  console.log(await replaceCatalogSnapshot(snapshot.products, snapshot.categories, 'railway-bootstrap'));
} finally {
  await db?.end();
}
