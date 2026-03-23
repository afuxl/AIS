export default function handler(req, res) {
  // Mengatur CORS agar endpoint dapat diakses jika diperlukan
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Custom-Header');

  // Menangani preflight request untuk CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Memastikan hanya menerima POST request
  if (req.method === 'POST') {
    const data = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      payload: req.body || {}
    };
    
    return res.status(200).json(data);
  } else {
    return res.status(405).json({ 
      error: 'Method Not Allowed', 
      message: 'Endpoint ini hanya menerima request POST' 
    });
  }
}
