const fs = require('fs');
const path = require('path');

console.log('--- Starting IETP Enterprise Refactor & Modernization Script ---');

// 1. Update manifest.json
const manifestPath = path.join(__dirname, '..', 'manifest.json');
const manifest = {
  "name": "ILM E TECH PAKISTAN (IETP)",
  "short_name": "IETP",
  "description": "Official Platform of ILM E TECH PAKISTAN (IETP). Premier Digital Education & AI Academy founded by Dr. Shahid Akram Mustafai.",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#064e3b",
  "theme_color": "#046a38",
  "icons": [
    {
      "src": "assets/images/branding/favicon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/images/branding/favicon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "assets/images/branding/ietp-logo.png",
      "sizes": "1024x1024",
      "type": "image/png"
    }
  ]
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('[OK] manifest.json updated with responsive branding icons.');

// 2. Update assets/js/db.js
const dbPath = path.join(__dirname, '..', 'assets', 'js', 'db.js');
let dbContent = fs.readFileSync(dbPath, 'utf8');

// Replace logoUrl
dbContent = dbContent.replace(/logoUrl:\s*["'][^"']+["']/g, 'logoUrl: "assets/images/branding/ietp-logo.webp"');

// Update Basic AI Course
dbContent = dbContent.replace(/duration:\s*["']1 Week \(7 Days\)["']/g, 'duration: "7 Days (1 Week Beginner Live Cohort)"');
dbContent = dbContent.replace(/badge:\s*["']100% Free Launch["']/g, 'badge: "100% Free Entry • Launch Privilege"');
dbContent = dbContent.replace(/freeLabel:\s*["']100% FREE["']/g, 'freeLabel: "100% FREE (Exclusive Launch Privilege)"');

// Update AI Tools Mastery
dbContent = dbContent.replace(/id:\s*"ai-tools-mastery"[\s\S]*?id:\s*"basic-computer"/, (match) => {
  let updated = match
    .replace(/fee:\s*0,/g, 'fee: 3000,')
    .replace(/isFree:\s*true,/g, 'isFree: false,')
    .replace(/freeLabel:\s*["'][^"']+["'],?\s*/g, '')
    .replace(/freeSubLabel:\s*["'][^"']+["'],?\s*/g, '')
    .replace(/badge:\s*["']30-Day Masterclass["']/g, 'badge: "70% Subsidized Special"')
    .replace(/badgeType:\s*["']free-launch["']/g, 'badgeType: "discount"')
    .replace(/actionBtnText:\s*["']Join Free Batch["']/g, 'actionBtnText: "Enroll Now (Rs. 3,000)"')
    .replace(/duration:\s*["']30 Days \(Daily Live \+ Q&A\)["']/g, 'duration: "30 Days (Daily Live Sessions + Q&A)"')
    .replace(/100% FREE for First Batch Launch!/g, 'Subsidized admission now only Rs. 3,000 PKR (70% OFF Special)!');
  
  if (!updated.includes('discountPercent: 70')) {
    updated = updated.replace(/originalFee:\s*10000,/, 'originalFee: 10000,\n    discountPercent: 70,\n    discountLabel: "70% OFF Subsidized Admission",');
  }
  return updated;
});

// Replace trading-course with ai-website-dev course
const newAiWebCourseBlock = `  {
    id: "ai-website-dev",
    title: "AI Website Development Course",
    urduTitle: "اے آئی ویب سائٹ ڈویلپمنٹ کورس",
    category: "Web & AI Engineering",
    slug: "ai-website-development",
    shortDesc: "Build, launch, and monetize modern responsive websites using AI code assistants. From wireframing to live production deployment in 15 days.",
    fullDesc: "A high-intensity, practical 15-day live accelerator designed for beginners to advanced learners with no prior programming background required. Master AI-powered web architecture, rapid full-stack code generation, official live domain and Cloudflare DNS deployment, live production hot-fixing, enterprise performance optimization, and freelancing client acquisition strategies.",
    duration: "15 Days (Live Practical Accelerator)",
    level: "Beginner to Advanced (No prior programming background required)",
    fee: 5000,
    originalFee: 12000,
    discountPercent: 58,
    discountLabel: "58% Subsidized Special",
    badge: "New High-Income Track",
    badgeType: "trending",
    actionBtnText: "Apply Now (Rs. 5,000)",
    mode: "Online Live Practical Accelerator & Interactive Production Labs",
    startDate: "New Live Batch Starting Soon",
    instructor: "Engr. Hamza Khan & Dr. Shahid Akram Mustafai",
    status: "Active",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    outcomes: [
      "AI-Powered Web Architecture: Prompt Claude, ChatGPT, Gemini & v0 for modern UI/UX wireframes and layouts",
      "Rapid Full-Stack Development: Generate clean, responsive front-end and back-end code using AI assistants",
      "Official Live Deployment: Domain registration, DNS record configuration (Cloudflare/cPanel), SSL setup, and live server launch",
      "Live Production Maintenance: Real-time live code editing, bug hot-fixing, and client updates",
      "Enterprise Optimization & Freelancing: Security hardening, fast caching, SEO best practices, and winning freelance clients"
    ],
    modules: [
      {
        part: 1,
        title: "Module 1: AI-Powered Web Architecture",
        urduTitle: "ماڈیول ۱: اے آئی ویب آرکیٹیکچر و ڈیزائن",
        days: "Days 1 - 3",
        tools: ["Claude 3.7 / 3.5 Sonnet", "ChatGPT Plus", "v0 by Vercel", "Google Gemini"],
        focus: "جدید ویب پیجز، یو آئی ڈیزائن، وائر فریمز اور سسٹم لاجک بنانے کے لیے اے آئی پرامپٹنگ۔",
        focusEn: "Prompting AI models (Claude, ChatGPT, Gemini, v0) for modern UI/UX wireframes, layouts, and system logic."
      },
      {
        part: 2,
        title: "Module 2: Rapid Full-Stack Development",
        urduTitle: "ماڈیول ۲: فل اسٹیک کوڈنگ و ڈویلپمنٹ",
        days: "Days 4 - 6",
        tools: ["VS Code", "Antigravity AI", "HTML5/CSS3", "JavaScript ES6", "Tailwind CSS"],
        focus: "اے آئی کوڈ اسسٹنٹس کی مدد سے فرنٹ اینڈ اور بیک اینڈ کوڈ، ڈائنامک فارمز اور انٹرفیس جنریشن۔",
        focusEn: "Generating clean, responsive front-end and back-end code, interactive elements, and forms using AI coding assistants."
      },
      {
        part: 3,
        title: "Module 3: Official Live Deployment",
        urduTitle: "ماڈیول ۳: لائیو ڈومین، ہوسٹنگ اور ڈیپلائمنٹ",
        days: "Days 7 - 9",
        tools: ["Domain Registrars", "Cloudflare DNS", "cPanel / VPS", "Vercel", "SSL Engine"],
        focus: "ڈومین رجسٹریشن، کلاؤڈ فلیئر ڈی این ایس سیٹ اپ، ایس ایس ایل انکرپشن اور ویب سائٹس کو لائیو کرنا۔",
        focusEn: "Domain registration, DNS record configuration (Cloudflare/cPanel), SSL setup, and launching websites live to production servers."
      },
      {
        part: 4,
        title: "Module 4: Live Production Maintenance & Hot-Fixing",
        urduTitle: "ماڈیول ۴: لائیو ویب سائٹ کی مرمت اور تبدیلیاں",
        days: "Days 10 - 12",
        tools: ["Chrome DevTools", "FTP / SFTP", "Live Code Editor", "Git / GitHub"],
        focus: "لائیو ویب سائٹ پر براہ راست کوڈ ایڈٹ کرنا، کلائنٹ کی تبدیلیاں اور بگز کو فوری حل کرنا۔",
        focusEn: "Updating live websites, editing live codebases, fixing bugs, and deploying client changes in real-time."
      },
      {
        part: 5,
        title: "Module 5: Enterprise Optimization & Client Acquisition",
        urduTitle: "ماڈیول ۵: سیکیورٹی، سپیڈ اور فری لانسنگ سے کمائی",
        days: "Days 13 - 15",
        tools: ["Lighthouse 95+", "SEO Meta Tools", "Fiverr & Upwork", "Cold Email & WhatsApp Pitching"],
        focus: "ویب سائٹ سیکیورٹی، سپیڈ آپٹیمائزیشن، ایس ای او اور لوکل و انٹرنیشنل کلائنٹس حاصل کرنا۔",
        focusEn: "Security hardening, mobile responsiveness, fast caching, SEO best practices, and freelancing client acquisition strategies."
      }
    ],
    syllabus: [
      { week: 1, topic: "Module 1 & 2: AI Web Architecture & Rapid Full-Stack (Days 1 - 6)", detail: "Prompting AI for responsive UI/UX, wireframing with v0/Claude, generating production HTML, CSS, JavaScript, and dynamic forms." },
      { week: 2, topic: "Module 3 & 4: Official Live Deployment & Live Maintenance (Days 7 - 12)", detail: "Domain registration, Cloudflare DNS routing, free SSL certificates, production deployment on cPanel/Vercel, real-time live codebase hot-fixing." },
      { week: 3, topic: "Module 5: Enterprise Hardening, SEO & Freelancing Clients (Days 13 - 15)", detail: "Security hardening, 95+ Lighthouse speed optimization, on-page SEO, Fiverr/Upwork gig launch, pitching business websites for Rs. 25,000 to Rs. 100,000+." }
    ],
    tools: ["Claude AI", "ChatGPT Pro", "v0 by Vercel", "Google Gemini", "Antigravity IDE", "Cloudflare DNS", "GitHub & Vercel", "cPanel"],
    certificateInfo: "Includes Official Ilm E Tech Verified AI Web Engineer Certificate signed by Founder & CEO Dr. Shahid Akram Mustafai with instant QR validation."
  }`;

dbContent = dbContent.replace(/\{\s*id:\s*"trading-course"[\s\S]*?certificateInfo:[\s\S]*?\}\s*,?/, newAiWebCourseBlock + ',');

// Update DB Version
dbContent = dbContent.replace('v4_official_cert_nda_beat_2026', 'v5_enterprise_modernization_2026');
dbContent = dbContent.replace(/ilmetech_courses_version['"]\s*===\s*['"]2026\.3['"]/g, "ilmetech_courses_version' === '2026.4'");
dbContent = dbContent.replace(/ilmetech_courses_version['"],\s*['"]2026\.3['"]/g, "ilmetech_courses_version', '2026.4'");

// Add sample certificate for ai-website-dev in DEFAULT_CERTIFICATES if not present
if (!dbContent.includes('ILM-2026-000106')) {
  const newCert = `  {
    id: "ILM-2026-000106",
    studentName: "Bilal Hassan",
    fatherName: "Muhammad Hassan",
    courseId: "ai-website-dev",
    courseName: "AI Website Development Course",
    issueDate: "2026-10-15",
    grade: "A+ Distinction",
    status: "Verified",
    cnic: "35202-7788990-1",
    verificationUrl: "verify-certificate.html?id=ILM-2026-000106",
    skills: ["AI Web Architecture", "Cloudflare DNS & SSL", "Rapid Full-Stack", "Live Deployment", "Hot-Fixing"]
  },\n`;
  dbContent = dbContent.replace('const DEFAULT_CERTIFICATES = [', 'const DEFAULT_CERTIFICATES = [\n' + newCert);
}

fs.writeFileSync(dbPath, dbContent, 'utf8');
console.log('[OK] assets/js/db.js successfully refactored and updated.');

// 3. Update assets/js/app.js
const appJsPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Strict Free check: ONLY Basic AI Course is free
appJs = appJs.replace(
  /const isFree\s*=\s*courseId === 'basic-ai'[^;]+;/g,
  "const isFree = courseId === 'basic-ai' || (courseName.toLowerCase().includes('basic ai') && !courseName.toLowerCase().includes('tools'));"
);

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('[OK] assets/js/app.js updated for strict 100% free check (Basic AI only).');

// 4. Update assets/js/chatbot.js
const chatbotPath = path.join(__dirname, '..', 'assets', 'js', 'chatbot.js');
let chatbot = fs.readFileSync(chatbotPath, 'utf8');

const updatedPromptCourses = `
- نصابات کی آفیشل معلومات (صرف یہ ۷ نصابات فعال ہیں):
  ۱. بیسک AI کورس (۷ دن / ۱ ہفتہ) — ۱۰۰٪ مفت (100% FREE Launch Privilege)
  ۲. اے آئی ویب سائٹ ڈویلپمنٹ کورس (۱۵ دن) — باقاعدہ فیس ۱۲،۰۰۰ روپے، رعایتی فیس: ۵،۰۰۰ روپے (۵۸٪ رعایت، پرامپٹ سے ویب سائٹ بنا کر لائیو کرنے تک)
  ۳. اے آئی ٹولز ماسٹری (۳۰ دن، ۳۰ آلات) — باقاعدہ فیس ۱۰،۰۰۰ روپے، رعایتی فیس: ۳،۰۰۰ روپے (۷۰٪ رعایت)
  ۴. بنیادی کمپیوٹر کورس (۶ ہفتے) — رعایتی فیس: ۳،۰۰۰ روپے
  ۵. اے آئی سافٹ ویئر ڈویلپمنٹ (۶ ہفتے) — رعایتی فیس: ۱۵،۰۰۰ روپے
  ۶. اے آئی مواد سازی و ویڈیو پروڈکشن (۵ ہفتے) — رعایتی فیس: ۲۰،۰۰۰ روپے
  ۷. ون آن ون پرائیویٹ وی آئی پی رہنمائی (ڈاکٹر شاہد اکرم مصطفائی) — فیس: ۲۰،۰۰۰ روپے
- خصوصی وضاحت: تجارتی (Trading/Crypto/Forex) کورس مکمل طور پر ختم اور معطل کر دیا گیا ہے۔ ہمارا ادارہ کسی بھی قسم کی ٹریڈنگ یا فنانشل قیاس آرائی نہیں کرواتا۔
- واحد ۱۰۰٪ مفت کورس صرف اور صرف ۷ روزہ "بیسک AI کورس" ہے۔ بقیہ تمام کورسز رعایتی فیس کے ساتھ ہیں۔`;

chatbot = chatbot.replace(/- ۶ بنیادی نصابات:[\s\S]*?verify-certificate\.html/m, updatedPromptCourses + '\n- داخلہ فارم: admissions.html (آن لائن داخلہ)\n- فیس پورٹل: payments.html (رسید اپلوڈ)\n- اسناد کی تصدیق: verify-certificate.html (سند کی تصدیق)');

// Update fallback answers in chatbot
chatbot = chatbot.replace(
  /• <strong>اے آئی آلات میں مہارت \(۳۰ دن، ۳۰ آلات\):<\/strong> ۲،۹۹۹ روپے[\s\S]*?۱۱،۹۹۹ روپے/m,
  `• <strong>بیسک AI کورس (۷ دن):</strong> ۱۰۰٪ مفت (100% FREE Launch Privilege)<br>
      • <strong>اے آئی ویب سائٹ ڈویلپمنٹ کورس (۱۵ دن):</strong> ۵،۰۰۰ روپے (۵۸٪ رعایتی فیس)<br>
      • <strong>اے آئی ٹولز ماسٹری (۳۰ دن، ۳۰ آلات):</strong> ۳،۰۰۰ روپے (۷۰٪ رعایتی فیس)<br>
      • <strong>بنیادی کمپیوٹر کورس (۶ ہفتے):</strong> ۳،۰۰۰ روپے<br>
      • <strong>اے آئی سافٹ ویئر ڈویلپمنٹ (۶ ہفتے):</strong> ۱۵،۰۰۰ روپے<br>
      • <strong>اے آئی مواد سازی و ویڈیو پروڈکشن (۵ ہفتے):</strong> ۲۰،۰۰۰ روپے<br>
      • <strong>ون آن ون وی آئی پی رہنمائی (ڈاکٹر شاہد اکرم):</strong> ۲۰،۰۰۰ روپے`
);

chatbot = chatbot.replace(
  /۱\. <strong>بنیادی مصنوعی ذہانت کورس<\/strong>[\s\S]*?۷،۹۹۹ روپے/m,
  `۱. <strong>بیسک AI کورس</strong> (۷ دن) — ۱۰۰٪ مفت (100% FREE)<br>
      ۲. <strong>اے آئی ویب سائٹ ڈویلپمنٹ کورس</strong> (۱۵ دن) — ۵،۰۰۰ روپے<br>
      ۳. <strong>اے آئی ٹولز ماسٹری</strong> (۳۰ دن) — ۳،۰۰۰ روپے<br>
      ۴. <strong>بنیادی کمپیوٹر کورس</strong> (۶ ہفتے) — ۳،۰۰۰ روپے<br>
      ۵. <strong>اے آئی سافٹ ویئر ڈویلپمنٹ</strong> (۶ ہفتے) — ۱۵،۰۰۰ روپے<br>
      ۶. <strong>اے آئی مواد سازی و ویڈیو پروڈکشن</strong> (۵ ہفتے) — ۲۰،۰۰۰ روپے<br>
      ۷. <strong>ون آن ون وی آئی پی سیشن</strong> — ۲۰،۰۰۰ روپے`
);

chatbot = chatbot.replace(/فیس: ۲،۹۹۹ روپے/g, 'فیس: ۳،۰۰۰ روپے');

fs.writeFileSync(chatbotPath, chatbot, 'utf8');
console.log('[OK] assets/js/chatbot.js updated with accurate knowledge base & eliminated trading.');

// 5. Update api/server.js
const serverJsPath = path.join(__dirname, '..', 'api', 'server.js');
let serverJs = fs.readFileSync(serverJsPath, 'utf8');

serverJs = serverJs.replace(/- ۶ بنیادی نصابات:[\s\S]*?verify-certificate\.html/m, updatedPromptCourses + '\n- داخلہ فارم: admissions.html (آن لائن داخلہ)\n- فیس پورٹل: payments.html (رسید اپلوڈ)\n- اسناد کی تصدیق: verify-certificate.html (سند کی تصدیق)');

fs.writeFileSync(serverJsPath, serverJs, 'utf8');
console.log('[OK] api/server.js updated with accurate AI Counselor system prompt.');

console.log('--- Phase 1 Script Completed Successfully ---');

