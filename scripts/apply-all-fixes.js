const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('--- Applying Comprehensive Enterprise Modernization ---');

// ============================================================================
// 1. UPDATE index.html
// ============================================================================
const indexPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// A. Clean up double alt in hero logo
indexHtml = indexHtml.replace(/<img src="assets\/images\/branding\/ietp-logo-sm\.webp" alt="ILM E TECH PAKISTAN \(IETP\) - Official Academy Logo" alt="ILM E TECH PAKISTAN Brand Logo" class="hero-logo-img">/g,
  '<img src="assets/images/branding/ietp-logo.webp" alt="ILM E TECH PAKISTAN (IETP) - Official Academy Logo" class="hero-logo-img" width="340" height="340" style="aspect-ratio:1/1; object-fit:contain; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.3);">'
);

// B. Strict Tickers Requirement 3.1
const tickerGroupHtml = `        <!-- Track Content 1 -->
        <div class="ticker-group">
          <!-- Item 1: 7-Day Basic AI 100% Free -->
          <div class="ticker-item">
            <span class="ticker-text">🚀 نیا داخلہ بیچ 2026: 7 روزہ بیسک AI کورس 100% مفت! آن لائن سیٹ بُک کریں۔</span>
            <a href="admissions.html?course=basic-ai" class="nasa-ticker-cta-btn"><i class="fas fa-gift"></i> مفت سیٹ بک کریں</a>
            <span class="ticker-separator"><i class="fas fa-bolt"></i></span>
          </div>

          <!-- Item 2: 15-Day AI Website Development New Course -->
          <div class="ticker-item">
            <span class="ticker-text">💻 نیا کورس لانچ: 15 روزہ AI ویب سائٹ ڈویلپمنٹ کورس — ویب سائٹ بنانے سے لائیو کرنے تک مکمل ٹریننگ!</span>
            <a href="course-detail.html?id=ai-website-dev" class="nasa-ticker-cta-btn"><i class="fas fa-globe"></i> تفصیلات و داخلہ</a>
            <span class="ticker-separator"><i class="fas fa-rocket"></i></span>
          </div>

          <!-- Item 3: 30-Day AI Tools Mastery Subsidized Rs. 3,000 -->
          <div class="ticker-item">
            <span class="ticker-text">⭐ 30 روزہ AI ٹولز ماسٹری ماسٹر کلاس — اب صرف 3,000 روپے میں لائیو داخلہ حاصل کریں۔</span>
            <a href="course-detail.html?id=ai-tools-mastery" class="nasa-ticker-cta-btn"><i class="fas fa-graduation-cap"></i> داخلہ لیں (Rs. 3,000)</a>
            <span class="ticker-separator"><i class="fas fa-star"></i></span>
          </div>

          <!-- Item 4: One-on-One VIP Mentorship -->
          <div class="ticker-item">
            <span class="ticker-text">💎 ون آن ون پرائیویٹ رہنمائی براہِ راست ڈاکٹر شاہد اکرم مصطفائی کے ساتھ دستیاب ہے۔</span>
            <a href="course-detail.html?id=one-on-one-session" class="nasa-ticker-cta-btn"><i class="fas fa-crown"></i> وی آئی پی سیشن بک کریں</a>
            <span class="ticker-separator"><i class="fas fa-gem"></i></span>
          </div>
        </div>

        <!-- Track Content 2 (Duplicate for Seamless Continuous Marquee) -->
        <div class="ticker-group" aria-hidden="true">
          <!-- Item 1: 7-Day Basic AI 100% Free -->
          <div class="ticker-item">
            <span class="ticker-text">🚀 نیا داخلہ بیچ 2026: 7 روزہ بیسک AI کورس 100% مفت! آن لائن سیٹ بُک کریں۔</span>
            <a href="admissions.html?course=basic-ai" class="nasa-ticker-cta-btn"><i class="fas fa-gift"></i> مفت سیٹ بک کریں</a>
            <span class="ticker-separator"><i class="fas fa-bolt"></i></span>
          </div>

          <!-- Item 2: 15-Day AI Website Development New Course -->
          <div class="ticker-item">
            <span class="ticker-text">💻 نیا کورس لانچ: 15 روزہ AI ویب سائٹ ڈویلپمنٹ کورس — ویب سائٹ بنانے سے لائیو کرنے تک مکمل ٹریننگ!</span>
            <a href="course-detail.html?id=ai-website-dev" class="nasa-ticker-cta-btn"><i class="fas fa-globe"></i> تفصیلات و داخلہ</a>
            <span class="ticker-separator"><i class="fas fa-rocket"></i></span>
          </div>

          <!-- Item 3: 30-Day AI Tools Mastery Subsidized Rs. 3,000 -->
          <div class="ticker-item">
            <span class="ticker-text">⭐ 30 روزہ AI ٹولز ماسٹری ماسٹر کلاس — اب صرف 3,000 روپے میں لائیو داخلہ حاصل کریں۔</span>
            <a href="course-detail.html?id=ai-tools-mastery" class="nasa-ticker-cta-btn"><i class="fas fa-graduation-cap"></i> داخلہ لیں (Rs. 3,000)</a>
            <span class="ticker-separator"><i class="fas fa-star"></i></span>
          </div>

          <!-- Item 4: One-on-One VIP Mentorship -->
          <div class="ticker-item">
            <span class="ticker-text">💎 ون آن ون پرائیویٹ رہنمائی براہِ راست ڈاکٹر شاہد اکرم مصطفائی کے ساتھ دستیاب ہے۔</span>
            <a href="course-detail.html?id=one-on-one-session" class="nasa-ticker-cta-btn"><i class="fas fa-crown"></i> وی آئی پی سیشن بک کریں</a>
            <span class="ticker-separator"><i class="fas fa-gem"></i></span>
          </div>
        </div>`;

