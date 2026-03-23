export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Custom-Header');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const targetUrl = 'https://presensi.free.beeceptor.com/presensi/submit';
      
      // Meneruskan request ke Beeceptor
      const beeceptorResponse = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-By': 'anu'
        },
        body: JSON.stringify(req.body || {})
      });

      const responseText = await beeceptorResponse.text();

      // Mengembalikan response hasil dari Beeceptor ke tampilan HTML
      return res.status(200).json({responseText
      });

    } catch (error) {
      return res.status(500).json({ 
        error: 'Gagal melakukan request ke Beeceptor',
        details: error.message 
      });
    }
  } else {
    return res.status(405).json({ 
      error: 'Method Not Allowed', 
      message: 'Endpoint ini hanya menerima request POST' 
    });
  }
}
