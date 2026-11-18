import { timingSafeEqual } from 'node:crypto';
import { syncUsCatalog } from '@/src/lib/catalogSync';

export const config = { maxDuration: 300 };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST'].includes(req.method)) return res.status(405).json({ success: false, message: 'Method not allowed' });
  const secret = req.method === 'GET' ? process.env.CRON_SECRET : process.env.CATALOG_SYNC_SECRET;
  const supplied = String(req.headers.authorization || '');
  const expected = secret ? `Bearer ${secret}` : '';
  if (!expected || Buffer.byteLength(supplied) !== Buffer.byteLength(expected)
      || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    return res.status(200).json({ success: true, ...await syncUsCatalog(req.method === 'GET' ? 'cron' : 'manual') });
  } catch (error) {
    console.error('US catalogue synchronization failed:', error.message);
    return res.status(503).json({ success: false, message: 'US catalogue synchronization failed' });
  }
}
