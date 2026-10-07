/**
 * Centralized Data Store & LocalStorage CMS Database
 * ILM E TECH PAKISTAN (ilmetechpakistan.com)
 * Includes Complete Payment Verification & Audit System
 */

const DB_KEYS = {
  SETTINGS: 'ilmetech_settings',
  COURSES: 'ilmetech_courses',
  ADMISSIONS: 'ilmetech_admissions',
  PAYMENTS: 'ilmetech_payments',
  ENROLLMENTS: 'ilmetech_enrollments',
  AUDIT_LOGS: 'ilmetech_audit_logs',
  CERTIFICATES: 'ilmetech_certificates',
  BLOG: 'ilmetech_blog',
  DOWNLOADS: 'ilmetech_downloads',
  ANNOUNCEMENTS: 'ilmetech_announcements',
  USERS: 'ilmetech_users',
  SESSION: 'ilmetech_session',
  TRIAL_LEADS: 'ilmetech_trial_leads'
};

// Initial Default Seed Data
const DEFAULT_SETTINGS = {
  brandName: "ILM E TECH PAKISTAN",
  urduName: "علمِ ٹیک پاکستان",
  founderName: "Dr. Shahid Akram Mustafai",
  urduFounderName: "ڈاکٹر شاہد اکرم مصطفائی",
  founderTitle: "Founder & CEO",
  founderPhoto: "assets/images/ceo.jpg",
  domain: "ilmetechpakistan.com",
  tagline: "Learn Technology. Master AI. Build Your Future.",
  urduTagline: "علم حاصل کریں۔ AI پر عبور پائیں، اپنا مستقبل بنائیں۔",
  logoUrl: "assets/images/logo.jpg",
  email: "info@ilmetechpakistan.com",
  phone: "+92 307 4958837",
  whatsapp: "+92 307 4958837",
  address: "ILM E TECH PAKISTAN Head Office, Technology Campus, Lahore / Islamabad, Pakistan",
  paymentAccounts: {
    jazzcash: { title: "Shahid Akram", number: "03206546008", enabled: true },
    easypaisa: { title: "Shahid Akram", number: "03206546008", enabled: true },
    sadapay: { title: "Shahid Akram", number: "03206546008", enabled: true },
    bank: { bankName: "Meezan Bank Limited", title: "Shahid Akram", iban: "PK36MEZN0001020304050607", number: "03206546008", enabled: true }
  },
  social: {
    facebook: "https://facebook.com/ilmetechpakistan",
    youtube: "https://youtube.com/ilmetechpakistan",
    instagram: "https://instagram.com/ilmetechpakistan",
    tiktok: "https://tiktok.com/@ilmetechpakistan",
    linkedin: "https://linkedin.com/company/ilmetechpakistan",
    whatsapp: "https://wa.me/923074958837"
  },
  meta: {
    title: "ILM E TECH PAKISTAN | Official Digital Education & AI Academy Platform",
    description: "Learn Artificial Intelligence, AI Tools, Computer Basics, Software Development, Content Creation & Trading at ILM E TECH PAKISTAN. Founded by Dr. Shahid Akram Mustafai.",
    keywords: "ILM E TECH PAKISTAN, Dr Shahid Akram Mustafai, AI courses Pakistan, AI tools course Pakistan, computer course Pakistan, digital skills Pakistan"
  }
};

