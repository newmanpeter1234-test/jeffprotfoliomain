const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/jefrincorreya@gmail.com';
// Uses the FormSubmit origin already activated by the inbox owner so deployments
// on any Vercel preview or production URL deliver immediately without re-activation.
const ACTIVATED_ORIGIN = 'https://www.jeffsec.in';
const ACTIVATED_REFERER = 'https://www.jeffsec.in/contact';

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    const interest = String(body.interest || 'SOC opportunity').trim();
    const honey = String(body._honey || '').trim();

    if (honey) {
      return res.status(400).json({ success: false, message: 'Spam rejected' });
    }
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const upstream = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: ACTIVATED_ORIGIN,
        Referer: ACTIVATED_REFERER,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        interest,
        _subject: body._subject || `Portfolio · ${interest} — ${name}`,
        _template: body._template || 'table',
        _honey: '',
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    return res.status(upstream.status).json(data);
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: error instanceof Error ? error.message : 'Upstream mail relay failed',
    });
  }
}