indexHtml = indexHtml.replace(/<div class="ticker-track" id="tickerTrack">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/aside>/,
  `<div class="ticker-track" id="tickerTrack">\n${tickerGroupHtml}\n      </div>\n    </div>\n    <!-- NASA HUD Controls Toolbar -->\n    <div class="nasa-ticker-hud-controls" aria-label="Ticker Controls">\n      <button type="button" class="nasa-ticker-hud-btn" id="tickerPauseBtn" aria-label="Pause or Resume Ticker" title="Pause / Play Marquee">\n        <i class="fas fa-pause" id="tickerPauseIcon"></i>\n        <span id="tickerPauseText">PAUSE</span>\n      </button>\n      <span class="nasa-ticker-status-tag" title="Live Telemetry Feed Active">\n        <span class="status-live-dot"></span> LIVE\n      </span>\n    </div>\n  </aside>`
);

// C. Update Free Admissions Modal Dropdown & Text (Requirement 3.2)
indexHtml = indexHtml.replace(/<div class="lead-pill">[\s\S]*?<\/p>\s*<\/div>/,
  `<div class="lead-pill">
          <i class="fas fa-gift text-emerald-400"></i> 100% FREE LAUNCH COHORT // مفت داخلہ
        </div>
        <h2 id="schModalTitle" class="lead-title-urdu">
          7 روزہ بیسک AI کورس 100% مفت میں جوائن کریں!
        </h2>
        <div class="lead-title-en">
          Join 7-Day Basic AI Free Launch Cohort or Subsidized Professional Tracks
        </div>
        <p class="lead-desc">
          <strong>علمِ ٹیک پاکستان</strong> کے زیرِ سرپرستی <strong>ڈاکٹر شاہد اکرم مصطفائی</strong> کے تصدیق شدہ بیج میں اپنی مفت سیٹ فوری بُک کریں۔
        </p>
      </div>`
);

const modernLeadCourseSelect = `<div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label" for="leadCourse" style="font-size: 0.84rem; font-weight: 700; color: #1e293b;">کورس منتخب کریں / Select Course *</label>
          <select id="leadCourse" class="form-control form-select" required style="background: #ffffff; border: 1.5px solid #10b981; color: #0f172a; padding:0.65rem 0.85rem; border-radius:0.5rem; font-size:0.95rem; font-weight:600;">
            <option value="Basic AI Course (7 Days - 100% FREE Launch)">Basic AI Course (7 Days - 100% FREE Launch • واحد مفت کورس)</option>
            <option value="AI Website Development (15 Days - Rs. 5,000)">AI Website Development (15 Days - Rs. 5,000 PKR • نیا فلیگ شپ)</option>
            <option value="AI Tools Mastery (30 Days - Rs. 3,000)">AI Tools Mastery (30 Days - Rs. 3,000 PKR • 70% رعایت)</option>
            <option value="Basic Computer Course (6 Weeks - Rs. 3,000)">Basic Computer Course (6 Weeks - Rs. 3,000 PKR)</option>
            <option value="AI Software Development (6 Weeks - Rs. 15,000)">AI Software Development (6 Weeks - Rs. 15,000 PKR)</option>
            <option value="AI Content Creation (5 Weeks - Rs. 20,000)">AI Content Creation (5 Weeks - Rs. 20,000 PKR)</option>
            <option value="One on One VIP Mentorship (Rs. 20,000)">One on One VIP Mentorship (ڈاکٹر شاہد اکرم مصطفائی - Rs. 20,000)</option>
          </select>
        </div>`;