const DEFAULT_COURSES = [
  {
    id: "basic-ai",
    title: "Basic AI Course",
    urduTitle: "بیسک AI کورس",
    category: "Artificial Intelligence",
    slug: "basic-ai-course",
    shortDesc: "A complete beginner-friendly course on Artificial Intelligence, Generative AI, prompt engineering, and everyday practical productivity.",
    fullDesc: "This course is specially designed for Pakistani students, beginners, job seekers, and entrepreneurs with no prior technical background. You will learn fundamental AI concepts, ChatGPT, Claude, Gemini, prompt engineering, AI for writing, research, presentation building, image generation, and everyday productivity workflows.",
    duration: "4 Weeks (16 Hours)",
    level: "Beginner",
    fee: 4999,
    mode: "Online Live & Recorded",
    startDate: "15th October 2026",
    instructor: "Dr. Shahid Akram Mustafai & Team",
    status: "Active",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    outcomes: [
      "Master Prompt Engineering for ChatGPT, Gemini, and Claude",
      "Generate AI images, graphics, and presentations effortlessly",
      "Automate research, email drafting, and document summary tasks",
      "Build practical AI workflows for studies, jobs, or business",
      "Understand Responsible AI principles and ethical guidelines"
    ],
    syllabus: [
      { week: 1, topic: "Introduction to AI & Large Language Models", detail: "What is AI, how LLMs work, setting up accounts, basic prompts." },
      { week: 2, topic: "Advanced Prompt Engineering & Writing", detail: "Structuring prompts, role-play prompting, content writing & proofreading." },
      { week: 3, topic: "AI Visual & Media Generation", detail: "Midjourney, DALL-E 3, Canva Magic, Gamma App for instant presentations." },
      { week: 4, topic: "Practical AI Workflows & Automation", detail: "AI for Pakistani job seekers, CV writing, interview preparation & business tasks." }
    ],
    tools: ["ChatGPT", "Google Gemini", "Claude AI", "Canva Magic Studio", "Gamma.app", "Midjourney"],
    certificateInfo: "Includes Official Verification ID & Downloadable PDF Certificate signed by Founder & CEO Dr. Shahid Akram Mustafai."
  },
  {
    id: "ai-tools-mastery",
    title: "AI Tools Mastery (30 Days, 30 Tools, Infinite Possibilities)",
    urduTitle: "AI ٹولز ماسٹری (30 دن، 30 ٹولز، لا محدود امکانات)",
    category: "AI Productivity & Skills",
    slug: "ai-tools-mastery",
    shortDesc: "30 Days, 30 Tools, Infinite Possibilities. Practical live training on ChatGPT, Gemini, Claude, InVideo, ElevenLabs, Runway & more with live Q&A.",
    fullDesc: "Unlock Your Future with AI: 30 Days, 30 Tools, Infinite Possibilities. Join 100,000+ Learners on a Practical AI Journey. Delivered via Google Meet & YouTube Live with daily interactive live Q&A sessions. Every Class: Learn ➔ Create Now ➔ Apply in Life ➔ Earn.",
    duration: "30 Days (Daily Live + Q&A)",
    level: "Beginner Friendly (No Tech Background Needed)",
    fee: 2999,
    originalFee: 9999,
    mode: "Google Meet & YouTube Live (Daily Live + Interactive Q&A)",
    startDate: "Batch Starting Soon",
    instructor: "Dr. Shahid Akram Mustafai & Certified AI Specialists",
    status: "Active",
    badge: "Trending 30-Day Cohort",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    outcomes: [
      "Master 30 industry-leading AI tools across text, research, design, video, audio, and coding",
      "Produce immediate real-world outputs in every single class (Learn ➔ Create Now ➔ Apply in Life ➔ Earn)",
      "Create high-converting AI videos, talking avatars, and viral reels",
      "Automate research, documentation, presentations, and social media with AI",
      "Build a verified portfolio and earn an official verifiable certificate"
    ],
    methodology: {
      motto: "Every Class: Learn ➔ Create Now ➔ Apply in Life ➔ Earn",
      urduMotto: "ہر کلاس: سیکھیں ➔ ابھی بنائیں ➔ زندگی میں لاگو کریں ➔ کمائیں",
      pillars: [
        { title: "Mobile-First Delivery", urduTitle: "موبائل فرسٹ کلاسز", desc: "Access all live sessions, tools, and assignments smoothly directly from your smartphone or laptop." },
        { title: "Beginner Friendly", urduTitle: "ابتدائی طلباء کے لیے آسان", desc: "No coding, math, or prior tech background required. Step-by-step guidance in everyday language." },
        { title: "Immediate Results", urduTitle: "فوری عملی نتائج", desc: "Walk away from each session with an actual finished project, video, document, or graphic." }
      ]
    },
    modules: [
      {
        part: 1,
        title: "Part 1: AI Assistants (Days 1-7)",
        urduTitle: "حصہ اول: بنیادی اے آئی اسسٹنٹس (دن 1 تا 7)",
        days: "Days 1 - 7",
        tools: ["ChatGPT", "Gemini", "Meta AI", "Microsoft Copilot", "Claude", "DeepSeek"],
        focus: "بنیادی اے آئی اسسٹنٹس کا تعارف اور روزمرہ کے کاموں میں استعمال۔",
        focusEn: "Introduction to foundational AI assistants and everyday practical productivity workflows."
      },
      {
        part: 2,
        title: "Part 2: AI for Learning & Knowledge (Days 8-12)",
        urduTitle: "حصہ دوم: تعلیمی مواد اور ریسرچ (دن 8 تا 12)",
        days: "Days 8 - 12",
        tools: ["NotebookLM", "Qwen", "Grok", "Khanmigo", "Gamma"],
        focus: "تعلیمی مواد، ریسرچ، نوٹس اور پریزنٹیشنز بنانے کے جدید طریقے.",
        focusEn: "Modern methods for educational materials, academic research, smart notes, and automated presentations."
      },
      {
        part: 3,
        title: "Part 3: AI Design & Content (Days 13-15)",
        urduTitle: "حصہ سوم: اے آئی ڈیزائن اور مواد (دن 13 تا 15)",
        days: "Days 13 - 15",
        tools: ["Canva AI", "Microsoft Designer", "CapCut AI"],
        focus: "گرافک ڈیزائننگ اور سوشل میڈیا مواد کی تیاری۔",
        focusEn: "Graphic design, brand visuals, posters, and social media content creation."
      },
      {
        part: 4,
        title: "Part 4: AI Video Creation (Days 16-20)",
        urduTitle: "حصہ چہارم: اے آئی ویڈیو جنریشن (دن 16 تا 20)",
        days: "Days 16 - 20",
        tools: ["InVideo AI", "Kling AI", "Runway", "Google Flow/Veo", "HeyGen"],
        focus: "آرٹیفیشل انٹیلی جنس کی مدد سے ویڈیوز بنانا اور ایڈیٹنگ کرنا۔",
        focusEn: "Cinematic video generation, AI avatars, automated scripts, and video editing."
      },
      {
        part: 5,
        title: "Part 5: AI Voice & Creative (Days 21-24)",
        urduTitle: "حصہ پنجم: آواز، موسیقی اور جدید تصاویر (دن 21 تا 24)",
        days: "Days 21 - 24",
        tools: ["ElevenLabs", "Suno", "Ideogram", "Leonardo AI"],
        focus: "اے آئی وائس اوور، موسیقی (Suno) اور ایڈوانس امیج جنریشن (Ideogram, Leonardo)۔",
        focusEn: "Ultra-realistic voice cloning, AI music composition (Suno), and advanced image synthesis."
      },
      {
        part: 6,
        title: "Part 6: Professional AI & Consolidation (Days 25-30)",
        urduTitle: "حصہ ششم: پروفیشنل اے آئی اور تکمیل (دن 25 تا 30)",
        days: "Days 25 - 30",
        tools: ["Google AI Studio", "Mistral/Le Chat", "Poe", "Google Gemini Deep Research", "Canva Magic Studio", "Google AI Studio (App Intro)"],
        focus: "پروفیشنل لیول پر اے آئی کا استعمال اور پروجیکٹ کی تکمیل۔",
        focusEn: "Professional-grade AI workflows, deep research, prompt engineering, and capstone project completion."
      }
    ],
    syllabus: [
      { week: 1, topic: "Part 1: AI Assistants (Days 1-7)", detail: "ChatGPT, Gemini, Meta AI, Copilot, Claude, DeepSeek - Foundational assistants & daily productivity." },
      { week: 2, topic: "Part 2: AI for Learning & Knowledge (Days 8-12)", detail: "NotebookLM, Qwen, Grok, Khanmigo, Gamma - Smart research, notes, and presentations." },
      { week: 3, topic: "Part 3 & 4: AI Design & Video Creation (Days 13-20)", detail: "Canva AI, Microsoft Designer, CapCut AI, InVideo, Kling AI, Runway, Veo, HeyGen - Visuals & Video creation." },
      { week: 4, topic: "Part 5 & 6: AI Voice, Creative & Professional AI (Days 21-30)", detail: "ElevenLabs, Suno, Ideogram, Leonardo AI, Google AI Studio, Gemini Deep Research - Music, Voice & Capstone." }
    ],
    tools: [
      "ChatGPT", "Gemini", "Meta AI", "Microsoft Copilot", "Claude", "DeepSeek",
      "NotebookLM", "Qwen", "Grok", "Khanmigo", "Gamma",
      "Canva AI", "Microsoft Designer", "CapCut AI",
      "InVideo AI", "Kling AI", "Runway", "Google Flow/Veo", "HeyGen",
      "ElevenLabs", "Suno", "Ideogram", "Leonardo AI",
      "Google AI Studio", "Mistral/Le Chat", "Poe", "Google Gemini Deep Research", "Canva Magic Studio"
    ],
    certificateInfo: "Includes Official Verification ID & Downloadable PDF Certificate signed by Founder & CEO Dr. Shahid Akram Mustafai."
  },
  {
    id: "basic-computer",
    title: "Basic Computer Course",
    urduTitle: "بیسک کمپیوٹر کورس",
    category: "Computer Fundamentals",
    slug: "basic-computer-course",
    shortDesc: "Essential computer training covering Windows OS, Microsoft Office, Internet research, online security, typing, and office software.",
    fullDesc: "Designed from the ground up for absolute beginners, students, office clerks, and non-tech background individuals. Build confidence operating computers, managing files, typing fast, composing emails, working on Word documents, Excel spreadsheets, PowerPoint presentations, and navigating government/job portals.",
    duration: "6 Weeks (30 Hours)",
    level: "Beginner",
    fee: 3999,
    mode: "Online & Physical Campus",
    startDate: "10th October 2026",
    instructor: "Tariq Mahmood (Senior IT Instructor)",
    status: "Active",
    badge: "Foundation",
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=800&q=80",
    outcomes: [
      "Confidently operate Windows 10/11 operating system",
      "Master Microsoft Office: Word, Excel & PowerPoint",
      "Draft professional emails and manage online forms",
      "Perform fast typing and computer file management",
      "Understand digital security, scanning, printing & cloud tools"
    ],
    syllabus: [
      { week: 1, topic: "Computer Hardware & Windows OS Fundamentals", detail: "Components, desktop, file explorer, settings, software installation." },
      { week: 2, topic: "Microsoft Word Complete Mastery", detail: "Document layout, formatting, tables, CV creation, letter printing." },
      { week: 3, topic: "Microsoft Excel for Business & Data", detail: "Cells, formulas (SUM, AVERAGE, IF), tables, charts & reports." },
      { week: 4, topic: "Microsoft PowerPoint & Internet Skills", detail: "Slide design, transitions, email writing, online safety & Google Drive." }
    ],
    tools: ["Windows 11", "MS Word", "MS Excel", "MS PowerPoint", "Google Workspace"],
    certificateInfo: "Includes Official Ilm E Tech Verified Certificate."
  },
  {
    id: "ai-software-dev",
    title: "AI Software Development",
    urduTitle: "AI سافٹ ویئر ڈویلپمنٹ",
    category: "Software Development",
    slug: "ai-software-development",
    shortDesc: "Learn practical AI-assisted coding, Web Apps, Chrome Extensions, Mobile Apps, Google AI Studio, Gemini API, and deployment.",
    fullDesc: "An advanced practical course teaching modern prompt-driven development. Learn how to build full-stack web applications, SaaS tools, Chrome extensions, and Android apps using AI coding assistants like Antigravity, GitHub Copilot, Cursor, Google AI Studio, Vercel, and modern Web frameworks.",
    duration: "8 Weeks (40 Hours)",
    level: "Intermediate to Advanced",
    fee: 11999,
    mode: "Online Live & Project Based",
    startDate: "1st November 2026",
    instructor: "Engr. Hamza Khan (Lead Full-Stack Architect)",
    status: "Active",
    badge: "High Demand",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    outcomes: [
      "Build production-grade web applications using AI coding tools",
      "Integrate Gemini API, OpenAI API, and Google AI Studio into apps",
      "Develop useful Chrome extensions and cross-platform mobile apps",
      "Master GitHub, Vercel deployment, and database setup",
      "Create a professional developer portfolio with 4 live projects"
    ],
    syllabus: [
      { week: 1, topic: "AI-Assisted Engineering Workflow", detail: "Prompt-driven code architecture, Google AI Studio, Cursor, Antigravity." },
      { week: 2, topic: "Modern Web Frontend & UI Components", detail: "HTML5, Tailwind CSS, JavaScript, dynamic DOM & API fetching." },
      { week: 3, topic: "Backend APIs & Database Integration", detail: "Node.js/Python microservices, SQLite/PostgreSQL, user auth." },
      { week: 4, topic: "Building & Deploying SaaS Tools", detail: "Integrating AI APIs, payment webhooks, Vercel hosting, live project." }
    ],
    tools: ["Google AI Studio", "Antigravity", "VS Code", "GitHub", "Vercel", "JavaScript/React"],
    certificateInfo: "Includes Software Engineer Certificate with Portfolio Verification."
  },
  {
    id: "ai-content-creation",
    title: "AI Content Creation",
    urduTitle: "AI کنٹینٹ کریایشن",
    category: "Media & Content",
    slug: "ai-content-creation",
    shortDesc: "Create viral short-form videos, YouTube reels, AI avatars, automated voiceovers, social graphics, and digital ads using AI.",
    fullDesc: "Learn how to build a scalable digital content creator brand or provide content services to global clients. Master AI scripting, thumbnail design, photorealistic image creation, AI avatar video generation, automated voiceovers, and social media growth strategies for YouTube, TikTok, Facebook, and Instagram.",
    duration: "5 Weeks (20 Hours)",
    level: "Beginner to Intermediate",
    fee: 5999,
    mode: "Online Live",
    startDate: "25th October 2026",
    instructor: "Zainab Ali (Digital Content Creator)",
    status: "Active",
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    outcomes: [
      "Write high-engaging video scripts using AI writing tools",
      "Produce AI avatar videos and faceless channel content",
      "Create hyper-realistic AI images and social media graphics",
      "Generate natural-sounding Urdu and English AI voiceovers",
      "Build content calendars and automate social media posting"
    ],
    syllabus: [
      { week: 1, topic: "Content Strategy & AI Scripting", detail: "Niche selection, viral hook formulas, ChatGPT script writing." },
      { week: 2, topic: "AI Image & Graphic Creation", detail: "Midjourney, Midjourney v6, Canva, click-worthy thumbnail design." },
      { week: 3, topic: "AI Video Editing & Avatars", detail: "HeyGen avatars, CapCut AI, auto-captions, background music." },
      { week: 4, topic: "Monetization & Brand Growth", detail: "YouTube Partner Program, Facebook Reels bonuses, brand deals." }
    ],
    tools: ["ChatGPT", "Midjourney", "HeyGen", "ElevenLabs", "CapCut", "Canva"],
    certificateInfo: "Includes Digital Content Specialist Verified Certificate."
  },
  {
    id: "trading-course",
    title: "Trading Course",
    urduTitle: "کریپٹو اور فوریکس ٹریڈنگ",
    category: "Financial Literacy",
    slug: "trading-course",
    shortDesc: "Learn technical analysis, chart reading, risk management, market psychology, position sizing, and scam awareness.",
    fullDesc: "IMPORTANT: This course is purely educational and designed to teach technical analysis, market terminology, chart reading, and strict capital protection strategies. It DOES NOT promise or guarantee profits, financial returns, or signals.",
    duration: "6 Weeks (24 Hours)",
    level: "Beginner to Intermediate",
    fee: 7999,
    mode: "Online Live",
    startDate: "1st November 2026",
    instructor: "Bilal Hassan (Certified Technical Analyst)",
    status: "Active",
    badge: "Educational Only",
    disclaimer: "Trading involves significant financial risk. This course is for educational purposes only and does not guarantee profits or financial returns.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    outcomes: [
      "Understand financial market structure and key terminology",
      "Read technical charts, candlesticks, support & resistance levels",
      "Apply strict Risk-to-Reward ratios and position sizing",
      "Master market psychology and emotional control while trading",
      "Identify common online scams, fake schemes, and capital risks"
    ],
    syllabus: [
      { week: 1, topic: "Financial Markets Fundamentals & Terminology", detail: "Market types, terminology, bid/ask, charts introduction." },
      { week: 2, topic: "Technical Analysis & Candlestick Patterns", detail: "Doji, Engulfing, Support/Resistance, Trendlines." },
      { week: 3, topic: "Risk Management & Capital Protection", detail: "Stop-loss strategies, position sizing, 1-2% risk rule." },
      { week: 4, topic: "Scam Awareness & Demo Practice Trading", detail: "Avoiding fraud schemes, paper trading, discipline rules." }
    ],
    tools: ["TradingView", "MetaTrader 5 Demo", "Risk Calculator"],
    certificateInfo: "Includes Educational Completion Certificate."
  }
];

