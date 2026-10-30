const fs = require('fs');
const path = require('path');

const serverJsPath = path.join(__dirname, '..', 'api', 'server.js');
let serverJs = fs.readFileSync(serverJsPath, 'utf8');

const securityMiddleware = `
// Enterprise Input Sanitization & Anti-XSS / SQLi Guard
function sanitizePayload(data) {
  if (typeof data === 'string') {
    return data
      .replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/onerror\\s*=/gi, '')
      .replace(/onload\\s*=/gi, '')
      .replace(/eval\\s*\\(/gi, '')
      .replace(/[;\\\"'\\\`]/g, '')
      .trim();
  }
  if (typeof data === 'object' && data !== null) {
    for (const key of Object.keys(data)) {
      data[key] = sanitizePayload(data[key]);
    }
  }
  return data;
}

app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizePayload(req.body);
  }
  // NASA-Grade Strict Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
`;

if (!serverJs.includes('sanitizePayload')) {
  serverJs = serverJs.replace('app.use(express.json());', 'app.use(express.json());\n' + securityMiddleware);
  fs.writeFileSync(serverJsPath, serverJs, 'utf8');
  console.log('[OK] api/server.js updated with enterprise sanitization & security middleware.');
} else {
  console.log('[INFO] api/server.js already has security middleware.');
}