indexHtml = indexHtml.replace(/<div class="form-group" style="margin-bottom: 1\.25rem;">\s*<label class="form-label" for="leadCourse"[\s\S]*?<\/select>\s*<\/div>/, modernLeadCourseSelect);

// D. Career Matcher Update in index.html (Adding AI Website Development and updating AI Tools fee)
const modernMatcherOptions = `<div class="matcher-grid-options" role="radiogroup" aria-label="Select Your Goal">
          <button type="button" class="matcher-option-btn active" data-match="freelance" role="radio" aria-checked="true">
            <i class="fas fa-tools matcher-opt-icon text-emerald-400"></i>
            <div>
              <div class="matcher-opt-title">AI Tools Mastery (30 Days)</div>
              <div class="matcher-opt-desc">25+ AI tools, video editing, voice cloning &amp; productivity.</div>
            </div>
          </button>

          <button type="button" class="matcher-option-btn" data-match="webdev" role="radio" aria-checked="false">
            <i class="fas fa-globe matcher-opt-icon text-sky-400"></i>
            <div>
              <div class="matcher-opt-title">AI Website Development</div>
              <div class="matcher-opt-desc">Build, deploy live &amp; monetize sites in 15 days without coding.</div>
            </div>
          </button>

          <button type="button" class="matcher-option-btn" data-match="coding" role="radio" aria-checked="false">
            <i class="fas fa-code matcher-opt-icon text-indigo-400"></i>
            <div>
              <div class="matcher-opt-title">AI Software Engineering</div>
              <div class="matcher-opt-desc">Build web apps, Python AI scripts, APIs &amp; SaaS tools.</div>
            </div>
          </button>

          <button type="button" class="matcher-option-btn" data-match="vip" role="radio" aria-checked="false">
            <i class="fas fa-crown matcher-opt-icon text-amber-400"></i>
            <div>
              <div class="matcher-opt-title">VIP 1-on-1 Mentorship</div>
              <div class="matcher-opt-desc">Direct private coaching with Founder Dr. Shahid Akram Mustafai.</div>
            </div>
          </button>
        </div>`;

indexHtml = indexHtml.replace(/<div class="matcher-grid-options"[\s\S]*?<\/div>\s*<!-- Dynamic Match Result Display -->/,
  modernMatcherOptions + '\n\n        <!-- Dynamic Match Result Display -->'
);

// Update MATCH_DATA in script
const modernMatchData = `const MATCH_DATA = {
        freelance: {
          badge: "RECOMMENDED FOR DIGITAL CREATORS & PRODUCTIVITY",
          title: "AI Tools Mastery (30-Day Masterclass)",
          urduTitle: "اے آئی ٹولز ماسٹری کورس",
          price: "Rs. 3,000 PKR (70% Subsidized Special)",
          duration: "30 Days Live + Daily Interactive Q&A",
          desc: "Master 25+ cutting-edge AI tools (ChatGPT, Midjourney, ElevenLabs, CapCut AI, Runway, NotebookLM). Build immediate client deliverables and workflows.",
          link: "course-detail.html?id=ai-tools-mastery",
          actionText: "Enroll in AI Tools (Rs. 3,000)"
        },
        webdev: {
          badge: "NEW HIGH-INCOME FLAGSHIP TRACK",
          title: "AI Website Development Accelerator (15 Days)",
          urduTitle: "اے آئی ویب سائٹ ڈویلپمنٹ کورس",
          price: "Rs. 5,000 PKR (58% Subsidized Special)",
          duration: "15 Days Live Practical Accelerator",
          desc: "Master AI-powered web architecture, prompt Claude/ChatGPT/v0 for full-stack code, configure Cloudflare DNS & SSL, deploy live websites, and win freelance web clients.",
          link: "course-detail.html?id=ai-website-dev",
          actionText: "Join Web Accelerator (Rs. 5,000)"
        },
        coding: {
          badge: "RECOMMENDED FOR SOFTWARE & DEVELOPER CAREERS",
          title: "AI Software Development Track",
          urduTitle: "اے آئی سافٹ ویئر ڈویلپمنٹ",
          price: "Rs. 15,000 PKR (50% Subsidized)",
          duration: "6 Weeks Intensive Practical Training",
          desc: "Learn prompt-assisted full-stack coding, OpenAI/Gemini API integration, Chrome extensions, and modern web application development.",
          link: "course-detail.html?id=ai-software-dev",
          actionText: "View Syllabus & Apply"
        },
        vip: {
          badge: "EXCLUSIVE PRIVATE 1-ON-1 VIP SERVICE",
          title: "One on One Session (VIP Direct Mentorship)",
          urduTitle: "براہ راست ون آن ون سیشن سروس",
          price: "Rs. 20,000 PKR (All-Inclusive VIP Fee)",
          duration: "Flexible Personalized Schedule",
          desc: "Direct private mentorship with Founder & CEO Dr. Shahid Akram Mustafai. Customized curriculum, priority WhatsApp access, and private screen-share consulting.",
          link: "course-detail.html?id=one-on-one-session",
          actionText: "Book 1-on-1 Session Now"
        }
      };`;