const DEFAULT_ADMISSIONS = [
  {
    appId: "APP-2026-84920",
    fullName: "Kamran Ahmed",
    fatherName: "Zulfiqar Ahmed",
    cnic: "35202-1111111-1",
    phone: "0307-4958837",
    whatsapp: "0307-4958837",
    email: "kamran@example.com",
    city: "Lahore",
    address: "House 14, Main Boulevard, Gulberg III, Lahore",
    courseId: "basic-ai",
    courseName: "Basic AI Course",
    courseFee: 4999,
    preferredMode: "Online Live Interactive",
    status: "APPROVED",
    date: "2026-09-20"
  },
  {
    appId: "APP-2026-92104",
    fullName: "Ayesha Bibi",
    fatherName: "Muhammad Younas",
    cnic: "35201-2223334-2",
    phone: "0321-4445566",
    whatsapp: "0321-4445566",
    email: "ayesha@example.com",
    city: "Islamabad",
    address: "Sector F-10/2, Islamabad",
    courseId: "ai-content-creation",
    courseName: "AI Content Creation",
    courseFee: 5999,
    preferredMode: "Online Live Interactive",
    status: "PAYMENT_PENDING",
    date: "2026-09-25"
  }
];

const DEFAULT_PAYMENTS = [
  {
    payId: "PAY-2026-10492",
    appId: "APP-2026-84920",
    studentName: "Kamran Ahmed",
    fatherName: "Zulfiqar Ahmed",
    phone: "0307-4958837",
    whatsapp: "0307-4958837",
    email: "kamran@example.com",
    city: "Lahore",
    address: "House 14, Main Boulevard, Gulberg III, Lahore",
    courseId: "basic-ai",
    courseName: "Basic AI Course",
    courseFee: 4999,
    amount: 4999,
    method: "JazzCash",
    accountHolder: "Shahid Akram",
    paymentNumber: "03206546008",
    trxId: "98765432101",
    receiptUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    status: "VERIFIED",
    submissionDate: "2026-09-21 14:30 PKT",
    verificationDate: "2026-09-21 16:15 PKT",
    studentId: "STU-2026-84920",
    enrollmentId: "ENR-2026-84920",
    receiptId: "RCPT-2026-10492"
  },
  {
    payId: "PAY-2026-29481",
    appId: "APP-2026-92104",
    studentName: "Ayesha Bibi",
    fatherName: "Muhammad Younas",
    phone: "0321-4445566",
    whatsapp: "0321-4445566",
    email: "ayesha@example.com",
    city: "Islamabad",
    address: "Sector F-10/2, Islamabad",
    courseId: "ai-content-creation",
    courseName: "AI Content Creation",
    courseFee: 5999,
    amount: 5999,
    method: "Easypaisa",
    accountHolder: "Shahid Akram",
    paymentNumber: "03206546008",
    trxId: "33445566778",
    receiptUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80",
    status: "PENDING",
    submissionDate: "2026-09-28 11:20 PKT"
  }
];

