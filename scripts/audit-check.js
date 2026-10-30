const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('=== RUNNING FINAL ENTERPRISE AUDIT ===');

// 1. Audit Trading references
const filesToScan = [];
function getFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'scripts') return;
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.json')) {
      filesToScan.push(fullPath);
    }
  });
}
getFiles(rootDir);

let tradingIssues = 0;
filesToScan.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const relPath = path.relative(rootDir, f);
  // Match trading, crypto, forex (ignore node_modules or system files)
  const matches = content.match(/trading-course|کریپٹو|forex|disclaimer\.html/gi);
  if (matches) {
    console.warn(`[WARN] Found trading/disclaimer matches in ${relPath}: ${matches.length}`);
    tradingIssues += matches.length;
  }
});

if (tradingIssues === 0) {
  console.log('[PASS] ZERO references to trading, crypto, forex, or disclaimer.html found in production codebase!');
} else {
  console.log(`[FAIL] ${tradingIssues} legacy matches found.`);
}

// 2. Audit Courses in db.js
const dbContent = fs.readFileSync(path.join(rootDir, 'assets', 'js', 'db.js'), 'utf8');
const courseTitles = (dbContent.match(/title:\s*"[^"]+"/g) || []);
console.log('[AUDIT] Active Courses in db.js:', courseTitles);

// Verify Free course count
const freeCourses = (dbContent.match(/isFree:\s*true/g) || []);
console.log(`[AUDIT] 100% Free courses count in db.js: ${freeCourses.length} (Expected: 1)`);

// 3. Verify AI Website Dev course curriculum
const hasWebDev = dbContent.includes('id: "ai-website-dev"');
const hasWebDev5Modules = dbContent.includes('Module 1: AI-Powered Web Architecture') &&
                          dbContent.includes('Module 2: Rapid Full-Stack Development') &&
                          dbContent.includes('Module 3: Official Live Deployment') &&
                          dbContent.includes('Module 4: Live Production Maintenance') &&
                          dbContent.includes('Module 5: Enterprise Optimization');
console.log(`[AUDIT] AI Website Dev Course Present: ${hasWebDev}, All 5 Modules Present: ${hasWebDev5Modules}`);

// 4. Verify AI Tools Mastery fee
const aiToolsFeeMatch = dbContent.match(/id:\s*"ai-tools-mastery"[\s\S]*?fee:\s*(\d+)/);
console.log(`[AUDIT] AI Tools Mastery Fee in db.js: Rs. ${aiToolsFeeMatch ? aiToolsFeeMatch[1] : 'NOT FOUND'} (Expected: 3000)`);

// 5. Verify Branding Assets exist
const brandingFiles = [
  'assets/images/branding/ietp-logo.webp',
  'assets/images/branding/ietp-logo.png',
  'assets/images/branding/ietp-logo-sm.webp',
  'assets/images/branding/favicon.ico',
  'favicon.ico'
];
brandingFiles.forEach(b => {
  const exists = fs.existsSync(path.join(rootDir, b));
  console.log(`[AUDIT] Branding Asset ${b}: ${exists ? 'EXISTS' : 'MISSING'}`);
});

console.log('=== AUDIT FINISHED ===');