indexHtml = indexHtml.replace(/const MATCH_DATA = {[\s\S]*?};\s*function updateMatcher/, modernMatchData + '\n\n      function updateMatcher');

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('[OK] index.html updated with active tickers, modal rules, and career matcher.');

// ============================================================================
// 2. UPDATE courses.html
// ============================================================================
const coursesPath = path.join(rootDir, 'courses.html');
let coursesHtml = fs.readFileSync(coursesPath, 'utf8');

// Filter Pills: Remove Trading, Add Web Dev, update counts
const modernFilterPills = `<div class="nasa-filter-pills" id="courseFilters">
          <button class="filter-pill-btn active" data-filter="all"><i class="fas fa-th-large"></i> All Tracks (7)</button>
          <button class="filter-pill-btn" data-filter="free"><i class="fas fa-gift text-emerald-500"></i> 100% Free Access (1)</button>
          <button class="filter-pill-btn" data-filter="webdev"><i class="fas fa-globe text-sky-500"></i> AI Web Development</button>
          <button class="filter-pill-btn" data-filter="vip"><i class="fas fa-crown text-amber-500"></i> 1-on-1 VIP Session</button>
          <button class="filter-pill-btn" data-filter="ai"><i class="fas fa-robot text-sky-500"></i> AI &amp; Productivity</button>
          <button class="filter-pill-btn" data-filter="dev"><i class="fas fa-code text-indigo-500"></i> Software &amp; Media</button>
        </div>`;

coursesHtml = coursesHtml.replace(/<div class="nasa-filter-pills" id="courseFilters">[\s\S]*?<\/div>/, modernFilterPills);

// Certificate Claim Modal Course Select
const modernClaimSelect = `<select id="claimCourseSelect" required>
                <option value="basic-ai">Basic AI Course (100% Free Track)</option>
                <option value="ai-website-dev">AI Website Development Course (15-Day Accelerator)</option>
                <option value="ai-tools-mastery">AI Tools Mastery (30-Day Cohort - Rs. 3,000)</option>
                <option value="basic-computer">Basic Computer Course (Office &amp; IT)</option>
                <option value="ai-software-dev">AI Software Development (Web &amp; Apps)</option>
                <option value="ai-content-creation">AI Content Creation (Video &amp; Social)</option>
                <option value="one-on-one-session">One on One Session Service (VIP Mentorship - Rs. 20,000)</option>
              </select>`;

coursesHtml = coursesHtml.replace(/<select id="claimCourseSelect" required>[\s\S]*?<\/select>/, modernClaimSelect);

// Update JavaScript filter logic in courses.html
coursesHtml = coursesHtml.replace(/if \(activeFilter === 'free'\) {[\s\S]*?matchesFilter = c\.id === 'one-on-one-session';\s*}/,
  `if (activeFilter === 'free') {
            matchesFilter = c.isFree === true || c.fee === 0;
          } else if (activeFilter === 'webdev') {
            matchesFilter = c.id === 'ai-website-dev' || c.id === 'ai-software-dev';
          } else if (activeFilter === 'ai') {
            matchesFilter = c.id === 'basic-ai' || c.id === 'ai-tools-mastery';
          } else if (activeFilter === 'dev') {
            matchesFilter = c.id === 'ai-website-dev' || c.id === 'ai-software-dev' || c.id === 'ai-content-creation' || c.id === 'basic-computer';
          } else if (activeFilter === 'vip') {
            matchesFilter = c.id === 'one-on-one-session';
          }`
);