const DEFAULT_ENROLLMENTS = [
  {
    enrollmentId: "ENR-2026-84920",
    studentId: "STU-2026-84920",
    studentName: "Kamran Ahmed",
    courseId: "basic-ai",
    courseName: "Basic AI Course",
    payId: "PAY-2026-10492",
    appId: "APP-2026-84920",
    enrollmentDate: "2026-09-21",
    status: "ENROLLED",
    accessUnlocked: true
  }
];

const DEFAULT_AUDIT_LOGS = [
  {
    id: "LOG-1001",
    payId: "PAY-2026-10492",
    action: "Payment Created",
    previousStatus: "NONE",
    newStatus: "PENDING",
    performedBy: "Student: Kamran Ahmed",
    role: "STUDENT",
    date: "2026-09-21",
    time: "02:30 PM PKT",
    note: "Submitted JazzCash proof TRX 98765432101"
  },
  {
    id: "LOG-1002",
    payId: "PAY-2026-10492",
    action: "Payment Verified & Approved",
    previousStatus: "PENDING",
    newStatus: "VERIFIED",
    performedBy: "Finance Admin: Shahid Akram",
    role: "FINANCE_ADMIN",
    date: "2026-09-21",
    time: "04:15 PM PKT",
    note: "Confirmed JazzCash transfer in bank statement. Student enrolled."
  }
];

