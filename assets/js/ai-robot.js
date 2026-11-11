/**
 * ILM E TECH PAKISTAN — Intelligent AI Course Advisor Robot
 * - Dynamically scrapes & saves live website knowledge (CEO, Courses, Fees, Payments, Head Office)
 * - Syncs two-way with #admissionForm and localStorage (ilmetech_admissions + ietp_advisor_profile)
 * - Conducts a personalized multi-step background interview before recommending the ideal course
 * - Hybrid Engine: Optional /api/chat LLM enrichment + instant zero-latency local Urdu advisor
 */
(function () {
  'use strict';

  var STORAGE_KEYS = {
    KNOWLEDGE: 'ietp_robot_knowledge',
    PROFILE: 'ietp_advisor_profile',
    CHAT: 'ietp_advisor_chat',
    ADMISSIONS: 'ilmetech_admissions'
  };

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function safeJsonParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function textOf(el) {
    return el ? el.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  // 1. Collect & persist ALL live information from the webpage DOM
  function collectWebsiteKnowledge() {
    var knowledge = {
      brand: 'عِلْمِ ٹیک پاکستان (ILM E TECH PAKISTAN)',
      tagline: 'اے آئی اینڈ ڈیجیٹل اسکلز سینٹر',
      ceo: {
        name: 'ڈاکٹر شاہد اکرم مصطفائی (Dr. Shahid Akram Mustafai)',
        bio: '',
        policy: ''
      },
      headOffice: 'عِلْمِ ٹیک پاکستان، موڑ کھنڈا، ضلع ننکانہ صاحب، پنجاب، پاکستان',
      helpline: '0307-4958837',
      teachingMode: '100% آن لائن لائیو کلاسز بذریعہ زوم (Zoom) — کوئی ریکارڈڈ پورٹل نہیں',
      courses: [],
      services: [],
      payments: [],
      updatedAt: new Date().toISOString()
    };

    try {
      var aboutEl = document.getElementById('about');
      if (aboutEl) {
        var ceoHeading = aboutEl.querySelector('h2');
        var ceoParas = aboutEl.querySelectorAll('div.bg-brand-dark\\/70, div.bg-emerald-950\\/60');
        if (ceoHeading) knowledge.ceo.name = textOf(ceoHeading) + ' (Dr. Shahid Akram Mustafai | Founder & CEO)';
        if (ceoParas[0]) knowledge.ceo.bio = textOf(ceoParas[0]);
        if (ceoParas[1]) knowledge.ceo.policy = textOf(ceoParas[1]);
      }

      var courseButtons = document.querySelectorAll('.course-select-btn');
      courseButtons.forEach(function (btn) {
        var card = btn.closest('div.card-nasa') || btn.closest('div');
        if (!card) return;
        var titleEl = card.querySelector('h3');
        var descEl = card.querySelector('p');
        var metaSpan = card.querySelector('span[dir="ltr"]');
        var value = btn.getAttribute('data-course') || '';
        var feeMatch = value.match(/(Free|Rs\s*[\d,]+)/i);
        knowledge.courses.push({
          value: value,
          title: textOf(titleEl),
          duration: textOf(metaSpan),
          fee: feeMatch ? feeMatch[1] : '',
          description: textOf(descEl)
        });
      });

      var agencyCards = document.querySelectorAll('#agency h3');
      agencyCards.forEach(function (h3) {
        var p = h3.parentElement ? h3.parentElement.querySelector('p') : null;
        knowledge.services.push({ title: textOf(h3), description: textOf(p) });
      });

      var paymentCards = document.querySelectorAll('#payment .card-nasa');
      paymentCards.forEach(function (card) {
        knowledge.payments.push(textOf(card).replace('نمبر کاپی کریں', '').replace('IBAN طلب کریں', '').trim());
      });

      localStorage.setItem(STORAGE_KEYS.KNOWLEDGE, JSON.stringify(knowledge));
    } catch (err) {
      var cached = safeJsonParse(localStorage.getItem(STORAGE_KEYS.KNOWLEDGE), null);
      if (cached) return cached;
    }

    return knowledge;
  }

  function buildKnowledgeText(k) {
    var coursesText = (k.courses || []).map(function (c, i) {
      return (i + 1) + '. ' + c.title + ' [' + c.fee + '] — ' + c.description;
    }).join('\n');
    return [
      'ادارہ: ' + k.brand + ' — ' + k.tagline,
      'بانی و سی ای او: ' + k.ceo.name + ' | ' + k.ceo.bio,
      'ہیڈ آفس: ' + k.headOffice + ' | ہیلپ لائن: ' + k.helpline,
      'طریقہ تدریس: ' + k.teachingMode,
      'فعال کورسز:\n' + coursesText
    ].join('\n');
  }

  // 2. Profile & Form Memory Helpers
  function loadProfile() {
    var saved = safeJsonParse(localStorage.getItem(STORAGE_KEYS.PROFILE), {});
    var admissions = safeJsonParse(localStorage.getItem(STORAGE_KEYS.ADMISSIONS), []);
    if (Array.isArray(admissions) && admissions.length > 0) {
      var latest = admissions[0];
      saved.fullName = saved.fullName || latest.fullName || '';
      saved.fatherName = saved.fatherName || latest.fatherName || '';
      saved.city = saved.city || latest.city || '';
      saved.profession = saved.profession || latest.profession || '';
      saved.age = saved.age || latest.age || '';
      saved.education = saved.education || latest.education || '';
      saved.whatsapp = saved.whatsapp || latest.whatsapp || '';
      saved.courseName = saved.courseName || latest.courseName || '';
      saved.appId = latest.appId || saved.appId || '';
    }
    return saved;
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) { /* ignore storage quota */ }
  }

  function mapEducationOption(rawEdu) {
    var s = (rawEdu || '').toLowerCase();
    if (s.includes('master') || s.includes('mphil') || s.includes('ماسٹر') || s.includes('ایم فل') || s.includes('phd')) return 'Masters / MPhil';
    if (s.includes('grad') || s.includes('bs') || s.includes('ba') || s.includes('bsc') || s.includes('bcom') || s.includes('گریجو')) return 'Graduation (BA/BSc/BS)';
    if (s.includes('metric') || s.includes('matric') || s.includes('inter') || s.includes('میٹرک') || s.includes('انٹر') || s.includes('fa') || s.includes('fsc')) return 'Metric / Inter';
    return rawEdu ? 'Other' : '';
  }

  function mapProfessionOption(rawProf) {
    var s = (rawProf || '').toLowerCase();
    if (s.includes('طالب') || s.includes('student') || s.includes('پڑھ')) return 'طالب علم (Student)';
    if (s.includes('ملازم') || s.includes('job') || s.includes('نوکری') || s.includes('ٹیچر')) return 'ملازمت پیشہ (Job / Employee)';
    if (s.includes('کاروبار') || s.includes('business') || s.includes('دکان') || s.includes('تجارت')) return 'کاروباری شخصیت (Business Owner)';
    if (s.includes('فری لانس') || s.includes('freelanc')) return 'فری لانسر (Freelancer)';
    return rawProf ? 'دیگر (Other)' : '';
  }

  // 3. Smart Advisor Course Recommendation Engine
  function evaluateCourseMatch(profile) {
    var combined = [
      profile.interest || '',
      profile.profession || '',
      profile.experience || '',
      profile.education || ''
    ].join(' ').toLowerCase();

    var isAbsoluteBeginner = /نیا|زیرو|صفر|کچھ نہیں|بالکل|مفت|free|beginner|basic|شروع/.test(combined);
    var wantsVip = /ون آن ون|مینٹور|1-on-1|vip|کاروبار کی ترقی|بزنس گروتھ|شخصی رہنمائی/.test(combined) ||
      (/کاروباری/.test(profile.profession || '') && /بزنس|تشہیر|گروتھ|فروخت/.test(combined));
    var wantsSoftware = /سافٹ ویئر|ایپ|کوڈ|پروگرام|ایجنٹ|api|چیٹ بوٹ|software|developer/.test(combined);
    var wantsWeb = /ویب|سائٹ|ای کامرس|ڈومین|لینڈنگ|فنل|web|website|wordpress|ecommerce/.test(combined);
    var wantsVideo = /ویڈیو|ایڈیٹنگ|کنٹینٹ|یوٹیوب|ٹک ٹاک|ریلز|ایڈز|video|content|editing|ads/.test(combined);
    var wantsTools = /ٹولز|گرافک|پوسٹر|ڈیزائن|کینوا|مڈجرنی|تصویر|tools|canva|midjourney|design/.test(combined);

    if (wantsVip) {
      return {
        courseValue: 'VIP Mentorship - Rs 20,000',
        title: 'ون آن ون پرسنل مینٹورشپ (VIP Mentorship)',
        fee: 'Rs. 20,000',
        reason: 'چونکہ آپ ذاتی سطح پر اپنے کاروبار، کلائنٹس یا پروفیشنل گروتھ پر براہِ راست توجہ چاہتے ہیں، اس لیے ڈاکٹر شاہد اکرم مصطفائی کے ساتھ 1-on-1 لائیو مینٹورشپ آپ کو تیز ترین عملی نتائج دے گی۔',
        starterTip: ''
      };
    }

    if (wantsSoftware) {
      return {
        courseValue: 'AI Software Engineering - Rs 15,000',
        title: 'اے آئی سافٹ ویئر انجینئرنگ (AI Software Engineering)',
        fee: 'Rs. 15,000',
        reason: 'آپ کی دلچسپی ایڈوانس ٹیکنالوجی، AI ایجنٹس، آٹومیشن اور کسٹم ایپس میں ہے — یہ پروگرام آپ کو ہائی ویلیو سافٹ ویئر حل بنانا سکھاتا ہے۔',
        starterTip: isAbsoluteBeginner ? 'چونکہ آپ بالکل نئے ہیں، اس لیے بہتر ہے ساتھ 7 روزہ مفت Basic AI کورس سے اپنی بنیاد بھی مضبوط کر لیں!' : ''
      };
    }

    if (wantsWeb) {
      return {
        courseValue: 'AI Website Development - Rs 5,000',
        title: 'اے آئی ویب سائٹ ڈویلپمنٹ (AI Website Development — 15 دن)',
        fee: 'Rs. 5,000',
        reason: 'بغیر مشکل کوڈنگ کے جدید AI کی مدد سے پروفیشنل ویب سائٹس اور ای کامرس اسٹورز بنا کر لوکل و انٹرنیشنل کلائنٹس سے کمانے کے لیے یہ بہترین انتخاب ہے۔',
        starterTip: isAbsoluteBeginner ? 'آغاز کے لیے ساتھ 7 روزہ 100% مفت Basic AI کورس بھی شامل کریں تاکہ AI پرامپٹس پر مکمل عبور حاصل ہو۔' : ''
      };
    }

    if (wantsVideo) {
      return {
        courseValue: 'AI Content & Video Editing - Rs 3,500',
        title: 'اے آئی کنٹینٹ کریشن و ویڈیو ایڈیٹنگ',
        fee: 'Rs. 3,500',
        reason: 'سوشل میڈیا، یوٹیوب، ٹک ٹاک اور کمرشل اشتہارات کے لیے AI ویڈیو ایڈیٹنگ، وائس اوور اور اسکرپٹ رائٹنگ اس وقت سب سے تیز ڈیمانڈ اسکل ہے۔',
        starterTip: ''
      };
    }

    if (wantsTools) {
      return {
        courseValue: 'AI Tools Mastery - Rs 3,000',
        title: 'اے آئی ٹولز ماسٹری (30 دن)',
        fee: 'Rs. 3,000',
        reason: 'اس 30 روزہ عملی پروگرام میں آپ Midjourney، Canva AI، HeyGen اور 15 سے زائد جدید ٹولز سیکھ کر گرافکس، پریزنٹیشنز اور ڈیجیٹل کام منٹوں میں مکمل کر سکیں گے۔',
        starterTip: ''
      };
    }

    return {
      courseValue: 'Basic AI - Free',
      title: 'بیسک اے آئی کورس — 7 روزہ 100% مفت (Basic AI Course)',
      fee: 'Rs. 0 (100% مفت)',
      reason: 'نئے آنے والوں اور ابتدائی طلبہ کے لیے یہ 7 روزہ مفت زوم لائیو کورس بہترین آغاز ہے — آپ بغیر کسی فیس کے ChatGPT اور بنیادی AI ٹولز کو عملی طور پر سمجھ کر اپنا اگلا ہدف باآسانی طے کر سکتے ہیں۔',
      starterTip: ''
    };
  }

  // 4. Build Robot Floating UI & Chat Drawer
  function initRobotAdvisor() {
    var knowledge = collectWebsiteKnowledge();
    var profile = loadProfile();
    var interviewState = { active: false, step: null };

    // Mount Floating AI Robot Button beside WhatsApp/Phone
    var floatingContainer = document.getElementById('floatingActions');
    if (!floatingContainer) {
      floatingContainer = document.createElement('div');
      floatingContainer.id = 'floatingActions';
      floatingContainer.className = 'fixed bottom-5 left-5 z-40 flex flex-col gap-2.5 items-center';
      document.body.appendChild(floatingContainer);
    }

    var robotBtn = document.createElement('button');
    robotBtn.type = 'button';
    robotBtn.id = 'ietpRobotToggle';
    robotBtn.setAttribute('aria-label', 'اے آئی کورس ایڈوائزر روبوٹ کھولیں');
    robotBtn.className = 'ietp-robot-btn relative w-14 h-14 rounded-full bg-gradient-to-br from-brand-gold via-amber-400 to-brand-gold-hover text-brand-dark flex items-center justify-center shadow-2xl border-2 border-brand-gold-light hover:scale-105 transition-transform cursor-pointer group';
    robotBtn.innerHTML =
      '<span class="ietp-robot-badge">AI مشیر</span>' +
      '<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="3"/>' +
      '<path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>';

    floatingContainer.insertBefore(robotBtn, floatingContainer.firstChild);

    // Chat Drawer DOM
    var drawer = document.createElement('aside');
    drawer.id = 'ietpRobotDrawer';
    drawer.className = 'ietp-robot-drawer hidden';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'false');
    drawer.setAttribute('aria-labelledby', 'ietpRobotHeading');
    drawer.innerHTML =
      '<div class="ietp-robot-header">' +
        '<div class="flex items-center gap-2.5">' +
          '<div class="w-10 h-10 rounded-xl bg-brand-gold/20 border border-brand-gold/60 flex items-center justify-center text-brand-gold shrink-0">' +
            '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="3"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>' +
          '</div>' +
          '<div class="text-right">' +
            '<h3 id="ietpRobotHeading" class="text-base font-nastaleeq text-brand-gold-light leading-[1.8] m-0">عِلْمِ ٹیک AI مشیر روبوٹ</h3>' +
            '<p id="ietpRobotMemoryBadge" class="text-[11px] font-nastaleeq text-emerald-300 leading-[1.6] m-0">ویب سائٹ علم محفوظ (' + knowledge.courses.length + ' کورسز و CEO پروفائل)</p>' +
          '</div>' +
        '</div>' +
        '<div class="flex items-center gap-1.5">' +
          '<button type="button" id="ietpRobotRefreshKnowledge" title="ویب سائٹ معلومات ریفریش کریں" class="p-1.5 rounded-lg bg-brand-dark/60 hover:bg-brand-emerald border border-brand-border text-slate-300 hover:text-brand-gold transition-colors cursor-pointer" aria-label="نیا علم جمع کریں">' +
            '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>' +
          '</button>' +
          '<button type="button" id="ietpRobotClose" title="بند کریں" class="p-1.5 rounded-lg bg-brand-dark/60 hover:bg-red-950 border border-brand-border text-slate-200 hover:text-white transition-colors cursor-pointer" aria-label="چیٹ بند کریں">' +
            '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div id="ietpRobotMessages" class="ietp-robot-messages"></div>' +
      '<div id="ietpRobotOptions" class="ietp-robot-options"></div>' +
      '<form id="ietpRobotForm" class="ietp-robot-form">' +
        '<input type="text" id="ietpRobotInput" autocomplete="off" placeholder="اپنا سوال لکھیں یا کورس مشورہ لیں..." class="ietp-robot-input" aria-label="AI روبوٹ کو پیغام لکھیں">' +
        '<button type="submit" class="ietp-robot-send" aria-label="پیغام بھیجیں">' +
          '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>' +
        '</button>' +
      '</form>';

    document.body.appendChild(drawer);

    var messagesEl = document.getElementById('ietpRobotMessages');
    var optionsEl = document.getElementById('ietpRobotOptions');
    var formEl = document.getElementById('ietpRobotForm');
    var inputEl = document.getElementById('ietpRobotInput');
    var memoryBadgeEl = document.getElementById('ietpRobotMemoryBadge');
    var chatHistory = safeJsonParse(localStorage.getItem(STORAGE_KEYS.CHAT), []);

    function updateMemoryBadge() {
      if (!memoryBadgeEl) return;
      if (profile.fullName) {
        var cityTxt = profile.city ? ' (' + profile.city + ')' : '';
        memoryBadgeEl.textContent = 'یادداشت فعال: ' + profile.fullName + cityTxt + ' • ' + knowledge.courses.length + ' کورسز محفوظ';
      } else {
        memoryBadgeEl.textContent = 'ویب سائٹ علم محفوظ (' + knowledge.courses.length + ' کورسز و CEO پروفائل)';
      }
    }

    function persistChat() {
      try {
        localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(chatHistory.slice(-24)));
      } catch (e) { /* ignore */ }
    }

    function scrollBottom() {
      if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function appendMessage(role, htmlBody, skipSave) {
      var div = document.createElement('div');
      div.className = role === 'user' ? 'ietp-msg ietp-msg-user' : 'ietp-msg ietp-msg-bot';
      div.innerHTML = htmlBody;
      messagesEl.appendChild(div);
      scrollBottom();
      if (!skipSave) {
        chatHistory.push({ role: role, html: htmlBody, text: div.textContent.trim() });
        persistChat();
      }
      return div;
    }

    function setQuickChips(chips) {
      optionsEl.innerHTML = '';
      (chips || []).forEach(function (chip) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = chip.primary ? 'ietp-chip ietp-chip-gold' : 'ietp-chip';
        b.textContent = chip.label;
        b.addEventListener('click', function () {
          if (chip.action) {
            chip.action();
          } else {
            handleUserMessage(chip.value || chip.label);
          }
        });
        optionsEl.appendChild(b);
      });
    }

    function defaultChips() {
      setQuickChips([
        { label: '🤖 نیا ہوں — بہترین کورس تجویز کریں', value: 'میں نیا ہوں، میرے لیے کون سا کورس بہتر رہے گا؟', primary: true },
        { label: '7 روزہ مفت AI کورس', value: '7 روزہ مفت بیسک AI کورس کی تفصیل بتائیں' },
        { label: 'فیس اور اکاؤنٹس', value: 'تمام کورسز کی فیس اور ادائیگی کا طریقہ بتائیں' },
        { label: 'ڈاکٹر شاہد اکرم کون ہیں؟', value: 'سی ای او ڈاکٹر شاہد اکرم مصطفائی اور ہیڈ آفس کے بارے میں بتائیں' }
      ]);
    }

    function prefillAdmissionForm(courseValue) {
      var targetCourse = courseValue || profile.recommendedCourse || '';
      var setVal = function (id, val) {
        var el = document.getElementById(id);
        if (el && val && !el.value) el.value = val;
      };
      setVal('fullName', profile.fullName);
      setVal('fatherName', profile.fatherName);
      setVal('city', profile.city);
      setVal('whatsapp', profile.whatsapp);
      setVal('age', profile.age);
      var profEl = document.getElementById('profession');
      if (profEl && profile.profession && !profEl.value) {
        profEl.value = mapProfessionOption(profile.profession);
      }
      var eduEl = document.getElementById('education');
      if (eduEl && profile.education && !eduEl.value) {
        eduEl.value = mapEducationOption(profile.education);
      }
      var courseEl = document.getElementById('course');
      if (courseEl && targetCourse) {
        courseEl.value = targetCourse;
        courseEl.classList.add('border-brand-gold');
      }
      drawer.classList.add('hidden');
      var admSec = document.getElementById('admission');
      if (admSec) admSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window.showPortalToast === 'function') {
        window.showPortalToast('آپ کی معلومات اور تجویز کردہ کورس فارم میں شامل کر دیے گئے ✓');
      }
    }

    // Bind global action handler for dynamic recommendation CTA inside bubbles
    window.__ietpApplyRecommendation = function (courseVal) {
      prefillAdmissionForm(courseVal);
    };

    // Guided 5-Stage Advisor Question Flow
    function askNextInterviewQuestion() {
      interviewState.active = true;

      if (!profile.fullName || !profile.city) {
        interviewState.step = 'identity';
        if (!profile.fullName && !profile.city) {
          appendMessage('bot', 'بالکل! میں آپ کا ذاتی <strong>AI کورس ایڈوائزر</strong> ہوں۔ درست مشورہ دینے کے لیے پہلے مجھے اپنا مختصر تعارف کروائیں:<br><br><strong>سوال 1:</strong> آپ کا پورا نام کیا ہے اور آپ کس شہر/علاقے سے ہیں؟ <em>(مثال: علی رضا، لاہور)</em>');
        } else if (!profile.fullName) {
          appendMessage('bot', '<strong>سوال 1:</strong> آپ کا پورا نام کیا ہے؟ تاکہ میں آپ کا پروفائل محفوظ کر سکوں۔');
        } else {
          appendMessage('bot', 'محترم <strong>' + escapeHtml(profile.fullName) + '</strong> صاحب! بتائیے آپ کس شہر یا علاقے سے تعلق رکھتے ہیں؟');
        }
        setQuickChips([]);
        return;
      }

      if (!profile.profession) {
        interviewState.step = 'profession';
        appendMessage('bot', 'خوش آمدید <strong>' + escapeHtml(profile.fullName) + '</strong> (' + escapeHtml(profile.city) + ')!<br><br><strong>سوال 2:</strong> آپ فی الحال کیا کرتے ہیں؟ اپنا پیشہ یا موجودہ مصروفیت منتخب کریں یا لکھیں:');
        setQuickChips([
          { label: 'طالب علم (Student)', value: 'طالب علم (Student)' },
          { label: 'ملازمت پیشہ (Job)', value: 'ملازمت پیشہ (Job / Employee)' },
          { label: 'کاروباری شخصیت', value: 'کاروباری شخصیت (Business Owner)' },
          { label: 'فری لانسر / گھر سے کام', value: 'فری لانسر (Freelancer)' }
        ]);
        return;
      }

      if (!profile.education || !profile.experience) {
        interviewState.step = 'experience';
        appendMessage('bot', 'بہت خوب! اب <strong>سوال 3:</strong> آپ کی تعلیم کتنی ہے اور آپ نے پہلے کمپیوٹر، انٹرنیٹ یا کسی AI/ڈیجیٹل اسکل میں کیا کچھ کر رکھا ہے؟');
        setQuickChips([
          { label: 'بالکل نیا ہوں (صفر تجربہ)', value: 'میٹرک/انٹر تعلیم ہے اور میں بالکل نیا ہوں، پہلے کوئی AI کورس نہیں کیا' },
          { label: 'گریجویشن + بیسک کمپیوٹر', value: 'گریجویشن کی ہے اور بیسک کمپیوٹر/انٹرنیٹ استعمال کر لیتا ہوں' },
          { label: 'ڈیزائننگ / فری لانسنگ کا تھوڑا تجربہ', value: 'مجھے تھوڑی ڈیزائننگ یا سوشل میڈیا کا تجربہ ہے' }
        ]);
        return;
      }

      if (!profile.interest) {
        interviewState.step = 'interest';
        appendMessage('bot', '<strong>آخری سوال (سوال 4):</strong> آپ کس چیز میں سب سے زیادہ دلچسپی (Interest) رکھتے ہیں اور کیا سیکھنا چاہتے ہیں؟');
        setQuickChips([
          { label: 'مفت بنیادی AI سے آغاز', value: 'میں بالکل بنیادی اور مفت کورس سے AI سیکھنا شروع کرنا چاہتا ہوں' },
          { label: 'ویڈیو ایڈیٹنگ و کنٹینٹ کریشن', value: 'مجھے ویڈیو ایڈیٹنگ، سوشل میڈیا کنٹینٹ اور ایڈز بنانے میں دلچسپی ہے' },
          { label: 'AI ٹولز و گرافکس ماسٹری', value: 'میں جدید AI ٹولز، Canva اور گرافکس ڈیزائننگ سیکھنا چاہتا ہوں' },
          { label: 'ویب سائٹ ڈویلپمنٹ', value: 'مجھے ویب سائٹ اور ای کامرس اسٹور بنانا سیکھنے میں دلچسپی ہے' },
          { label: 'سافٹ ویئر و AI ایجنٹس', value: 'میں ایڈوانس AI سافٹ ویئر، ایپس اور چیٹ بوٹس بنانا سیکھنا چاہتا ہوں' },
          { label: 'بزنس گروتھ (1-on-1 VIP)', value: 'میں اپنے کاروبار کی ترقی کے لیے ون آن ون پرسنل رہنمائی چاہتا ہوں' }
        ]);
        return;
      }

      // All info gathered -> Deliver Personalized Recommendation!
      interviewState.active = false;
      interviewState.step = null;
      var rec = evaluateCourseMatch(profile);
      profile.recommendedCourse = rec.courseValue;
      saveProfile(profile);

      var summaryHtml =
        '<div class="space-y-2">' +
          '<div class="text-brand-gold font-bold">ماشاءاللہ! آپ کے مکمل بیک گراؤنڈ کے مطابق میرا خصوصی مشورہ:</div>' +
          '<div class="bg-black/40 border border-brand-border rounded-xl p-2.5 text-xs space-y-1">' +
            '<div>• <strong>نام و شہر:</strong> ' + escapeHtml(profile.fullName) + ' (' + escapeHtml(profile.city) + ')</div>' +
            '<div>• <strong>پیشہ:</strong> ' + escapeHtml(profile.profession) + '</div>' +
            '<div>• <strong>تعلیم / تجربہ:</strong> ' + escapeHtml(profile.experience) + '</div>' +
            '<div>• <strong>دلچسپی:</strong> ' + escapeHtml(profile.interest) + '</div>' +
          '</div>' +
          '<div class="bg-emerald-950/75 border border-brand-gold/60 rounded-xl p-3 space-y-1.5">' +
            '<div class="text-emerald-300 text-xs">تجویز کردہ بہترین کورس:</div>' +
            '<div class="text-brand-gold-light text-base font-bold">' + escapeHtml(rec.title) + '</div>' +
            '<div class="text-xs text-white font-latin" dir="ltr">Fee: ' + escapeHtml(rec.fee) + ' • 100% Live Zoom</div>' +
            '<p class="text-xs text-slate-200 leading-[2.0] m-0">' + escapeHtml(rec.reason) + '</p>' +
            (rec.starterTip ? '<p class="text-xs text-amber-300 m-0 pt-1">💡 ' + escapeHtml(rec.starterTip) + '</p>' : '') +
          '</div>' +
          '<button type="button" onclick="window.__ietpApplyRecommendation(\'' + escapeHtml(rec.courseValue).replace(/'/g, "\\'") + '\')" class="w-full py-2 px-3 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-dark font-bold text-xs cursor-pointer transition-colors">یہ کورس اور میری تفصیلات داخلہ فارم میں پُر کریں ✓</button>' +
        '</div>';

      appendMessage('bot', summaryHtml);
      defaultChips();
    }

    function parseIdentityAnswer(text) {
      var cleaned = text.replace(/میرا نام|نام|شہر|علاقہ|سے ہوں|ہوں|رہتا ہوں|رہتی ہوں|ہے|،/g, ' ').replace(/\s+/g, ' ').trim();
      var parts = cleaned.split(/[\s,،]+/).filter(Boolean);
      if (!profile.fullName && parts.length >= 2) {
        var last = parts[parts.length - 1];
        if (!profile.city && parts.length >= 2) {
          profile.city = last;
          profile.fullName = parts.slice(0, parts.length - 1).join(' ');
        } else {
          profile.fullName = cleaned;
        }
      } else if (!profile.fullName) {
        profile.fullName = cleaned || text.trim();
      } else if (!profile.city) {
        profile.city = cleaned || text.trim();
      }
      saveProfile(profile);
      updateMemoryBadge();
    }

    function answerFromKnowledge(rawText) {
      var q = rawText.toLowerCase();
      var greet = profile.fullName ? 'محترم <strong>' + escapeHtml(profile.fullName) + '</strong> صاحب! ' : '';

      // 1. User asking what Robot remembers about them
      if (q.includes('میری معلومات') || q.includes('پروفائل') || q.includes('میرے بارے') || q.includes('فارم') && (q.includes('یاد') || q.includes('کیا پتا'))) {
        if (!profile.fullName && !profile.courseName) {
          return 'ابھی تک آپ نے اپنا نام یا فارم کی تفصیلات درج نہیں کیں۔ آپ نیچے <strong>"آن لائن داخلہ فارم"</strong> میں تفصیل لکھیں یا مجھ سے نیا کورس مشورہ لیں تو میں فوراً محفوظ کر لوں گا!';
        }
        return greet + 'میرے پاس آپ کی محفوظ شدہ معلومات یہ ہیں:<br>' +
          (profile.fullName ? '• نام: ' + escapeHtml(profile.fullName) + '<br>' : '') +
          (profile.city ? '• شہر: ' + escapeHtml(profile.city) + '<br>' : '') +
          (profile.profession ? '• پیشہ: ' + escapeHtml(profile.profession) + '<br>' : '') +
          (profile.age ? '• عمر: ' + escapeHtml(profile.age) + ' سال<br>' : '') +
          (profile.education ? '• تعلیم: ' + escapeHtml(profile.education) + '<br>' : '') +
          (profile.courseName ? '• منتخب کورس: <strong class="text-brand-gold">' + escapeHtml(profile.courseName) + '</strong><br>' : '') +
          (profile.appId ? '• رجسٹریشن ٹوکن: <code class="font-latin text-emerald-300">' + escapeHtml(profile.appId) + '</code><br>' : '') +
          '<button type="button" onclick="window.__ietpApplyRecommendation()" class="mt-2 py-1.5 px-3 rounded-lg bg-brand-gold text-brand-dark text-xs font-bold cursor-pointer">داخلہ فارم دیکھیں</button>';
      }

      // 2. CEO / Founder / Head Office queries
      if (q.includes('شاہد') || q.includes('سی ای او') || q.includes('فاؤنڈر') || q.includes('بانی') || q.includes('ceo') || q.includes('ہیڈ آفس') || q.includes('پتہ') || q.includes('کہاں')) {
        return greet + '<strong>' + escapeHtml(knowledge.ceo.name) + '</strong> عِلْمِ ٹیک پاکستان کے بانی اور چیف ایگزیکٹو ہیں۔<br>' +
          '• <strong>تجربہ:</strong> ' + escapeHtml(knowledge.ceo.bio || 'AI، کمرشل ویڈیو ایڈ میکنگ، ویب ڈویلپمنٹ اور بزنس اسکیلنگ میں 3+ سال کا عملی تجربہ') + '<br>' +
          '• <strong>ہیڈ آفس:</strong> ' + escapeHtml(knowledge.headOffice) + '<br>' +
          '• <strong>ہیلپ لائن:</strong> <span dir="ltr" class="font-latin text-emerald-300">' + escapeHtml(knowledge.helpline) + '</span>';
      }

      // 3. Payment / Account queries
      if (q.includes('ادائیگی') || q.includes('اکاؤنٹ') || q.includes('easypaisa') || q.includes('jazzcash') || q.includes('sadapay') || q.includes('ایزی پیسہ') || q.includes('جاز کیش') || q.includes('بینک')) {
        return greet + 'آفیشل فیس جمع کروانے کے لیے صرف یہ مستند اکاؤنٹس استعمال کریں:<br>' +
          '• <strong>EasyPaisa / JazzCash / SadaPay / NayaPay:</strong> <strong dir="ltr" class="font-latin text-brand-gold">0320-6546008</strong> (Dr. Shahid Akram / Shahid Akram Mustafai)<br>' +
          '• <strong>Meezan Bank IBAN:</strong> واٹس ایپ <span dir="ltr" class="font-latin text-emerald-300">0307-4958837</span> پر رابطہ کر کے فوری IBAN حاصل کریں۔<br>' +
          'فیس جمع کروا کر اسکرین شاٹ 0307-4958837 پر بھیجیں (7 روزہ بیسک AI کورس بالکل مفت ہے — کوئی فیس نہیں!)۔';
      }

      // 4. All Courses & Fees (dynamically built from live website DOM!)
      if (q.includes('فیس') || q.includes('کورسز') || q.includes('تفصیل') || q.includes('کتنے') || q.includes('fee') || q.includes('courses')) {
        var list = (knowledge.courses || []).map(function (c) {
          return '• <strong>' + escapeHtml(c.title) + '</strong> — <span class="text-brand-gold font-latin" dir="ltr">' + escapeHtml(c.fee) + '</span>';
        }).join('<br>');
        return greet + 'اس وقت ویب سائٹ پر یہ <strong>' + knowledge.courses.length + ' لائیو زوم کورسز</strong> دستیاب ہیں:<br>' + list +
          '<br><br><em>نوٹ: تمام کلاسز زوم (Zoom) پر 100% لائیو ہوتی ہیں!</em>';
      }

      // 5. Free 7-day course query
      if (q.includes('مفت') || q.includes('فری') || q.includes('7 روز') || q.includes('free') || q.includes('بیسک')) {
        return greet + 'ہمارا <strong>7 روزہ بیسک اے آئی کورس (Basic AI Course)</strong> 100% مفت ہے (کوئی فیس نہیں)۔ اس میں زوم پر لائیو ChatGPT اور روزمرہ AI ٹولز سکھائے جاتے ہیں۔ آپ نیچے فارم میں <em>Basic AI - Free</em> منتخب کر کے ابھی مفت سیٹ بُک کر سکتے ہیں!';
      }

      // 6. Zoom live classes / Digital Agency / Certificate / Greetings
      if (q.includes('زوم') || q.includes('لائیو') || q.includes('ریکارڈ') || q.includes('zoom') || q.includes('کلاس') || q.includes('طریقہ')) {
        return greet + '<strong>' + escapeHtml(knowledge.teachingMode) + '</strong>۔ تمام کورسز ڈاکٹر شاہد اکرم مصطفائی کی براہِ راست نگرانی میں اسکرین شیئر کر کے عملی طور پر سکھائے جاتے ہیں تاکہ آپ دورانِ کلاس سوالات پوچھ سکیں۔';
      }

      if (q.includes('سروس') || q.includes('ایجنسی') || q.includes('ویب سائٹ') || q.includes('اشتہار') || q.includes('ایڈ') || q.includes('کاروبار')) {
        var srvList = (knowledge.services || []).map(function (s) {
          return '• <strong>' + escapeHtml(s.title) + ':</strong> ' + escapeHtml(s.description);
        }).join('<br>');
        if (srvList) {
          return greet + 'عِلْمِ ٹیک پاکستان ڈیجیٹل ایجنسی کی اہم سروسز:<br>' + srvList + '<br>بزنس آفرز کے لیے واٹس ایپ <span dir="ltr" class="font-latin text-emerald-300">' + escapeHtml(knowledge.helpline) + '</span> پر رابطہ کریں۔';
        }
      }

      if (q.includes('سرٹیفکیٹ') || q.includes('سند') || q.includes('تصدیق') || q.includes('certificate')) {
        return greet + 'کورس مکمل کرنے پر تصدیق شدہ ڈیجیٹل سرٹیفکیٹ جاری کیا جاتا ہے جسے آپ <a href="verify-certificate.html" class="text-brand-gold underline">تصدیقِ سند پورٹل</a> پر آن لائن ویریفائی کر سکتے ہیں۔';
      }

      if (/^(سلام|السلام|hi|hello|assalam|helo)/.test(q)) {
        return 'وعلیکم السلام ورحمۃ اللہ ' + (profile.fullName ? '<strong>' + escapeHtml(profile.fullName) + '</strong> صاحب! ' : 'دوست! ') +
          'میں عِلْمِ ٹیک پاکستان کا AI مشیر روبوٹ ہوں۔ آپ مجھ سے کورسز، فیس، ڈاکٹر شاہد اکرم مصطفائی یا اپنے لیے بہترین کورس کے انتخاب کے بارے میں پوچھ سکتے ہیں۔';
      }

      // 7. Selected course context if student filled form
      if (profile.courseName) {
        return greet + 'آپ نے فارم میں <strong class="text-brand-gold">' + escapeHtml(profile.courseName) + '</strong> منتخب کیا ہوا ہے۔ اگر آپ پوچھنا چاہتے ہیں کہ یہ کورس آپ کے لیے کیسا رہے گا، یا فیس/کلاس تفصیل جاننی ہو تو بے جھجھک پوچھیں یا "نیا مشورہ لیں" پر کلک کریں!';
      }

      return null;
    }

    var apiUnavailable = false;
    async function handleUserMessage(rawText) {
      var text = (rawText || '').trim();
      if (!text) return;

      appendMessage('user', escapeHtml(text));
      if (inputEl) inputEl.value = '';

      // Reset interview if user explicitly asks to restart profile
      if (/نیا مشورہ|دوبارہ|ری سیٹ|restart|reset/.test(text.toLowerCase())) {
        profile = {};
        saveProfile(profile);
        updateMemoryBadge();
        askNextInterviewQuestion();
        return;
      }

      // Continue active background interview step
      if (interviewState.active) {
        if (interviewState.step === 'identity') {
          parseIdentityAnswer(text);
          askNextInterviewQuestion();
          return;
        }
        if (interviewState.step === 'profession') {
          profile.profession = text;
          saveProfile(profile);
          askNextInterviewQuestion();
          return;
        }
        if (interviewState.step === 'experience') {
          profile.experience = text;
          if (!profile.education) profile.education = mapEducationOption(text) || text;
          saveProfile(profile);
          askNextInterviewQuestion();
          return;
        }
        if (interviewState.step === 'interest') {
          profile.interest = text;
          saveProfile(profile);
          askNextInterviewQuestion();
          return;
        }
      }

      // Detect new user asking for course recommendation / advisor help
      var qLower = text.toLowerCase();
      var asksRecommendation = /نیا ہوں|کون سا کورس|کورس بہتر|مشورہ|تجویز|سجیسٹ|کونسا|best course|recommend|advisor|شروع کروں/.test(qLower);
      if (asksRecommendation) {
        // Clear previous interest/experience only if none answered in chat yet, so we properly interview!
        askNextInterviewQuestion();
        return;
      }

      // Fast local knowledge answer (instant & zero hallucination)
      var localAns = answerFromKnowledge(text);
      if (localAns) {
        appendMessage('bot', localAns);
        defaultChips();
        return;
      }

      // General/open-ended question -> Try /api/chat (if reachable) with instant local fallback
      if (!apiUnavailable) {
        var typingEl = appendMessage('bot', '<span class="text-emerald-300 text-xs">سوچ رہا ہوں اور ویب سائٹ ریکارڈ چیک کر رہا ہوں...</span>', true);
        try {
          var controller = new AbortController();
          var timer = setTimeout(function () { controller.abort(); }, 1200);
          var res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              message: text,
              history: chatHistory.slice(-6).map(function (m) { return { role: m.role, text: m.text }; }),
              knowledge: buildKnowledgeText(knowledge),
              studentProfile: profile
            })
          });
          clearTimeout(timer);
          if (res.ok) {
            var data = await res.json();
            if (data && data.reply) {
              typingEl.innerHTML = escapeHtml(data.reply).replace(/\n/g, '<br>');
              chatHistory.push({ role: 'bot', html: typingEl.innerHTML, text: data.reply });
              persistChat();
              scrollBottom();
              defaultChips();
              return;
            }
          } else if (res.status === 404) {
            apiUnavailable = true;
          }
        } catch (err) {
          apiUnavailable = true;
        }
        var fallbackHtml =
          (profile.fullName ? 'محترم <strong>' + escapeHtml(profile.fullName) + '</strong> صاحب! ' : '') +
          'میں عِلْمِ ٹیک پاکستان کا AI مشیر ہوں۔ آپ مجھ سے کسی بھی کورس، فیس، ڈاکٹر شاہد اکرم مصطفائی یا 7 روزہ مفت AI کورس کے بارے میں پوچھ سکتے ہیں — یا <strong>"نیا ہوں — بہترین کورس تجویز کریں"</strong> بٹن دبا کر ذاتی رہنمائی حاصل کریں!';
        typingEl.innerHTML = fallbackHtml;
        chatHistory.push({ role: 'bot', html: fallbackHtml, text: typingEl.textContent });
        persistChat();
        scrollBottom();
        defaultChips();
        return;
      }

      var instantHtml =
        (profile.fullName ? 'محترم <strong>' + escapeHtml(profile.fullName) + '</strong> صاحب! ' : '') +
        'میں عِلْمِ ٹیک پاکستان کا AI مشیر ہوں۔ آپ مجھ سے کسی بھی کورس، فیس، زوم لائیو کلاسز، ڈاکٹر شاہد اکرم مصطفائی یا 7 روزہ مفت AI کورس کے بارے میں پوچھ سکتے ہیں — یا <strong>"نیا ہوں — بہترین کورس تجویز کریں"</strong> بٹن دبا کر ذاتی مشورہ حاصل کریں!';
      appendMessage('bot', instantHtml);
      defaultChips();
    }

    // Bind Drawer Events
    function openDrawer() {
      knowledge = collectWebsiteKnowledge();
      profile = loadProfile();
      updateMemoryBadge();
      drawer.classList.remove('hidden');

      if (messagesEl.children.length === 0) {
        if (chatHistory.length > 0) {
          chatHistory.forEach(function (item) {
            appendMessage(item.role, item.html, true);
          });
        } else {
          var welcome =
            'السلام علیکم' + (profile.fullName ? ' <strong>' + escapeHtml(profile.fullName) + '</strong> صاحب' : '') + '! 🤖✨<br>' +
            'میں <strong>عِلْمِ ٹیک پاکستان</strong> کا اسمارٹ <strong>AI مشیر روبوٹ</strong> ہوں۔ میں نے اس ویب سائٹ پر موجود تمام <strong>' + knowledge.courses.length + ' کورسز، فیسیں اور ڈاکٹر شاہد اکرم مصطفائی</strong> کی مکمل معلومات محفوظ کر لی ہیں۔<br>' +
            (profile.courseName
              ? '<div class="mt-2 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200">آپ کے فارم کی تفصیلات (کورس: <strong>' + escapeHtml(profile.courseName) + '</strong>) میرے ذہن میں محفوظ ہیں۔ کوئی بھی سوال پوچھیں!</div>'
              : 'اگر آپ نئے ہیں اور جاننا چاہتے ہیں کہ آپ کے لیے کون سا کورس بہترین رہے گا، تو نیچے دیے گئے بٹن پر کلک کریں — میں آپ کے بیک گراؤنڈ کے مطابق بہترین مشورہ دوں گا!');
          appendMessage('bot', welcome);
        }
        defaultChips();
      }
      setTimeout(function () { if (inputEl) inputEl.focus(); }, 150);
    }

    robotBtn.addEventListener('click', function () {
      if (drawer.classList.contains('hidden')) openDrawer();
      else drawer.classList.add('hidden');
    });

    document.getElementById('ietpRobotClose').addEventListener('click', function () {
      drawer.classList.add('hidden');
    });

    document.getElementById('ietpRobotRefreshKnowledge').addEventListener('click', function () {
      knowledge = collectWebsiteKnowledge();
      profile = loadProfile();
      updateMemoryBadge();
      appendMessage('bot', 'ویب سائٹ کا تازہ ترین ریکارڈ (' + knowledge.courses.length + ' کورسز، سی ای او تفصیل اور آپ کا فارم پروفائل) کامیابی سے اپ ڈیٹ کر لیا گیا ہے ✓');
    });

    formEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handleUserMessage(inputEl.value);
    });

    // Two-Way Live Listener on #admissionForm so Robot remembers every field typed!
    var admForm = document.getElementById('admissionForm');
    if (admForm) {
      var syncFromForm = function () {
        var getV = function (id) {
          var el = document.getElementById(id);
          return el ? (el.value || '').trim() : '';
        };
        var fn = getV('fullName');
        var fat = getV('fatherName');
        var wa = getV('whatsapp');
        var ct = getV('city');
        var pr = getV('profession');
        var ag = getV('age');
        var ed = getV('education');
        var cr = getV('course');

        if (fn) profile.fullName = fn;
        if (fat) profile.fatherName = fat;
        if (wa) profile.whatsapp = wa;
        if (ct) profile.city = ct;
        if (pr) profile.profession = pr;
        if (ag) profile.age = ag;
        if (ed) profile.education = ed;
        if (cr) profile.courseName = cr;
        saveProfile(profile);
        updateMemoryBadge();
      };
      admForm.addEventListener('input', syncFromForm);
      admForm.addEventListener('change', syncFromForm);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobotAdvisor);
  } else {
    initRobotAdvisor();
  }
})();
