/**
 * Vercel Serverless Endpoint: GET /api/health
 */
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    status: 'OK',
    academy: 'علمِ ٹیک پاکستان — ILM E TECH PAKISTAN',
    domain: 'ilmetechpakistan.com',
    founder: 'Dr. Shahid Akram Mustafai',
    aiEngine: process.env.GEMINI_API_KEY ? 'gemini-ready' : 'local-pa-advisor',
    timestamp: new Date().toISOString()
  });
};
