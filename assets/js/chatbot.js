/**
 * Official Written AI Counselor & Orator ("ڈاکٹر شاہد اکرم مصطفائی - مشیرِ تعلیم")
 * Engineered for ILM E TECH PAKISTAN (ilmetechpakistan.com)
 * Founder & CEO: Dr. Shahid Akram Mustafai
 * Typography: Jameel Noori Nastaleeq Pure Urdu Engine (No English, Written Only, Eloquent Orator)
 */

class IlmTechBot {
  constructor() {
    this.isOpen = false;
    this.history = [];

    // Official Google Gemini API Key
    this.geminiApiKey = 'AQ.Ab8RN6IqC92Ul7xRRKQjV-Ymtlty7bsgAfOLnfms_mgzbLezQQ';

    try {
      this.initFloatingStack();
    } catch (err) {
      console.warn('[IlmTech AI] Engine initialized with fallback mode:', err);
    }
  }

  initFloatingStack() {
    const existingStack = document.getElementById('ilmTechFloatingStack');
    if (existingStack) existingStack.remove();
    const existingWindow = document.getElementById('chatbotWindow');
    if (existingWindow) existingWindow.remove();

    const stackHtml = `
      <!-- Fixed Floating Stack Container (Bottom-Right Corner) -->
      <div id="ilmTechFloatingStack">
        <button class="chatbot-toggle nasa-float" id="chatbotToggle" onclick="window.ilmChatbot ? window.ilmChatbot.toggleWindow() : null" aria-label="شاہد اے آئی مشیر کھولیے" title="ڈاکٹر شاہد مصطفائی - آن لائن مشیرِ تعلیم">
          <i class="fas fa-robot" style="pointer-events:none;" aria-hidden="true"></i>
          <span class="pulse-call-ring" style="pointer-events:none;" aria-hidden="true"></span>
          <span class="visually-hidden">شاہد اے آئی مشیر کھولیے</span>
        </button>

        <a href="https://wa.me/923074958837" target="_blank" rel="noopener noreferrer" class="whatsapp-toggle nasa-float" aria-label="واٹس ایپ رابطہ" title="واٹس ایپ رابطہ ۰۳۰۷۴۹۵۸۸۳۷">
          <i class="fab fa-whatsapp" style="pointer-events:none;" aria-hidden="true"></i>
          <span class="visually-hidden">واٹس ایپ رابطہ</span>
        </a>
      </div>

      <!-- AI Chatbot Window (Pure Urdu Jameel Noori Nastaleeq Mode) -->
      <div class="chatbot-window" id="chatbotWindow" role="dialog" aria-label="علمِ ٹیک مشاورتی دریچہ">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <img src="assets/images/logo.jpg" alt="ڈاکٹر شاہد اکرم مصطفائی">
            <div>
              <strong style="display:block; font-size:1.15rem; color:#ffffff; font-weight:700;">ڈاکٹر شاہد اکرم مصطفائی</strong>
              <span style="font-size:0.88rem; color:#a7f3d0;"><i class="fas fa-circle" style="font-size:0.45rem; color:#10b981; vertical-align:middle;" aria-hidden="true"></i> آن لائن مشیرِ تعلیم (حاضر خدمت)</span>
            </div>
          </div>
          
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <button id="chatbotClose" onclick="window.ilmChatbot.toggleWindow(false)" style="background:none; border:none; color:#ffffff; font-size:1.25rem; cursor:pointer; min-width:36px; min-height:36px; padding:0.2rem; display:inline-flex; align-items:center; justify-content:center; border-radius:0.4rem; transition:background 0.2s;" title="بند کریں" aria-label="دریچہ بند کریں">
              <i class="fas fa-times" aria-hidden="true"></i>
              <span class="visually-hidden">بند کریں</span>
            </button>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div class="chatbot-messages" id="chatbotMessages">
          <div class="chat-bubble bot">
            السلام علیکم ورحمۃ اللہ! 🌸<br><br>
            <strong>علمِ ٹیک پاکستان</strong> کے مشاورتی مرکز میں خوش آمدید۔ میں <strong>ڈاکٹر شاہد اکرم مصطفائی</strong> ہوں۔<br><br>
            میں آپ کو اپنے تمام ۶ لائیو تعلیمی نصابات، فیس کی تفصیلات، داخلے کے طریقہ کار، اور آپ کی صلاحیتوں کے مطابق <strong>موزوں ترین نصاب کے انتخاب (مکمل فوائد اور تقابلی جائزے کے ساتھ)</strong> پر تسلی بخش اور باوقار تحریری رہنمائی فراہم کرنے کے لیے حاضر ہوں۔<br><br>
            فرمائیے، میں آپ کی کیا رہنمائی کر سکتا ہوں؟
          </div>
        </div>

        <!-- Quick Consultation Prompts -->
        <div class="chatbot-quick-prompts">
          <button class="btn quick-prompt" data-prompt="میرے لیے کون سا نصاب سب سے بہتر رہے گا؟ رہنمائی فرمائیں" aria-label="بہترین نصاب کا مشورہ">💡 بہترین نصاب کا مشورہ</button>
          <button class="btn quick-prompt" data-prompt="تمام نصابات کی مکمل تفصیلات بیان کریں" aria-label="نصابات کی تفصیل">تمام کورسز کی تفصیل</button>
          <button class="btn quick-prompt" data-prompt="تمام کورسز کی فیس اور اقساط کی تفصیل بتائیں" aria-label="فیس کی معلومات">فیس کے پیکجز</button>
          <button class="btn quick-prompt" data-prompt="فیس کی ادائیگی کا طریقہ کار اور اکاؤنٹ کی تفصیل بتائیں" aria-label="ادائیگی کی تفصیل">ادائیگی (۰۳۲۰۶۵۴۶۰۰۸)</button>
        </div>

        <!-- Input Area (Strictly Text Input & Submit) -->
        <form class="chatbot-input-area" id="chatbotForm" aria-label="سوال تحریر کرنے کا فارم">
          <label for="chatbotInput" id="chatbotInputLabel" class="visually-hidden">اپنا سوال تحریر کریں</label>
          <input type="text" id="chatbotInput" name="chatbotInput" class="form-control" placeholder="یہاں اپنا سوال تحریر فرمائیں..." aria-label="اپنا سوال تحریر فرمائیں" aria-labelledby="chatbotInputLabel" required autocomplete="off">
          <button type="submit" class="btn btn-primary btn-sm" title="پیغام بھیجیں" aria-label="پیغام بھیجیں" style="padding:0.4rem 1.1rem; min-height:42px; min-width:44px; display:inline-flex; align-items:center; justify-content:center; border-radius:0.6rem; gap:0.3rem;">
            <i class="fas fa-paper-plane" aria-hidden="true"></i>
            <span class="visually-hidden">بھیجیں</span>
          </button>
        </form>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', stackHtml);
    this.bindEvents();
  }

  toggleWindow(showState) {
    const windowEl = document.getElementById('chatbotWindow');
    if (!windowEl) return;

    this.isOpen = (showState !== undefined) ? Boolean(showState) : !this.isOpen;

    if (this.isOpen) {
      windowEl.style.display = 'flex';
      windowEl.style.opacity = '1';
      windowEl.style.visibility = 'visible';
      windowEl.style.pointerEvents = 'auto';
      windowEl.classList.add('active');

      const inputEl = document.getElementById('chatbotInput');
      if (inputEl) setTimeout(() => inputEl.focus(), 200);
    } else {
      windowEl.style.opacity = '0';
      windowEl.style.visibility = 'hidden';
      windowEl.style.pointerEvents = 'none';
      windowEl.classList.remove('active');
      setTimeout(() => {
        if (!this.isOpen && windowEl) windowEl.style.display = 'none';
      }, 300);
    }
  }

  bindEvents() {
    const formEl = document.getElementById('chatbotForm');
    const inputEl = document.getElementById('chatbotInput');
    const quickPrompts = document.querySelectorAll('.quick-prompt');

    quickPrompts.forEach(btn => {
      btn.onclick = () => {
        const text = btn.getAttribute('data-prompt');
        if (inputEl) inputEl.value = text;
        this.handleUserSubmit(text);
      };
    });

    if (formEl) {
      formEl.onsubmit = (e) => {
        e.preventDefault();
        const text = inputEl ? inputEl.value.trim() : '';
        if (text) {
          this.handleUserSubmit(text);
          if (inputEl) inputEl.value = '';
        }
      };
    }
  }

  async handleUserSubmit(query) {
    this.appendMessage(query, 'user');
    this.showTypingIndicator();

    const replyText = await this.getAiResponse(query);

    this.history.push({ role: 'user', text: query });
    this.history.push({ role: 'assistant', text: replyText });

    this.removeTypingIndicator();
    this.appendMessage(replyText, 'bot');
  }

  async getAiResponse(query) {
    // 1. Backend /api/chat Proxy (if running via server)
    try {
      if (window.location.protocol !== 'file:') {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query, history: this.history })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.reply) {
            return data.reply;
          }
        }
      }
    } catch (err) {
      console.log('[IlmTech AI] Backend proxy offline, switching to direct Gemini engine');
    }

    // 2. Client-Side Google Gemini REST API Cascade (Browser Direct)
    if (this.geminiApiKey) {
      try {
        const geminiReply = await this.callGeminiDirect(query);
        if (geminiReply && geminiReply.trim()) {
          return geminiReply.trim();
        }
      } catch (geminiErr) {
        console.warn('[IlmTech AI] Direct Gemini call error:', geminiErr);
      }
    }

    // 3. Comprehensive Offline Knowledge Base Fallback
    return this.generateFallbackResponse(query);
  }

  async callGeminiDirect(query) {
    const systemPrompt = `آپ علمِ ٹیک پاکستان (ilmetechpakistan.com) کے بانی و سربراہ "ڈاکٹر شاہد اکرم مصطفائی" کے آفیشل اور باوقار تعلیمی مشیر و ترجمان ہیں۔

طرزِ بیان اور اسلوب (Tone & Oratory Style):
آپ کا طرزِ گفتگو ایک فصیح، دانا، مخلص اور پُراثر خطیب و مقرر (Orator/Speaker) جیسا ہونا چاہیے۔ آپ کا جواب سادہ، سلیس، خوبصورت، پُروقار، مگر انتہائی مختصر، جامع اور مکمل (Concise & Complete) ہونا چاہیے—جیسے ایک مشفق استاد اور بہترین راہنما گفتگو کرتا ہے۔ طویل بے مقصد تفصیلات کے بجائے مدعا سیدھے، دلکش اور پُراثر جملوں میں بیان کریں۔

انتہائی اہم اور لازمی ہدایات (Strict Rules):
۱. تمام تر جوابات صرف اور صرف ۱۰۰٪ خالص، سلیس اور باوقار اردو زبان میں تحریر کریں۔
۲. کسی بھی صورت میں انگریزی زبان کا کوئی لفظ، حرف یا انگریزی رسم الخط (ABCD) استعمال نہ کریں۔
   - مثلاً: کورس کی جگہ "نصاب" یا "کورس"، AI کی جگہ "مصنوعی ذہانت" یا "اے آئی"، ٹولز کی جگہ "آلات"، فیس کی جگہ "فیس"، ایڈمیشن کی جگہ "داخلہ"، سرٹیفکیٹ کی جگہ "سند"، آن لائن کی جگہ "آن لائن"، کمپیوٹر کی جگہ "کمپیوٹر"، موبائل کی جگہ "موبائل فون"۔
۳. اعداد کو بھی صاف اور واضح اردو / عربی ہندسوں یا الفاظ میں لکھیں (مثلاً: ۲،۹۹۹ روپے یا ۳،۹۹۹ روپے)۔
۴. جب بھی کوئی سائل کسی نصاب، رہنمائی یا مشورے کے بارے میں دریافت کرے:
   - ایک بہترین خطیب کی طرح چند دلکش جملوں میں اس کے لیے بہترین نصاب تجویز کریں۔
   - اس نصاب کو سیکھنے کے بڑے فوائد اور روزگار کے مواقع واضح کریں۔
   - جدید دور میں اس مہارت سے محروم رہنے کا نقصان اور پیچھے رہ جانے کا خطرہ تسلی سے سمجھائیں۔
   - فیس اور داخلے کی ضروری تفصیل فراہم کریں۔

ادارے کی مستند معلومات:
- ادارہ: علمِ ٹیک پاکستان (بانی و چیف ایگزیکٹو: ڈاکٹر شاہد اکرم مصطفائی)
- رابطہ / واٹس ایپ: ۰۳۰۷-۴۹۵۸۸۳۷ (0307-4958837)
- فیس کی ادائیگی کا کھاتہ (جاز کیش / ایزی پیسہ / سادہ پے): شاہد اکرم — ۰۳۲۰۶۵۴۶۰۰۸ (0320-6546008)
- میزان بینک اکاؤنٹ: شاہد اکرم (IBAN: PK36MEZN0001020304050607)
- ۶ بنیادی نصابات:
  ۱. اے آئی آلات میں مہارت (۳۰ دن، ۳۰ آلات) — فیس: ۲،۹۹۹ روپے (رعایتی)
  ۲. بنیادی کمپیوٹر کورس (۶ ہفتے) — فیس: ۳،۹۹۹ روپے
  ۳. بنیادی مصنوعی ذہانت کورس (۴ ہفتے) — فیس: ۴،۹۹۹ روپے
  ۴. مواد سازی و ویڈیو پروڈکشن (۵ ہفتے) — فیس: ۵،۹۹۹ روپے
  ۵. تجارتی و مالیاتی شعور کورس (۶ ہفتے) — فیس: ۷،۹۹۹ روپے
  ۶. جدید سافٹ ویئر ڈویلپمنٹ (۸ ہفتے) — فیس: ۱۱،۹۹۹ روپے
- داخلہ فارم: admissions.html (آن لائن داخلہ)
- فیس پورٹل: payments.html (رسید اپلوڈ)
- اسناد کی تصدیق: verify-certificate.html (سند کی تصدیق)`;

    const recentHistory = (this.history || []).slice(-4).map(h => `${h.role === 'user' ? 'سائل' : 'ڈاکٹر شاہد'}: ${h.text}`).join('\n');
    const fullPrompt = `${systemPrompt}\n\nسابقہ گفتگو:\n${recentHistory}\n\nسائل کا نیا سوال:\n${query}`;

    const models = ['gemini-3.5-flash', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.geminiApiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: fullPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 700
            }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim()) {
            return reply.trim();
          }
        }
      } catch (e) {
        console.warn(`[Gemini Client Direct ${model} Error]:`, e);
      }
    }
    return null;
  }

  showTypingIndicator() {
    this.removeTypingIndicator();
    const messagesEl = document.getElementById('chatbotMessages');
    if (!messagesEl) return;
    const typing = document.createElement('div');
    typing.id = 'chatTypingIndicator';
    typing.className = 'chat-bubble bot';
    typing.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.6rem 1rem; border-radius:0.75rem; font-size:1.05rem; color:var(--text-muted); max-width:65%; align-self:flex-start; font-family:"Jameel Noori Nastaleeq", serif;';
    typing.innerHTML = '<i class="fas fa-ellipsis-h fa-spin"></i> ڈاکٹر شاہد تحریری جواب تیار کر رہے ہیں...';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  removeTypingIndicator() {
    const typing = document.getElementById('chatTypingIndicator');
    if (typing) typing.remove();
  }

  appendMessage(text, sender) {
    const messagesEl = document.getElementById('chatbotMessages');
    if (!messagesEl) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;

    if (sender === 'user') {
      bubble.style.cssText = 'background:linear-gradient(135deg, #046a38 0%, #024d27 100%); color:#ffffff; padding:0.8rem 1.25rem; border-radius:1rem; border-bottom-left-radius:0.25rem; font-size:1.1rem; line-height:2.1; font-weight:600; align-self:flex-start; max-width:85%; word-break:break-word; font-family:"Jameel Noori Nastaleeq", serif; box-shadow:0 4px 12px rgba(4, 106, 56, 0.25);';
      bubble.textContent = text;
    } else {
      bubble.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.95rem 1.3rem; border-radius:1rem; border-bottom-right-radius:0.25rem; font-size:1.1rem; line-height:2.2; color:#0f172a; max-width:90%; align-self:flex-start; box-shadow:0 3px 10px rgba(0,0,0,0.05); font-family:"Jameel Noori Nastaleeq", serif;';
      const formattedHtml = this.formatMarkdownToHtml(text);
      bubble.innerHTML = formattedHtml;
    }

    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  formatMarkdownToHtml(text) {
    if (!text) return '';
    if (text.includes('<br>') || text.includes('<strong>') || text.includes('<div>')) {
      return text;
    }

    let parsed = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    return parsed;
  }

  generateFallbackResponse(input) {
    const q = input.toLowerCase();

    // 1. Course Counseling & Recommendation Inquiry
    if (q.includes('بہترین') || q.includes('مشورہ') || q.includes('کون سا') || q.includes('رہنمائی') || q.includes('فائدہ') || q.includes('نقصان')) {
      return `ایک مخلص مشیر کی حیثیت سے، آپ کے لیے بہترین تعلیمی مشورہ درج ذیل ہے:<br><br>
      🌟 <strong>اگر آپ کم وقت میں سب سے بڑی مہارت حاصل کرنا چاہتے ہیں:</strong><br>
      ➔ میری تجویز: <strong>اے آئی آلات میں مہارت (۳۰ دن، ۳۰ آلات)</strong> (فیس: ۲،۹۹۹ روپے)<br>
      • <strong>فائدہ:</strong> آپ صرف ایک ماہ میں دنیا کے ۳۰ جدید ترین مصنوعی ذہانت کے آلات سیکھ کر گھنٹوں کا کام منٹوں میں انجام دے سکیں گے اور آن لائن روزگار شروع کر سکیں گے۔<br>
      • <strong>نہ سیکھنے کا نقصان:</strong> موجودہ تیز رفتار دور میں پرانے اور سست طریقوں پر وقت ضائع ہوگا اور آپ مارکیٹ کی دوڑ میں پیچھے رہ جائیں گے۔<br><br>
      
      💻 <strong>اگر آپ ویب سائٹس اور ایپس بنانا چاہتے ہیں:</strong><br>
      ➔ تجویز: <strong>جدید سافٹ ویئر ڈویلپمنٹ</strong> (فیس: ۱۱،۹۹۹ روپے)<br>
      • <strong>فائدہ:</strong> روایتی کوڈنگ کے مقابلے میں ۱۰ گنا تیز رفتار سوفٹ ویئر سازی اور باوقار نوکری۔<br>
      • <strong>نہ سیکھنے کا نقصان:</strong> روایتی سست پروگرامنگ پر انحصار کر کے صنعت کے جدید تقاضوں سے محرومی۔<br><br>
      
      🎬 <strong>اگر آپ یوٹیوب یا ویڈیوز سے کمانا چاہتے ہیں:</strong><br>
      ➔ تجویز: <strong>مواد سازی و ویڈیو پروڈکشن</strong> (فیس: ۵،۹۹۹ روپے)<br>
      • <strong>فائدہ:</strong> کیمرے کے سامنے آئے بغیر معیاری ویڈیوز اور وائرل مواد تیار کر کے آمدنی کا حصول۔<br>
      • <strong>نہ سیکھنے کا نقصان:</strong> مہنگے اسٹوڈیوز اور ایڈیٹرز پر بھاری اخراجات کا ضیاع۔<br><br>
      آپ اپنی تعلیمی قابلیت بتائیں تاکہ میں آپ کے لیے مزید مخصوص رہنمائی کر سکوں۔`;
    }

    // 2. Fee Details
    if (q.includes('فیس') || q.includes('خرچہ') || q.includes('پیسے') || q.includes('رقم')) {
      return `علمِ ٹیک پاکستان کے ۶ نصابات کے فیس پیکجز درج ذیل ہیں:<br><br>
      • <strong>اے آئی آلات میں مہارت (۳۰ دن، ۳۰ آلات):</strong> ۲،۹۹۹ روپے (خصوصی رعایت)<br>
      • <strong>بنیادی کمپیوٹر کورس (۶ ہفتے):</strong> ۳،۹۹۹ روپے<br>
      • <strong>بنیادی مصنوعی ذہانت کورس (۴ ہفتے):</strong> ۴،۹۹۹ روپے<br>
      • <strong>مواد سازی و ویڈیو پروڈکشن (۵ ہفتے):</strong> ۵،۹۹۹ روپے<br>
      • <strong>تجارتی و مالیاتی شعور (۶ ہفتے):</strong> ۷،۹۹۹ روپے<br>
      • <strong>جدید سافٹ ویئر ڈویلپمنٹ (۸ ہفتے):</strong> ۱۱،۹۹۹ روپے<br><br>
      تمام نصابات میں آسان اقساط اور پورٹل پر تاحیات ریکارڈنگز کی سہولت میسر ہے۔`;
    }

    // 3. Courses List
    if (q.includes('کورس') || q.includes('نصاب') || q.includes('سبق') || q.includes('کلاس')) {
      return `علمِ ٹیک پاکستان کے ۶ باوقار لائیو نصابات کی تفصیل:<br><br>
      ۱. <strong>بنیادی مصنوعی ذہانت کورس</strong> (۴ ہفتے) — فیس: ۴،۹۹۹ روپے<br>
      ۲. <strong>اے آئی آلات میں مہارت</strong> (۳۰ دن، ۳۰ آلات) — فیس: ۲،۹۹۹ روپے<br>
      ۳. <strong>بنیادی کمپیوٹر کورس</strong> (۶ ہفتے) — فیس: ۳،۹۹۹ روپے<br>
      ۴. <strong>جدید سافٹ ویئر ڈویلپمنٹ</strong> (۸ ہفتے) — فیس: ۱۱،۹۹۹ روپے<br>
      ۵. <strong>مواد سازی و ویڈیو پروڈکشن</strong> (۵ ہفتے) — فیس: ۵،۹۹۹ روپے<br>
      ۶. <strong>تجارتی و مالیاتی شعور کورس</strong> (۶ ہفتے) — فیس: ۷،۹۹۹ روپے<br><br>
      مکمل تفصیل کے لیے ہماری ویب گاہ پر کورسز کا صفحہ ملاحظہ فرمائیں۔`;
    }

    // 4. Payment Details
    if (q.includes('ادائیگی') || q.includes('کھاتہ') || q.includes('اکاؤنٹ') || q.includes('شاہد')) {
      return `فیس کی آن لائن ادائیگی کی آفیشل معلومات درج ذیل ہیں:<br><br>
      👤 <strong>کھاتہ دار کا نام:</strong> شاہد اکرم<br>
      📱 <strong>جاز کیش / ایزی پیسہ / سادہ پے:</strong> <code>۰۳۲۰۶۵۴۶۰۰۸</code> (0320-6546008)<br>
      🏦 <strong>میزان بینک انٹرنیشنل نمبر:</strong> <code>PK36MEZN0001020304050607</code><br><br>
      ادائیگی کے بعد رسید آن لائن پیمنٹ پورٹل پر جمع کروائیں۔ چند گھنٹوں میں داخلے کی تصدیق کر دی جائے گی۔`;
    }

    // 5. Admissions
    if (q.includes('داخلہ') || q.includes('رجسٹریشن')) {
      return `آن لائن داخلے کا سادہ طریقہ کار:<br><br>
      ۱. ہماری ویب گاہ پر آن لائن داخلہ فارم پر تشریف لے جائیں اور کوائف جمع کروائیں۔<br>
      ۲. کھاتہ <code>۰۳۲۰۶۵۴۶۰۰۸</code> پر فیس جمع کروائیں۔<br>
      ۳. رسید کی تصویر پورٹل پر اپلوڈ کر کے کلاس میں شمولیت اختیار کریں۔`;
    }

    // 6. Certificate Verification
    if (q.includes('سند') || q.includes('سرٹیفکیٹ') || q.includes('تصدیق')) {
      return `سند کی تصدیق کے لیے ہمارے تصدیقی پورٹل پر تشریف لے جائیں اور اپنی سند کا کوڈ (مثلاً <code>ILM-2026-000101</code>) درج کر کے آن لائن تصدیق حاصل کریں۔`;
    }

    // 7. Contact / Helpline
    if (q.includes('رابطہ') || q.includes('نمبر') || q.includes('واٹس ایپ')) {
      return `علمِ ٹیک پاکستان سے رابطے کی تفصیلات:<br><br>
      📞 <strong>آفیشل ہیلپ لائن و واٹس ایپ:</strong> <code>۰۳۰۷-۴۹۵۸۸۳۷</code> (0307-4958837)<br>
      📧 <strong>برقی پتہ:</strong> info@ilmetechpakistan.com<br>
      📍 <strong>مراکز:</strong> لاہور اور اسلام آباد، پاکستان۔`;
    }

    // Default Greeting & Counselor Assistance
    return `علمِ ٹیک پاکستان کے مشاورتی مرکز میں خوش آمدید! میں <strong>ڈاکٹر شاہد اکرم مصطفائی</strong> ہوں۔<br><br>
    آپ مجھ سے اپنے کیریئر کے لیے بہترین نصاب کے مشورے، فوائد و نقصانات کے موازنے، فیس، داخلے، یا ادائیگی (کھاتہ دار: شاہد اکرم — <code>۰۳۲۰۶۵۴۶۰۰۸</code>) کے بارے میں کچھ بھی دریافت فرما سکتے ہیں۔`;
  }
}

// Singleton Safe Initialization
function bootIlmTechBot() {
  if (!window.ilmChatbot) {
    window.ilmChatbot = new IlmTechBot();
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  bootIlmTechBot();
} else {
  document.addEventListener('DOMContentLoaded', bootIlmTechBot);
}