// Update badge rendering in courses.html
coursesHtml = coursesHtml.replace(/if \(c\.id === 'basic-ai'\) {[\s\S]*?badgeHtml = `<span class="course-badge \${badgeClass}">\${badgeIcon} VIP 1-on-1 Mentorship<\/span>`;\s*}/,
  `if (c.id === 'basic-ai') {
            badgeClass = 'badge-free';
            badgeIcon = '<span class="beacon-dot"></span>';
            badgeHtml = \`<span class="course-badge \${badgeClass}">\${badgeIcon} 100% Free Entry • Launch Privilege</span>\`;
          } else if (c.id === 'ai-website-dev') {
            badgeClass = 'badge-trending';
            badgeIcon = '<i class="fas fa-globe text-sky-300"></i>';
            badgeHtml = \`<span class="course-badge \${badgeClass}" style="background:#0284c7; color:#fff;">\${badgeIcon} New High-Income Track</span>\`;
          } else if (c.id === 'ai-tools-mastery') {
            badgeClass = 'badge-discount';
            badgeIcon = '<i class="fas fa-percent"></i>';
            badgeHtml = \`<span class="course-badge \${badgeClass}">\${badgeIcon} 70% Subsidized Special</span>\`;
          } else if (c.id === 'basic-computer') {
            badgeClass = 'badge-discount';
            badgeIcon = '<i class="fas fa-bolt"></i>';
            badgeHtml = \`<span class="course-badge \${badgeClass}">\${badgeIcon} 80% Subsidized</span>\`;
          } else if (c.id === 'ai-software-dev') {
            badgeClass = 'badge-demo';
            badgeIcon = '<i class="fas fa-play-circle"></i>';
            badgeHtml = \`<span class="course-badge \${badgeClass}">\${badgeIcon} 50% Subsidized Special</span>\`;
          } else if (c.id === 'ai-content-creation') {
            badgeClass = 'badge-trending';
            badgeIcon = '<i class="fas fa-fire"></i>';
            badgeHtml = \`<span class="course-badge \${badgeClass}">\${badgeIcon} Trending Track</span>\`;
          } else if (c.id === 'one-on-one-session' || c.badgeType === 'vip') {
            badgeClass = 'badge-vip';
            badgeIcon = '<i class="fas fa-crown text-amber-400"></i>';
            badgeHtml = \`<span class="course-badge \${badgeClass}">\${badgeIcon} VIP 1-on-1 Mentorship</span>\`;
          }`
);

fs.writeFileSync(coursesPath, coursesHtml, 'utf8');
console.log('[OK] courses.html updated with clean filters, badge rules, and certificate dropdown.');

// ============================================================================
// 3. UPDATE admissions.html
// ============================================================================
const admPath = path.join(rootDir, 'admissions.html');
let admHtml = fs.readFileSync(admPath, 'utf8');

const modernAdmCourseSelect = `<select name="courseId" id="admissionCourseSelect" class="form-control form-select" required aria-required="true">
                <option value="basic-ai" selected>Basic AI Course (100% FREE - 7 Days Live Launch Cohort)</option>
                <option value="ai-website-dev">AI Website Development Course (Rs. 5,000 PKR - 58% Subsidized Special)</option>
                <option value="ai-tools-mastery">AI Tools Mastery (Rs. 3,000 PKR - 70% Subsidized Admission)</option>
                <option value="basic-computer">Basic Computer Course (Rs. 3,000 PKR - 80% Subsidized)</option>
                <option value="ai-software-dev">AI Software Development (Rs. 15,000 PKR - 50% Subsidized)</option>
                <option value="ai-content-creation">AI Content Creation &amp; Video Making (Rs. 20,000 PKR - 43% Subsidized)</option>
                <option value="one-on-one-session">One on One VIP Mentorship (Rs. 20,000 PKR - Dr. Shahid Akram)</option>
              </select>`;

admHtml = admHtml.replace(/<select name="courseId" id="admissionCourseSelect"[\s\S]*?<\/select>/, modernAdmCourseSelect);

// Ensure fee notice helper logic only flags basic-ai as 100% FREE
admHtml = admHtml.replace(/if \(val === 'basic-ai' \|\| val === 'ai-tools-mastery'\)/g, "if (val === 'basic-ai')");

