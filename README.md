# Ilm E Tech Pakistan (علمِ ٹیک پاکستان)
### Official Digital Education & Technology Academy Platform
**Founder & CEO:** Dr. Shahid Akram Mustafai (ڈاکٹر شاہد اکرم مصطفائی)  
**Official Helpline / WhatsApp:** +92 307 4958837 (`03074958837`)  
**Official Domain:** [ilmetechpakistan.com](https://ilmetechpakistan.com)  

---

## 📌 Executive Overview

**Ilm E Tech Pakistan** is a modern, high-performance, production-ready Digital Education & Technology Academy Platform founded by **Dr. Shahid Akram Mustafai**. Built specifically for Pakistani students, freelancers, job seekers, content creators, and digital entrepreneurs. 

This platform uses the **uploaded official Ilm E Tech Pakistan logo emblem** as its central brand identity and reflects the exact brand color palette (Emerald Green `#046a38`, Dark Tech Green `#003b1d`, Gear Blue `#0284c7`, Pure White, and subtle tech circuit motifs).

---

## 🌟 Leadership & Official Identity

- **Founder & CEO:** Dr. Shahid Akram Mustafai (`assets/images/ceo.jpg`)
- **Official Contact Number:** `03074958837` / `+92 307 4958837`
- **Payment Account Holder Name:** `Shahid Akram`
- **Registered Payment Number:** `03206546008` (JazzCash, Easypaisa, SadaPay)

---

## 🌟 Key Platform Features

### 1. Brand & Bilingual Identity
- **Logo Preservation:** Uploaded official logo (`assets/images/logo.jpg`) prominently positioned across headers, hero sections, footers, certificates, and AI chatbot.
- **Bilingual English + Urdu UI:** Instant English and Urdu typography support using web fonts (`Plus Jakarta Sans` for English, `Noto Nastaliq Urdu` & `Jameel Noori Nastaleeq` for Urdu).

### 2. Complete Course Architecture
Detailed professional syllabus pages for all 6 official academy courses:
1. **Basic AI Course** (Urdu: بنیادی اے آئی کورس) — Beginner-friendly AI, prompt engineering, ChatGPT, Claude, Gemini, productivity workflows.
2. **AI Tools Mastery** (Urdu: اے آئی ٹولز ماسٹری) — 25+ cutting-edge tools for copywriting, AI video, voice cloning, and freelancing.
3. **Basic Computer Course** (Urdu: بنیادی کمپیوٹر کورس) — Windows OS, MS Word, MS Excel, MS PowerPoint, typing, printing, online security.
4. **AI Software Development** (Urdu: اے آئی سافٹ ویئر ڈیولپمنٹ) — Prompt-driven engineering, Antigravity, Google AI Studio, Gemini API, Chrome extensions, web & mobile apps.
5. **AI Content Creation** (Urdu: اے آئی کنٹینٹ کریشن) — Viral reels, AI avatar videos, automated voiceovers, thumbnail design, YouTube & social monetization.
6. **Trading Course** (Urdu: ٹریڈنگ کورس) — Technical analysis, chart reading, risk management, and scam awareness. *(Contains mandatory educational risk disclaimer).*

### 3. Online Admission & Application System
- Interactive student admission form capturing student details, CNIC/B-Form, phone, WhatsApp, email, city, course selection, and preferred class format.
- Automatically generates unique **Application Reference ID** (e.g. `APP-2026-84920`).
- Generates an instant printable admission voucher.

### 4. Pakistani Payment Portal
- Supports official Pakistani payment methods: **JazzCash**, **Easypaisa**, **SadaPay**, and **Meezan Bank Transfer (IBAN)**.
- Account Holder: `Shahid Akram` | Registered Number: `03206546008`.
- Step-by-step transaction proof submission with screenshot upload & reference TRX ID.
- Generates **Payment Receipt ID** (e.g. `PAY-2026-10492`).
- Account credentials dynamically editable via Admin Dashboard.

### 5. Official Certificate Verification System (`/verify-certificate.html`)
- Public verification tool allowing employers or students to enter a unique Verification Code (e.g. `ILM-2026-000101`).
- Displays instant verified status badge, student name, father name, course, completion date, grade, verification seal, printable PDF certificate view, and QR code representation.

### 6. Student Portal Dashboard (`/student-portal.html`)
- Authenticated student view showcasing enrolled courses, application status, payment status, verified certificates, academy announcements, and downloads.

### 7. Secure Admin Dashboard CMS (`/admin-dashboard.html`)
- Complete CMS for non-technical administrators to manage:
  - Student admission applications (Approve / Reject).
  - Submitted payment receipts (Verify & Approve).
  - Certificate Generator (Issue official certificate IDs `ILM-2026-XXXXXX`).
  - Course pricing & admission status editor.
  - Platform contact settings & Pakistani payment account details.

### 8. AI Chatbot Assistant ("IlmTech Bot")
- Built-in virtual assistant widget trained on academy courses, admissions, payment accounts, certificate verification, and contact details.

---

## 📁 Directory Structure

```
ilm e tech web/
├── assets/
│   ├── css/
│   │   └── styles.css          # Main stylesheet with brand palette & Urdu fonts
│   ├── images/
│   │   ├── logo.jpg            # Uploaded official Ilm E Tech Pakistan logo
│   │   └── ceo.jpg             # Uploaded official photo of Dr. Shahid Akram Mustafai
│   └── js/
│       ├── app.js              # Core UI interactions, drawer, language switcher, forms
│       ├── db.js               # LocalStorage CMS database & initial seed data
│       ├── admin.js            # Admin Dashboard CMS logic
│       └── chatbot.js          # AI Assistant knowledge engine
├── index.html                  # Official Homepage (with Founder & CEO Spotlight)
├── courses.html                # All Official Courses Listing
├── course-detail.html          # Dynamic Course Detail & Syllabus Viewer
├── e-services.html             # Digital E-Services Portal Hub
├── admissions.html             # Online Student Admission System
├── payments.html               # Fee Payment Submission Portal
├── verify-certificate.html     # Certificate Verification System
├── student-portal.html         # Student Learning Portal Dashboard
├── admin-dashboard.html        # Secure Admin CMS Dashboard
├── about.html                  # About Us Page (with Founder & CEO Leadership Section)
├── contact.html                # Contact Us & Helpline Page (03074958837)
├── blog.html                   # Blog & Tech Guides Hub
├── downloads.html              # Download Center
├── privacy-policy.html         # Privacy Policy
├── terms.html                  # Terms & Conditions
├── disclaimer.html             # Trading Education Disclaimer
├── api/
│   └── server.js               # Express REST API backend server
├── prisma/
│   └── schema.prisma           # Relational Database Schema (PostgreSQL/SQLite)
├── package.json                # Node.js dependencies & scripts
├── .env.example                # Environment variables template
└── README.md                   # Platform documentation
```

---

## 🚀 How to Run & Deploy

### Quick Local Run (Zero Installation Required)
Simply double click `index.html` or serve with any web server:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### Production Domain Connection (`ilmetechpakistan.com`)
1. Upload the files to your web hosting server (cPanel, Vercel, Netlify, DigitalOcean, or AWS).
2. Point your domain DNS A Records to your server IP address.
3. Enable SSL Certificate (HTTPS) for `ilmetechpakistan.com`.

---

© 2026 **Ilm E Tech Pakistan (علمِ ٹیک پاکستان)**. All Rights Reserved.  
Founder & CEO: **Dr. Shahid Akram Mustafai**  
Helpline / WhatsApp: **+92 307 4958837** (`03074958837`)  
Official Domain: `ilmetechpakistan.com`
