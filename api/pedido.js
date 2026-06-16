export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;
    const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxU8YIEyMchDHe3jiP0uGhid1GioAP0n0LwTlIsh92MwlBxiqQXwF7EFNfenBTR4NzV/exec';

    const params = new URLSearchParams({
      numero:        data.numero        || '',
      nombre:        data.nombre        || '',
      whatsapp:      data.whatsapp      || '',
      sector:        data.sector        || '',
      direccion:     data.direccion     || '',
      productos:     data.productos     || '',
      total:         data.total         || '',
      observaciones: data.observaciones || '',
      esFranquicia:  data.esFranquicia  || 'No',
    });

    const response = await fetch(`${SHEETS_URL}?${params.toString()}`);
    const text = await response.text();

    return res.status(200).json({ ok: true, sheets: text });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