fs.writeFileSync(admPath, admHtml, 'utf8');
console.log('[OK] admissions.html updated with updated course options & strict free logic.');

// ============================================================================
// 4. UPDATE payments.html
// ============================================================================
const payPath = path.join(rootDir, 'payments.html');
let payHtml = fs.readFileSync(payPath, 'utf8');

const modernPayCourseSelect = `<select name="courseName" id="payCourseSelect" class="form-control form-select" aria-label="Select Enrolled Course" required>
              <option value="Basic AI Course" data-fee="0">Basic AI Course (100% FREE - Rs. 0 PKR)</option>
              <option value="AI Website Development Course" data-fee="5000">AI Website Development Course (Rs. 5,000 PKR - 58% Subsidized)</option>
              <option value="AI Tools Mastery" data-fee="3000">AI Tools Mastery (Rs. 3,000 PKR - 70% Subsidized Admission)</option>
              <option value="Basic Computer Course" data-fee="3000">Basic Computer Course (Rs. 3,000 PKR - 80% Subsidized)</option>
              <option value="AI Software Development" data-fee="15000">AI Software Development (Rs. 15,000 PKR - 50% Subsidized)</option>
              <option value="AI Content Creation" data-fee="20000">AI Content Creation (Rs. 20,000 PKR - 43% Subsidized)</option>
              <option value="One on One Session Service" data-fee="20000">One on One Session Service (Rs. 20,000 PKR - VIP Mentorship)</option>
            </select>`;

payHtml = payHtml.replace(/<select name="courseName" id="payCourseSelect"[\s\S]*?<\/select>/, modernPayCourseSelect);

fs.writeFileSync(payPath, payHtml, 'utf8');
console.log('[OK] payments.html updated with accurate subsidized fees and eliminated trading.');

// ============================================================================
// 5. UPDATE verify-certificate.html
// ============================================================================
const certPath = path.join(rootDir, 'verify-certificate.html');
let certHtml = fs.readFileSync(certPath, 'utf8');

certHtml = certHtml.replace(/<option value="Financial Markets &amp; Trading Masterclass">Financial Markets &amp; Trading Masterclass<\/option>\s*/g,
  '<option value="AI Website Development Course">AI Website Development Course</option>\n');

// Also update sample diploma specimen logo to crisp high-res WebP/PNG
certHtml = certHtml.replace(/<img src="assets\/images\/logo\.jpg"/g, '<img src="assets/images/branding/ietp-logo.png"');

fs.writeFileSync(certPath, certHtml, 'utf8');
console.log('[OK] verify-certificate.html updated.');

// ============================================================================
// 6. UPDATE admin-dashboard.html
// ============================================================================
const adminDashPath = path.join(rootDir, 'admin-dashboard.html');
let adminHtml = fs.readFileSync(adminDashPath, 'utf8');

adminHtml = adminHtml.replace(/<option value="trading-course">Trading Course<\/option>\s*/g,
  '<option value="ai-website-dev">AI Website Development Course</option>\n                <option value="one-on-one-session">One on One VIP Mentorship</option>\n');

fs.writeFileSync(adminDashPath, adminHtml, 'utf8');
console.log('[OK] admin-dashboard.html updated.');

// ============================================================================
// 7. UPDATE course-detail.html
// ============================================================================
const detailPath = path.join(rootDir, 'course-detail.html');
let detailHtml = fs.readFileSync(detailPath, 'utf8');

// If user navigates to ?id=trading-course, auto redirect to courses.html
detailHtml = detailHtml.replace(/const courseId = params\.get\('id'\) \|\| 'basic-ai';/,
  `let courseId = params.get('id') || 'basic-ai';
      if (courseId === 'trading-course') {
        window.location.replace('courses.html');
        return;
      }`
);

// Remove disclaimerHtml completely
detailHtml = detailHtml.replace(/let disclaimerHtml = '';[\s\S]*?document\.getElementById\('courseMainContent'\)\.innerHTML = `\s*\${disclaimerHtml}/,
  `document.getElementById('courseMainContent').innerHTML = \``
);

fs.writeFileSync(detailPath, detailHtml, 'utf8');
console.log('[OK] course-detail.html updated to gracefully redirect any legacy trading requests.');