const DEFAULT_CERTIFICATES = [
  {
    id: "ILM-2026-000101",
    studentName: "Syed Muhammad Usama",
    fatherName: "Syed Tariq Mahmood",
    courseId: "basic-ai",
    courseName: "Basic AI Course",
    issueDate: "2026-08-15",
    grade: "A+ Distinction",
    status: "Verified",
    cnic: "35202-1234567-1",
    verificationUrl: "verify-certificate.html?id=ILM-2026-000101"
  }
];

const DEFAULT_BLOG = [
  {
    id: "blog-1",
    title: "How Pakistani Students Can Earn Online Using AI Tools in 2026",
    category: "AI & Freelancing",
    date: "September 24, 2026",
    author: "Dr. Shahid Akram Mustafai",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    summary: "Discover top beginner-friendly AI skills in high demand on global freelance marketplaces like Fiverr, Upwork, and local Pakistani remote markets."
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "New Batch Admissions Open for October 2026!",
    date: "2026-09-25",
    text: "Admissions are officially open for Basic AI, AI Tools Mastery, AI Software Development, and Computer Course. Message helpline 0307-4958837 for guidance."
  }
];

// LocalStorage Database Manager Class
class IlmTechDB {
  constructor() {
    this.init();
  }

  init() {
    let settings = localStorage.getItem(DB_KEYS.SETTINGS);
    if (!settings) {
      localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    }

    if (!localStorage.getItem(DB_KEYS.COURSES)) {
      localStorage.setItem(DB_KEYS.COURSES, JSON.stringify(DEFAULT_COURSES));
    }
    if (!localStorage.getItem(DB_KEYS.ADMISSIONS)) {
      localStorage.setItem(DB_KEYS.ADMISSIONS, JSON.stringify(DEFAULT_ADMISSIONS));
    }
    if (!localStorage.getItem(DB_KEYS.PAYMENTS)) {
      localStorage.setItem(DB_KEYS.PAYMENTS, JSON.stringify(DEFAULT_PAYMENTS));
    }
    if (!localStorage.getItem(DB_KEYS.ENROLLMENTS)) {
      localStorage.setItem(DB_KEYS.ENROLLMENTS, JSON.stringify(DEFAULT_ENROLLMENTS));
    }
    if (!localStorage.getItem(DB_KEYS.AUDIT_LOGS)) {
      localStorage.setItem(DB_KEYS.AUDIT_LOGS, JSON.stringify(DEFAULT_AUDIT_LOGS));
    }
    if (!localStorage.getItem(DB_KEYS.CERTIFICATES)) {
      localStorage.setItem(DB_KEYS.CERTIFICATES, JSON.stringify(DEFAULT_CERTIFICATES));
    }
    if (!localStorage.getItem(DB_KEYS.BLOG)) {
      localStorage.setItem(DB_KEYS.BLOG, JSON.stringify(DEFAULT_BLOG));
    }
    if (!localStorage.getItem(DB_KEYS.ANNOUNCEMENTS)) {
      localStorage.setItem(DB_KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    }
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(DB_KEYS.SETTINGS)) || DEFAULT_SETTINGS;
  }

