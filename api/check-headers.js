// api/check-headers.js
export default function handler(req, res) {
  // Mengambil beberapa header penting
  const data = {
    ip: req.headers['x-real-ip'] || 'Localhost',
    negara: req.headers['x-vercel-ip-country'] || 'Unknown',
    browser: req.headers['user-agent'],
    semuaHeader: req.headers
  };
  
  res.status(200).json(data);
}