// ============================================================================
// 8. MODERN CUSTOM BRANDED 404.html
// ============================================================================
const error404Html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Page Not Found | ILM E TECH PAKISTAN (IETP)</title>
  <meta name="description" content="The page you are looking for has been moved or does not exist. Explore our active verified AI and technology courses at ILM E TECH PAKISTAN.">
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="https://ilmetechpakistan.com/404.html">
  <meta name="theme-color" content="#046a38">
  
  <!-- OpenGraph -->
  <meta property="og:title" content="Page Not Found | ILM E TECH PAKISTAN">
  <meta property="og:description" content="Official platform of ILM E TECH PAKISTAN. Learn AI, Software Engineering & Tech Skills.">
  <meta property="og:image" content="https://ilmetechpakistan.com/assets/images/branding/ietp-logo.png">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/images/branding/favicon-32x32.png">
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="assets/images/branding/favicon-192x192.png">
  
  <!-- FontAwesome & CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;600;700;800&display=swap">
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body style="background: #0f172a; color: #f8fafc; min-height: 100vh; display: flex; flex-direction: column;">

  <!-- Header Nav -->
  <header class="header-nav" style="background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255,255,255,0.1);">
    <div class="container nav-container">
      <a href="index.html" class="brand-logo">
        <img src="assets/images/branding/ietp-logo-sm.webp" alt="ILM E TECH PAKISTAN (IETP) - Official Academy Logo" width="52" height="52" style="aspect-ratio:1/1; object-fit:contain; border-radius:10px;">
        <div class="brand-text">
          <span class="brand-name" style="color: #ffffff;">ILM E TECH PAKISTAN</span>
          <span class="brand-subtitle" style="font-size:0.75rem; color:#38bdf8; font-weight:700;">Digital Education &amp; AI Academy</span>
        </div>
      </a>

      <div class="nav-actions">
        <a href="courses.html" class="btn btn-outline-blue btn-sm" style="color:#ffffff; border-color:#38bdf8;"><i class="fas fa-th-large"></i> All Courses</a>
        <a href="admissions.html" class="btn btn-primary btn-sm"><i class="fas fa-paper-plane"></i> Apply Now</a>
      </div>
    </div>
  </header>

  <!-- 404 Hero Content -->
  <main style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 4rem 1.5rem; text-align: center;">
    <div style="max-width: 680px; margin: 0 auto; background: rgba(30, 41, 59, 0.7); border: 1px solid rgba(255, 255, 255, 0.12); padding: 3rem 2rem; border-radius: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
      
      <div style="margin-bottom: 1.5rem;">
        <img src="assets/images/branding/ietp-logo.webp" alt="ILM E TECH PAKISTAN (IETP) - Official Academy Logo" width="90" height="90" style="aspect-ratio:1/1; object-fit:contain; border-radius:16px; box-shadow: 0 10px 25px rgba(4,106,56,0.4);">
      </div>

      <div style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(239, 68, 68, 0.2); color:#fca5a5; padding:0.35rem 1rem; border-radius:2rem; font-weight:700; font-size:0.85rem; margin-bottom:1rem; border:1px solid rgba(239, 68, 68, 0.3);">
        <i class="fas fa-triangle-exclamation"></i> ERROR 404 // PAGE NOT FOUND
      </div>

      <h1 style="font-size: 2.5rem; font-weight: 900; color: #ffffff; margin-bottom: 0.5rem; letter-spacing: -0.02em;">
        مطلوبہ صفحہ دستیاب نہیں ہے
      </h1>
      <p style="color: #94a3b8; font-size: 1.05rem; margin-bottom: 2rem; line-height: 1.6;">
        The page you are looking for has been moved, removed, or discontinued. You can navigate back to our active verified academy courses or contact our direct WhatsApp student helpline.
      </p>

      <!-- Active Courses Quick Launch Grid -->
      <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 1rem; padding: 1.25rem; margin-bottom: 2rem; text-align: left;">
        <div style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
          <i class="fas fa-compass"></i> Popular Active Academy Tracks:
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
          <a href="course-detail.html?id=basic-ai" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.5rem; color: #ffffff; text-decoration: none; font-size: 0.9rem; font-weight: 700; transition: all 0.2s ease;">
            <span><i class="fas fa-gift text-emerald-400"></i> Basic AI Course</span>
            <span style="background: #059669; color: #fff; font-size: 0.65rem; padding: 0.15rem 0.45rem; border-radius: 0.35rem;">100% FREE</span>
          </a>

          <a href="course-detail.html?id=ai-website-dev" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 0.5rem; color: #ffffff; text-decoration: none; font-size: 0.9rem; font-weight: 700; transition: all 0.2s ease;">
            <span><i class="fas fa-globe text-sky-400"></i> AI Website Development</span>
            <span style="background: #0284c7; color: #fff; font-size: 0.65rem; padding: 0.15rem 0.45rem; border-radius: 0.35rem;">Rs. 5,000</span>
          </a>

          <a href="course-detail.html?id=ai-tools-mastery" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 0.5rem; color: #ffffff; text-decoration: none; font-size: 0.9rem; font-weight: 700; transition: all 0.2s ease;">
            <span><i class="fas fa-robot text-purple-400"></i> AI Tools Mastery (30 Days)</span>
            <span style="background: #7c3aed; color: #fff; font-size: 0.65rem; padding: 0.15rem 0.45rem; border-radius: 0.35rem;">Rs. 3,000</span>
          </a>

          <a href="course-detail.html?id=one-on-one-session" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 0.5rem; color: #ffffff; text-decoration: none; font-size: 0.9rem; font-weight: 700; transition: all 0.2s ease;">
            <span><i class="fas fa-crown text-amber-400"></i> VIP 1-on-1 Mentorship</span>
            <span style="background: #d97706; color: #fff; font-size: 0.65rem; padding: 0.15rem 0.45rem; border-radius: 0.35rem;">VIP</span>
          </a>
        </div>
      </div>

      <!-- Action CTAs -->
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="index.html" class="btn btn-primary btn-lg" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%);">
          <i class="fas fa-home"></i> Return to Homepage
        </a>
        <a href="https://wa.me/923074958837?text=Assalam%20o%20Alaikum!%20I%20am%20looking%20for%20help%20with%20ILM%20E%20TECH%20course%20admissions." target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-lg" style="border-color: #25d366; color: #4ade80;">
          <i class="fab fa-whatsapp"></i> WhatsApp Student Helpline
        </a>
      </div>

    </div>
  </main>

  <!-- Footer -->
  <footer style="padding: 1.5rem 0; border-top: 1px solid rgba(255,255,255,0.08); text-align: center; font-size: 0.85rem; color: #64748b;">
    <div class="container">
      &copy; 2026 <strong>ILM E TECH PAKISTAN (IETP)</strong>. Official Academy Domain: <code>ilmetechpakistan.com</code>
    </div>
  </footer>

