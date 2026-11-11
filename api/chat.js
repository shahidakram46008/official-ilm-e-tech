/**
 * Vercel Serverless Endpoint: POST /api/chat
 * Powers Dr. Shahid Akram Mustafai's Personal Educational Assistant (Gemini + Website Grounding).
 */
const { generateAdvisorReply, sanitizeChatText } = require('./advisor-brain');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body || '{}');
    }
    body = body && typeof body === 'object' ? body : {};

    const message = sanitizeChatText(body.message || '', 1500);
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message payload is required' });
    }

    const result = await generateAdvisorReply({
      message,
      history: Array.isArray(body.history) ? body.history.slice(-10) : [],
      knowledge: typeof body.knowledge === 'string' ? body.knowledge : '',
      studentProfile: body.studentProfile && typeof body.studentProfile === 'object' ? body.studentProfile : {}
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('[/api/chat Error]:', err);
    return res.status(500).json({ success: false, message: 'AI Advisor temporarily unavailable' });
  }
};
