const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Helper to replace all occurrences
function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

console.log('--- Phase 2: Updating HTML touchpoints across all pages ---');

const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'disclaimer.html');

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let originalHtml = html;

  // 1. BRANDING & LOGO REPLACEMENTS
  // Meta tags and OpenGraph / Twitter Cards
  html = html.replace(/<meta property="og:image" content="https:\/\/ilmetechpakistan\.com\/assets\/images\/logo\.jpg">/g, 
    '<meta property="og:image" content="https://ilmetechpakistan.com/assets/images/branding/ietp-logo.png">');
  html = html.replace(/<meta property="og:image:secure_url" content="https:\/\/ilmetechpakistan\.com\/assets\/images\/logo\.jpg">/g, 
    '<meta property="og:image:secure_url" content="https://ilmetechpakistan.com/assets/images/branding/ietp-logo.png">');
  html = html.replace(/<meta name="twitter:image" content="https:\/\/ilmetechpakistan\.com\/assets\/images\/logo\.jpg">/g, 
    '<meta name="twitter:image" content="https://ilmetechpakistan.com/assets/images/branding/ietp-logo.png">');
  
  // Favicon & Icons
  html = html.replace(/<link rel="icon" type="image\/jpeg" href="assets\/images\/logo\.jpg">/g, 
    '<link rel="icon" type="image/x-icon" href="favicon.ico">\n  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/branding/favicon-32x32.png">\n  <link rel="icon" type="image/webp" href="assets/images/branding/ietp-logo-sm.webp">');
  html = html.replace(/<link rel="apple-touch-icon" href="assets\/images\/logo\.jpg">/g, 
    '<link rel="apple-touch-icon" href="assets/images/branding/favicon-192x192.png">');

  // Schema.org logo
  html = html.replace(/"logo":\s*"https:\/\/ilmetechpakistan\.com\/assets\/images\/logo\.jpg"/g, 
    '"logo": "https://ilmetechpakistan.com/assets/images/branding/ietp-logo.png"');

  // Main Header logo
  html = html.replace(/<img src="assets\/images\/logo\.jpg" alt="ILM E TECH PAKISTAN Logo" width="52" height="52">/g,
    '<img src="assets/images/branding/ietp-logo-sm.webp" alt="ILM E TECH PAKISTAN (IETP) - Official Academy Logo" width="52" height="52" style="aspect-ratio:1/1; object-fit:contain; border-radius:10px;">');
  html = html.replace(/<img src="assets\/images\/logo\.jpg" alt="ILM E TECH PAKISTAN Logo">/g,
    '<img src="assets/images/branding/ietp-logo-sm.webp" alt="ILM E TECH PAKISTAN (IETP) - Official Academy Logo" width="52" height="52" style="aspect-ratio:1/1; object-fit:contain; border-radius:10px;">');

  // Mobile Drawer logo
  html = html.replace(/<img src="assets\/images\/logo\.jpg" alt="ILM E TECH PAKISTAN" style="height:\s*40px;">/g,
    '<img src="assets/images/branding/ietp-logo-sm.webp" alt="ILM E TECH PAKISTAN (IETP) - Official Academy Logo" style="height: 40px; width: 40px; aspect-ratio:1/1; object-fit:contain; border-radius:8px;">');

  // Generic logo.jpg in footer or body
  html = html.replace(/<img src="assets\/images\/logo\.jpg"([^>]*)>/g, (m, attrs) => {
    return `<img src="assets/images/branding/ietp-logo-sm.webp" alt="ILM E TECH PAKISTAN (IETP) - Official Academy Logo"${attrs}>`;
  });

  // 2. NAVIGATION DROPDOWN REPLACEMENT (PURGE TRADING, ADD AI WEBSITE DEV)
  const legacyNavDropdown = `<div class="dropdown-menu">
              <a href="course-detail.html?id=basic-ai" class="dropdown-item">Basic AI Course</a>
              <a href="course-detail.html?id=ai-tools-mastery" class="dropdown-item">AI Tools Mastery</a>
              <a href="course-detail.html?id=basic-computer" class="dropdown-item">Basic Computer Course</a>
              <a href="course-detail.html?id=ai-software-dev" class="dropdown-item">AI Software Development</a>
              <a href="course-detail.html?id=ai-content-creation" class="dropdown-item">AI Content Creation</a>
              <a href="course-detail.html?id=trading-course" class="dropdown-item">Trading Course</a>
              <a href="course-detail.html?id=one-on-one-session" class="dropdown-item" style="color:#059669; font-weight:700; border-top:1px solid #f1f5f9;"><i class="fas fa-crown text-amber-500"></i> One on One Session (VIP)</a>
            </div>`;

  const modernNavDropdown = `<div class="dropdown-menu">
              <a href="course-detail.html?id=basic-ai" class="dropdown-item"><i class="fas fa-gift text-emerald-500"></i> Basic AI Course <span style="background:#10b981; color:#fff; font-size:0.65rem; padding:0.15rem 0.45rem; border-radius:1rem; font-weight:800; margin-left:auto;">100% FREE</span></a>
              <a href="course-detail.html?id=ai-website-dev" class="dropdown-item"><i class="fas fa-globe text-sky-500"></i> AI Website Development <span style="background:#0284c7; color:#fff; font-size:0.65rem; padding:0.15rem 0.45rem; border-radius:1rem; font-weight:800; margin-left:auto;">New Track</span></a>
              <a href="course-detail.html?id=ai-tools-mastery" class="dropdown-item"><i class="fas fa-robot text-indigo-500"></i> AI Tools Mastery (30 Days)</a>
              <a href="course-detail.html?id=basic-computer" class="dropdown-item"><i class="fas fa-laptop text-slate-500"></i> Basic Computer Course</a>
              <a href="course-detail.html?id=ai-software-dev" class="dropdown-item"><i class="fas fa-code text-violet-500"></i> AI Software Development</a>
              <a href="course-detail.html?id=ai-content-creation" class="dropdown-item"><i class="fas fa-video text-rose-500"></i> AI Content Creation</a>
              <a href="course-detail.html?id=one-on-one-session" class="dropdown-item" style="color:#059669; font-weight:700; border-top:1px solid #f1f5f9;"><i class="fas fa-crown text-amber-500"></i> One on One VIP Mentorship</a>
            </div>`;

  html = html.replace(legacyNavDropdown, modernNavDropdown);

  // Catch any remaining single dropdown-item trading link
  html = html.replace(/<a href="course-detail\.html\?id=trading-course"[^>]*>Trading Course<\/a>\s*/g, '');

  // 3. FOOTER LINKS CLEANUP
  // Remove Trading Course from footer
  html = html.replace(/<li><a href="course-detail\.html\?id=trading-course">Trading Course<\/a><\/li>\s*/g, '');
  // Remove Trading Disclaimer from footer bottom
  html = html.replace(/<a href="disclaimer\.html">Trading Disclaimer<\/a>\s*/g, '');
  html = html.replace(/<a href="disclaimer\.html"[^>]*>.*?<\/a>\s*/g, '');

  // Add AI Website Development to Official Courses in footer if not present
  if (html.includes('course-detail.html?id=ai-tools-mastery') && !html.includes('course-detail.html?id=ai-website-dev') && html.includes('<h3 class="footer-title">Official Courses</h3>')) {
    html = html.replace('<li><a href="course-detail.html?id=ai-tools-mastery">AI Tools Mastery</a></li>',
      '<li><a href="course-detail.html?id=basic-ai">Basic AI Course (100% Free)</a></li>\n              <li><a href="course-detail.html?id=ai-website-dev">AI Website Development (New)</a></li>\n              <li><a href="course-detail.html?id=ai-tools-mastery">AI Tools Mastery (30 Days)</a></li>');
  }

  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`[OK] Updated touchpoints in: ${file}`);
  }
});

console.log('--- Phase 2 Completed ---');