</body>
</html>`;

fs.writeFileSync(path.join(rootDir, '404.html'), error404Html, 'utf8');
console.log('[OK] 404.html modernized with branded high-impact error UI & active navigation.');

// ============================================================================
// 9. DELETE disclaimer.html
// ============================================================================
const disclaimerPath = path.join(rootDir, 'disclaimer.html');
if (fs.existsSync(disclaimerPath)) {
  fs.unlinkSync(disclaimerPath);
  console.log('[OK] disclaimer.html successfully deleted to protect institutional reputation.');
}

// ============================================================================
// 10. UPDATE vercel.json WITH REDIRECT & ENTERPRISE HEADERS
// ============================================================================
const vercelConfig = {
  "version": 2,
  "framework": null,
  "outputDirectory": ".",
  "cleanUrls": true,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/server.js"
    },
    {
      "src": "^/(disclaimer|disclaimer\\.html)$",
      "status": 301,
      "headers": { "Location": "/courses.html" }
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "status": 404,
      "dest": "/404.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), browsing-topics=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; font-src 'self' https: data:;"
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('[OK] vercel.json updated with 301 redirect for legacy disclaimer and secure headers.');

// ============================================================================
// 11. GENERATE CLEAN sitemap.xml & robots.txt
// ============================================================================
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ilmetechpakistan.com/</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/courses.html</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/admissions.html</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/course-detail.html?id=basic-ai</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/course-detail.html?id=ai-website-dev</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/course-detail.html?id=ai-tools-mastery</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/course-detail.html?id=basic-computer</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/course-detail.html?id=ai-software-dev</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/course-detail.html?id=ai-content-creation</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/course-detail.html?id=one-on-one-session</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/verify-certificate.html</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/payments.html</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/about.html</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/services.html</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://ilmetechpakistan.com/contact.html</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('[OK] sitemap.xml generated without legacy trading or disclaimer.');

const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin-dashboard.html
Disallow: /student-dashboard.html
Disallow: /classroom.html

Sitemap: https://ilmetechpakistan.com/sitemap.xml
`;

fs.writeFileSync(path.join(rootDir, 'robots.txt'), robotsTxt, 'utf8');
console.log('[OK] robots.txt generated.');

console.log('--- Phase 3 Completed Successfully ---');

