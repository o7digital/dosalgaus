const FALLBACK_WORDPRESS_URL = 'https://oliviers55.sg-host.com';

const clean = (value) => String(value || '').trim();

const getWordPressUrl = () => {
  try {
    return new URL(process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL || FALLBACK_WORDPRESS_URL).origin;
  } catch {
    return FALLBACK_WORDPRESS_URL;
  }
};

const getAuthHeader = () => {
  const user = clean(process.env.WP_APP_USER || process.env.WORDPRESS_APP_USER);
  const password = clean(process.env.WP_APP_PASSWORD || process.env.WORDPRESS_APP_PASSWORD);

  if (!user || !password) return null;
  return `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const name = clean(req.body?.name);
  const phone = clean(req.body?.phone);
  const email = clean(req.body?.email);
  const subject = clean(req.body?.subject);
  const message = clean(req.body?.message);
  const lang = clean(req.body?.lang || 'en');

  if (!name || !phone || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const authHeader = getAuthHeader();
  if (!authHeader) {
    return res.status(500).json({ success: false, message: 'Contact backend is not configured' });
  }

  const content = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Language: ${lang}`,
    '',
    message,
  ].join('\n');

  try {
    const response = await fetch(`${getWordPressUrl()}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `Contact - ${subject}`,
        content,
        status: 'private',
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return res.status(502).json({ success: false, message: payload?.message || 'WordPress contact save failed' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to send contact request' });
  }
}