  saveSettings(settings) {
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(settings));
  }

  getCourses() {
    return JSON.parse(localStorage.getItem(DB_KEYS.COURSES)) || DEFAULT_COURSES;
  }

  getCourseById(id) {
    const courses = this.getCourses();
    return courses.find(c => c.id === id || c.slug === id);
  }

  saveCourse(course) {
    const courses = this.getCourses();
    const idx = courses.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      courses[idx] = course;
    } else {
      courses.push(course);
    }
    localStorage.setItem(DB_KEYS.COURSES, JSON.stringify(courses));
  }

  getAdmissions() {
    return JSON.parse(localStorage.getItem(DB_KEYS.ADMISSIONS)) || DEFAULT_ADMISSIONS;
  }

  getAdmissionById(appId) {
    return this.getAdmissions().find(a => a.appId === appId);
  }

  addAdmission(admission) {
    const admissions = this.getAdmissions();
    admissions.unshift(admission);
    localStorage.setItem(DB_KEYS.ADMISSIONS, JSON.stringify(admissions));
  }

  updateAdmissionStatus(appId, status) {
    const admissions = this.getAdmissions();
    const item = admissions.find(a => a.appId === appId);
    if (item) {
      item.status = status;
      localStorage.setItem(DB_KEYS.ADMISSIONS, JSON.stringify(admissions));
    }
  }

  getPayments() {
    return JSON.parse(localStorage.getItem(DB_KEYS.PAYMENTS)) || DEFAULT_PAYMENTS;
  }

  getPaymentById(payId) {
    return this.getPayments().find(p => p.payId === payId || p.appId === payId);
  }

  addPayment(payment) {
    const payments = this.getPayments();
    payments.unshift(payment);
    localStorage.setItem(DB_KEYS.PAYMENTS, JSON.stringify(payments));

    // Audit log
    this.addAuditLog({
      payId: payment.payId,
      action: "Payment Submitted by Student",
      previousStatus: "NONE",
      newStatus: payment.status || "PENDING",
      performedBy: `Student: ${payment.studentName}`,
      role: "STUDENT",
      note: `Submitted ${payment.method} proof with TRX ID: ${payment.trxId}`
    });
  }

  getEnrollments() {
    return JSON.parse(localStorage.getItem(DB_KEYS.ENROLLMENTS)) || DEFAULT_ENROLLMENTS;
  }

  getEnrollmentByStudentOrPay(id) {
    return this.getEnrollments().find(e => e.studentId === id || e.payId === id || e.appId === id);
  }

  getAuditLogs(payId = null) {
    const logs = JSON.parse(localStorage.getItem(DB_KEYS.AUDIT_LOGS)) || DEFAULT_AUDIT_LOGS;
    if (payId) {
      return logs.filter(l => l.payId === payId);
    }
    return logs;
  }

  addAuditLog(logEntry) {
    const logs = JSON.parse(localStorage.getItem(DB_KEYS.AUDIT_LOGS)) || DEFAULT_AUDIT_LOGS;
    const now = new Date();
    const newLog = {
      id: "LOG-" + Math.floor(1000 + Math.random() * 9000),
      payId: logEntry.payId,
      action: logEntry.action,
      previousStatus: logEntry.previousStatus || "PENDING",
      newStatus: logEntry.newStatus,
      performedBy: logEntry.performedBy || "Admin",
      role: logEntry.role || "FINANCE_ADMIN",
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " PKT",
      note: logEntry.note || ""
    };
    logs.unshift(newLog);
    localStorage.setItem(DB_KEYS.AUDIT_LOGS, JSON.stringify(logs));
    return newLog;
  }

  // --- ATOMIC ADMIN WORKFLOW: APPROVE PAYMENT ---
  approvePaymentWorkflow(payId, adminName = "Shahid Akram (Finance Admin)", adminNote = "Payment verified in bank account") {
    const payments = this.getPayments();
    const pay = payments.find(p => p.payId === payId);
    if (!pay) return { success: false, message: "Payment record not found" };

    const prevStatus = pay.status;
    const studentId = pay.studentId || ("STU-2026-" + Math.floor(10000 + Math.random() * 90000));
    const enrollmentId = pay.enrollmentId || ("ENR-2026-" + Math.floor(10000 + Math.random() * 90000));
    const receiptId = pay.receiptId || ("RCPT-2026-" + Math.floor(10000 + Math.random() * 90000));

    pay.status = "VERIFIED";
    pay.verificationDate = new Date().toISOString().split('T')[0] + " " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " PKT";
    pay.studentId = studentId;
    pay.enrollmentId = enrollmentId;
    pay.receiptId = receiptId;
    pay.adminNote = adminNote;

    localStorage.setItem(DB_KEYS.PAYMENTS, JSON.stringify(payments));

    // Update Application Status
    const admissions = this.getAdmissions();
    const adm = admissions.find(a => a.appId === pay.appId);
    if (adm) {
      adm.status = "APPROVED";
      localStorage.setItem(DB_KEYS.ADMISSIONS, JSON.stringify(admissions));
    }

    // Create Enrollment Record
    const enrollments = this.getEnrollments();
    if (!enrollments.some(e => e.enrollmentId === enrollmentId)) {
      enrollments.unshift({
        enrollmentId: enrollmentId,
        studentId: studentId,
        studentName: pay.studentName,
        courseId: pay.courseId || "basic-ai",
        courseName: pay.courseName,
        payId: pay.payId,
        appId: pay.appId,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: "ENROLLED",
        accessUnlocked: true
      });
      localStorage.setItem(DB_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
    }

    // Audit Record
    this.addAuditLog({
      payId: payId,
      action: "Payment Verified & Approved",
      previousStatus: prevStatus,
      newStatus: "VERIFIED",
      performedBy: adminName,
      role: "FINANCE_ADMIN",
      note: adminNote
    });

    return {
      success: true,
      message: "Payment approved successfully!",
      studentId: studentId,
      enrollmentId: enrollmentId,
      receiptId: receiptId
    };
  }

  // --- ATOMIC ADMIN WORKFLOW: REJECT PAYMENT ---
  rejectPaymentWorkflow(payId, reason, adminName = "Shahid Akram (Finance Admin)") {
    const payments = this.getPayments();
    const pay = payments.find(p => p.payId === payId);
    if (!pay) return { success: false, message: "Payment record not found" };

    const prevStatus = pay.status;
    pay.status = "REJECTED";
    pay.rejectionReason = reason;
    localStorage.setItem(DB_KEYS.PAYMENTS, JSON.stringify(payments));

    // Update Application Status
    const admissions = this.getAdmissions();
    const adm = admissions.find(a => a.appId === pay.appId);
    if (adm) {
      adm.status = "PAYMENT_ISSUE";
      localStorage.setItem(DB_KEYS.ADMISSIONS, JSON.stringify(admissions));
    }

    // Audit Record
    this.addAuditLog({
      payId: payId,
      action: "Payment Rejected",
      previousStatus: prevStatus,
      newStatus: "REJECTED",
      performedBy: adminName,
      role: "FINANCE_ADMIN",
      note: `Rejection reason: ${reason}`
    });

    return { success: true, message: "Payment rejected" };
  }

  // --- ATOMIC ADMIN WORKFLOW: REQUEST MORE INFO ---
  requestMoreInfoWorkflow(payId, note, adminName = "Shahid Akram (Finance Admin)") {
    const payments = this.getPayments();
    const pay = payments.find(p => p.payId === payId);
    if (!pay) return { success: false, message: "Payment record not found" };

    const prevStatus = pay.status;
    pay.status = "ACTION_REQUIRED";
    pay.adminNote = note;
    localStorage.setItem(DB_KEYS.PAYMENTS, JSON.stringify(payments));

    // Audit Record
    this.addAuditLog({
      payId: payId,
      action: "Request More Info",
      previousStatus: prevStatus,
      newStatus: "ACTION_REQUIRED",
      performedBy: adminName,
      role: "FINANCE_ADMIN",
      note: `Action required note: ${note}`
    });

    return { success: true, message: "Requested more info from student" };
  }

  // --- STUDENT RESUBMIT PAYMENT PROOF ---
  resubmitPaymentProof(payId, newTrxId, newReceiptUrl = null) {
    const payments = this.getPayments();
    const pay = payments.find(p => p.payId === payId);
    if (!pay) return { success: false, message: "Payment record not found" };

    const prevStatus = pay.status;
    pay.status = "PENDING";
    pay.trxId = newTrxId;
    if (newReceiptUrl) pay.receiptUrl = newReceiptUrl;
    pay.submissionDate = new Date().toISOString().split('T')[0] + " " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + " PKT";
    
    localStorage.setItem(DB_KEYS.PAYMENTS, JSON.stringify(payments));

    this.addAuditLog({
      payId: payId,
      action: "Student Resubmitted Proof",
      previousStatus: prevStatus,
      newStatus: "PENDING",
      performedBy: `Student: ${pay.studentName}`,
      role: "STUDENT",
      note: `Updated TRX ID to ${newTrxId} and uploaded new proof screenshot.`
    });

    return { success: true, message: "Payment proof resubmitted for admin verification!" };
  }

  getCertificates() {
    return JSON.parse(localStorage.getItem(DB_KEYS.CERTIFICATES)) || DEFAULT_CERTIFICATES;
  }

  getCertificateById(id) {
    const certs = this.getCertificates();
    return certs.find(c => c.id.trim().toUpperCase() === id.trim().toUpperCase());
  }

  addCertificate(cert) {
    const certs = this.getCertificates();
    certs.unshift(cert);
    localStorage.setItem(DB_KEYS.CERTIFICATES, JSON.stringify(certs));
  }

  getBlogPosts() {
    return JSON.parse(localStorage.getItem(DB_KEYS.BLOG)) || DEFAULT_BLOG;
  }

  getAnnouncements() {
    return JSON.parse(localStorage.getItem(DB_KEYS.ANNOUNCEMENTS)) || DEFAULT_ANNOUNCEMENTS;
  }
}

// Global instance
window.ilmDB = new IlmTechDB();

