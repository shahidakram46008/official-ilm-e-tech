/**
 * Official Written AI Counselor & Assistant ("ڈاکٹر شاہد اکرم مصطفائی - Shahid AI")
 * Engineered for Ilm E Tech Pakistan (ilmetechpakistan.com)
 * Founder & CEO: Dr. Shahid Akram Mustafai
 * Mode: 100% Written Text Consultation & Course Guidance Engine (Audio & Call Features Removed)
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
        <button class="chatbot-toggle nasa-float" id="chatbotToggle" onclick="window.ilmChatbot ? window.ilmChatbot.toggleWindow() : null" aria-label="Open AI Assistant Shahid" title="شاہد AI - تحریری رہنمائی حاصل کریں">
          <i class="fas fa-robot" style="pointer-events:none;" aria-hidden="true"></i>
          <span class="pulse-call-ring" style="pointer-events:none;" aria-hidden="true"></span>
          <span class="visually-hidden">Open AI Assistant Shahid</span>
        </button>

        <a href="https://wa.me/923074958837" target="_blank" rel="noopener noreferrer" class="whatsapp-toggle nasa-float" aria-label="WhatsApp Support" title="WhatsApp Helpline 0307-4958837">
          <i class="fab fa-whatsapp" style="pointer-events:none;" aria-hidden="true"></i>
          <span class="visually-hidden">WhatsApp Support</span>
        </a>
      </div>

      <!-- AI Chatbot Window (Written Content Only) -->
      <div class="chatbot-window" id="chatbotWindow" role="dialog" aria-label="IlmTech AI Assistant Window">
        <!-- Header (Clean Written Mode - Call & Audio Removed) -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <img src="assets/images/logo.jpg" alt="Shahid AI Logo">
            <div>
              <strong style="display:block; font-size:0.95rem; color:#ffffff; font-weight:700;">ڈاکٹر شاہد اکرم مصطفائی (AI)</strong>
              <span style="font-size:0.75rem; color:#6ee7b7;"><i class="fas fa-circle" style="font-size:0.5rem; color:#10b981;" aria-hidden="true"></i> آن لائن تحریری رہنمائی (24/7 فعال)</span>
            </div>
          </div>
          
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <button id="chatbotClose" onclick="window.ilmChatbot.toggleWindow(false)" style="background:none; border:none; color:#ffffff; font-size:1.25rem; cursor:pointer; min-width:36px; min-height:36px; padding:0.2rem; display:inline-flex; align-items:center; justify-content:center; border-radius:0.4rem; transition:background 0.2s;" title="بند کریں (Close Window)" aria-label="Close Chatbot Window">
              <i class="fas fa-times" aria-hidden="true"></i>
              <span class="visually-hidden">Close Chatbot Window</span>
            </button>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div class="chatbot-messages" id="chatbotMessages">
          <div class="chat-bubble bot">
            السلام علیکم! 🌸<br><br>
            <strong>علمِ ٹیک پاکستان</strong> کے آفیشل AI اسسٹنٹ پورٹل میں خوش آمدید۔ میں <strong>ڈاکٹر شاہد اکرم مصطفائی</strong> (Founder & CEO) ہوں۔<br><br>
            میں آپ کو اپنے تمام 6 لائیو AI کورسز، فیس، داخلے، اور آپ کی تعلیمی و پیشہ ورانہ ضرورت کے مطابق <strong>بہترین کورس کے انتخاب (مکمل فوائد اور تقابلی جائزے کے ساتھ)</strong> پر تسلی بخش تحریری رہنمائی فراہم کرنے کے لیے حاضر ہوں۔<br><br>
            فرمائیں، میں آپ کی کیا مدد کر سکتا ہوں؟
          </div>
        </div>

        <!-- Quick Consultation Prompts -->
        <div style="padding:0.5rem 0.75rem; background:#ffffff; border-top:1px solid var(--border-light); display:flex; gap:0.4rem; overflow-x:auto; white-space:nowrap;">
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="میرے لیے کون سا کورس بہترین رہے گا؟ رہنمائی اور فوائد بتائیں" aria-label="Course Recommendation Prompt" style="min-height:34px; border-color:#10b981; color:#046a38; font-weight:700;">💡 بہترین کورس کا مشورہ</button>
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="تمام کورسز کی تفصیلی معلومات اور نصاب دیں" aria-label="Course Details Prompt" style="min-height:34px;">کورسز کی تفصیلات</button>
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="کورسز کی فیس اور اقساط کی تفصیل بتائیں" aria-label="Fee Info Prompt" style="min-height:34px;">فیس کی معلومات</button>
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="شاہد اکرم کا اکاؤنٹ نمبر 03206546008 اور فیس ادائیگی کا طریقہ" aria-label="Payment Info Prompt" style="min-height:34px;">ادائیگی (03206546008)</button>
        </div>

        <!-- Input Area (Strictly Text Input & Submit) -->
        <form class="chatbot-input-area" id="chatbotForm" aria-label="Chatbot Input Form">
          <label for="chatbotInput" id="chatbotInputLabel" class="visually-hidden">Ask AI Assistant a Question</label>
          <input type="text" id="chatbotInput" name="chatbotInput" class="form-control" placeholder="اردو یا انگلش میں سوال ٹائپ کریں..." aria-label="Ask AI Assistant a question" aria-labelledby="chatbotInputLabel" required style="font-size:0.9rem; min-height:42px; border-radius:0.5rem;">
          <button type="submit" class="btn btn-primary btn-sm" title="بھیجیں" aria-label="Send Message" style="padding:0.4rem 1.1rem; min-height:42px; min-width:44px; display:inline-flex; align-items:center; justify-content:center; border-radius:0.5rem; gap:0.3rem;">
            <i class="fas fa-paper-plane" aria-hidden="true"></i>
            <span class="visually-hidden">Send Message</span>
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
    const systemPrompt = `آپ علمِ ٹیک پاکستان (ilmetechpakistan.com) کے آفیشل AI اسسٹنٹ اور تعلیمی مشیر (Career & AI Counselor) "ڈاکٹر شاہد اکرم مصطفائی (Dr. Shahid Akram Mustafai)" ہیں، جو کہ ادارے کے بانی و چیف ایگزیکٹو آفیسر (Founder & CEO) ہیں۔

آپ کا کام صرف اور صرف تحریری (Written Text) میں صارف کے ہر سوال کا نہایت شائستہ، بااخلاق، فصیح، مدلل اور تفصیلی جواب دینا ہے۔ تمام گفتگو تحریری ہوگی۔ صارف جس زبان (اردو، انگلش، یا رومن اردو) میں سوال کرے، اسی زبان میں تسلی بخش رہنمائی فراہم کریں۔

==================== خصوصی کونسلنگ و کورس رہنمائی ہدایات (Counseling & Guidance) ====================
جب بھی کوئی طالب علم یا صارف کورس کے انتخاب، اپنے کیریئر کے لیے مشورے (Recommendation / Suggestions)، یا یہ پوچھے کہ "میرے لیے کون سا کورس بہتر رہے گا؟":
1. اس کی ضرورت، دلچسپی یا تعلیمی پس منظر کو سمجھ کر علمِ ٹیک پاکستان کے 6 کورسز میں سے سب سے موزوں کورس تجویز کریں۔
2. بڑی تسلی اور خلوص کے ساتھ اس کورس کا احاطہ کریں اور درج ذیل لازمی پہلو بیان کریں:
   ✅ **کورس کے فائدے اور کیریئر کے مواقع (Pros & Benefits):**
      - یہ کورس کرنے سے کیا عملی مہارت ملے گی۔
      - مارکیٹ میں اس کی کیا مانگ ہے اور فری لانسنگ، جاب، اور آن لائن کمانے کے کیا مواقع ہیں۔
      - زندگی اور کام میں رفتار، وقت اور محنت کی بچت۔
   ⚠️ **نہ کرنے کا نقصان (Cons & Risks of Missing Out):**
      - موجودہ تیز رفتار AI دور میں اس اسکل کے بغیر پیچھے رہ جانے کا خطرہ۔
      - روایتی، فرسودہ اور سست طریقوں پر وقت اور محنت ضائع ہونا۔
      - جدید جاب مارکیٹ کے تقاضوں کا مقابلہ نہ کر پانا۔
3. ہمیشہ منظم پیراگراف، واضح بلٹ پوائنٹس (Bullet Points)، اور دوستانہ و مخلصانہ لہجے میں تسلی سے جواب دیں۔

==================== ادارہ اور رابطہ ====================
- ادارے کا نام: علمِ ٹیک پاکستان (Ilm E Tech Pakistan)
- آفیشل ویب سائٹ: ilmetechpakistan.com
- بانی و سی ای او: ڈاکٹر شاہد اکرم مصطفائی (Dr. Shahid Akram Mustafai)
- آفیشل ہیلپ لائن / واٹس ایپ: 0307-4958837 (+92 307 4958837)
- آفیشل ای میل: info@ilmetechpakistan.com
- کیمپس و دفاتر: ٹیکنالوجی کیمپس، لاہور اور اسلام آباد، پاکستان
- کلاسز کا طریقہ کار: ہائی ڈیفینیشن لائیو آن لائن کلاسز مع سٹوڈنٹ پورٹل میں تاحیات ریکارڈڈ رسائی (Lifetime LMS Access)۔

==================== آفیشل کورسز، فیس، اور گائیڈ لائنز ====================
1. **AI ٹولز ماسٹری - 30 دن، 30 ٹولز (AI Tools Mastery):**
   - دورانیہ: 30 دن (روزانہ لائیو سیشن + ہینڈز آن پریکٹس) | رعایتی فیس: 2,999 PKR (اصل فیس: 9,999 روپے)
   - کن کے لیے بہترین: ہر وہ طالب علم، فری لانسر یا پروفیشنل جو کم وقت میں دنیا کے ٹاپ 30 AI ٹولز سیکھ کر فوری فائدہ اور ارننگ شروع کرنا چاہتا ہے۔
   - ٹولز: ChatGPT, Gemini, Copilot, DeepSeek, Claude, NotebookLM, Canva AI, CapCut, InVideo, Kling, Runway, ElevenLabs, Suno وغیرہ۔
   - فوائد (Pros): 30 دن میں گھنٹوں کا کام منٹوں میں کرنے کی صلاحیت، ہر کلاس میں لائیو پروجیکٹ۔
   - نہ کرنے کا نقصان (Cons): مارکیٹ کے جدید ورک فلو سے محرومی اور پرانے طریقوں پر وقت کا ضیاع۔

2. **بیسک AI کورس (Basic AI Course):**
   - دورانیہ: 4 ہفتے (16 گھنٹے) | فیس: 4,999 PKR | لیول: Beginner
   - کن کے لیے بہترین: وہ افراد جن کا کوئی کوڈنگ یا ٹیکنیکل بیک گراؤنڈ نہیں، لیکن روزمرہ نوکری، ریسرچ، کنٹینٹ اور اسٹڈی میں AI سیکھنا چاہتے ہیں۔
   - ٹولز: ChatGPT, Google Gemini, Claude, Prompt Engineering, Midjourney, Canva Magic, Gamma
   - فوائد (Pros): بغیر کوڈنگ کے AI پر مہارت، پرامپٹ انجینئرنگ کے اصول۔
   - نہ کرنے کا نقصان (Cons): AI ٹیکنالوجی کے خوف سے نہ نکل پانا اور کاموں میں سست روی۔

3. **بیسک کمپیوٹر کورس (Basic Computer Course):**
   - دورانیہ: 6 ہفتے (30 گھنٹے) | فیس: 3,999 PKR | لیول: Absolute Beginner
   - کن کے لیے بہترین: بالکل شروعات کرنے والے، دفتری ملازمین، طلباء جنہیں بنیادی کمپیوٹر ضروری ہے۔
   - نصاب: Windows 10/11, MS Word, Excel, PowerPoint, اردو و انگلش ٹائپنگ، دفتری دستاویزات اور انٹرنیٹ سیکیورٹی۔
   - فوائد (Pros): دفتری کاموں میں خود کفالت اور نوکری کے بنیادی معیار پر پورا اترنا۔
   - نہ کرنے کا نقصان (Cons): کمپیوٹر ناخواندگی کی وجہ سے بنیادی ملازمت کے مواقع سے بھی محرومی۔

4. **AI سافٹ ویئر ڈویلپمنٹ (AI Software Development):**
   - دورانیہ: 8 ہفتے (40 گھنٹے) | فیس: 11,999 PKR | لیول: Intermediate to Advanced
   - کن کے لیے بہترین: کوڈرز، آئی ٹی سٹوڈنٹس اور وہ لوگ جو جدید ویب ایپس، کروم ایکسٹینشنز اور AI ٹولز بنانا چاہتے ہیں۔
   - نصاب: جدید AI پراپمپٹ ڈرائیون کوڈنگ، Cursor, Antigravity, Gemini API, GitHub, Vercel ڈپلائمنٹ، 4 لائیو پورٹ فولیو پروجیکٹس۔
   - فوائد (Pros): روایتی کوڈنگ سے 10 گنا تیز رفتار پروڈکشن، سافٹ ویئر ایجنسی اور ہائی پےئنگ جابز۔
   - نہ کرنے کا نقصان (Cons): صرف روایتی کوڈنگ پر انحصار کر کے AI کے تیز رفتار دور میں آؤٹ ڈیٹڈ ہو جانا۔

5. **AI کنٹینٹ کریایشن (AI Content Creation):**
   - دورانیہ: 5 ہفتے (20 گھنٹے) | فیس: 5,999 PKR | لیول: Beginner to Intermediate
   - کن کے لیے بہترین: یوٹیوبرز، ویڈیو کریٹرز، سوشل میڈیا مارکیٹرز اور کیمرے کے سامنے آئے بغیر فیس لیس ویڈیوز بنانے والے۔
   - نصاب: وائرل ویڈیوز، HeyGen اوتار، ElevenLabs وائس اوور، Midjourney گرافکس، مونیٹائزیشن۔
   - فوائد (Pros): کیمرہ یا مہنگے اسٹوڈیو کے بغیر معیاری ویڈیوز بنا کر ڈالر کمانے کے راستے۔
   - نہ کرنے کا نقصان (Cons): ویڈیو ایڈیٹنگ میں ہزاروں روپے خرچ کرنا اور کیمرے کے جھجھک کی وجہ سے کنٹینٹ نہ بنا پانا۔

6. **ٹریڈنگ ایجوکیشن کورس (Trading Course - Financial Literacy):**
   - دورانیہ: 6 ہفتے (24 گھنٹے) | فیس: 7,999 PKR | لیول: Beginner to Intermediate
   - کن کے لیے بہترین: وہ افراد جو کرپٹو اور فوریکس مارکیٹ کو سائنسی بنیادوں پر سمجھنا اور آن لائن فراڈ سے بچنا چاہتے ہیں۔
   - نصاب: چارٹ ریڈنگ، کینڈل اسٹکس، پرائس ایکشن، رسک مینجمنٹ۔ (اہم وضاحت: یہ صرف تعلیمی کورس ہے، منافع کی گارنٹی نہیں)۔
   - فوائد (Pros): مارکیٹ ٹرینڈز کو خود سمجھنا، جذباتی فیصلوں اور بھاری مالی نقصان سے حفاظت۔
   - نہ کرنے کا نقصان (Cons): بغیر علم کے مارکیٹ میں سرمایہ برباد کرنا اور فراڈیوں کے جال میں پھنسنا۔

==================== فیس کی ادائیگی کا طریقہ اور اکاؤنٹس ====================
- اکاؤنٹ ہولڈر کا نام: شاہد اکرم (Shahid Akram)
- اکاؤنٹ نمبر (JazzCash / Easypaisa / SadaPay): 03206546008
- بینک اکاؤنٹ: میزان بینک لمیٹڈ (Meezan Bank Limited)
- بینک ٹائٹل: شاہد اکرم | IBAN نمبر: PK36MEZN0001020304050607
- فیس بھیجنے کے بعد طریقہ: ویب سائٹ پر "Fee Payment" (payments.html) پیج پر جا کر سٹوڈنٹ نام، کورس، ادا کردہ رقم اور ٹرانزیکشن (TRX ID) درج کریں اور رسید کا اسکرین شاٹ اپلوڈ کریں۔ 2 سے 24 گھنٹوں میں اکاؤنٹس ٹیم تصدیق کر کے پورٹل پر کورس ایکٹیو کر دیتی ہے۔

==================== داخلہ اور سرٹیفکیٹ ====================
- آن لائن داخلہ: admissions.html پر جا کر فارم پُر کریں اور فوری ریفرنس واؤچر (مثلاً APP-2026-xxxxx) حاصل کریں۔
- سرٹیفکیٹ کی تصدیق: تمام کامیاب طلباء کو منفرد ویریفیکیشن آئی ڈی (مثلاً ILM-2026-000101) والا آفیشل سرٹیفکیٹ ملتا ہے جس کی تصدیق verify-certificate.html پر کی جا سکتی ہے۔
- سٹوڈنٹ پورٹل: student-portal.html پر لاگ اِن کر کے ریکارڈنگز اور نوٹس دیکھیں۔

ہمیشہ بااخلاق، پرخلوص اور محترم انداز میں تفصیلی تحریری جواب دیں اور متعلقہ لنکس فراہم کریں۔`;

    const recentHistory = (this.history || []).slice(-4).map(h => `${h.role === 'user' ? 'صارف' : 'ڈاکٹر شاہد'}: ${h.text}`).join('\n');
    const fullPrompt = `${systemPrompt}\n\nسابقہ گفتگو:\n${recentHistory}\n\nصارف کا نیا سوال:\n${query}`;

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
              temperature: 0.6,
              maxOutputTokens: 750
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
    typing.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.6rem 1rem; border-radius:0.75rem; font-size:0.85rem; color:var(--text-muted); max-width:60%; align-self:flex-start;';
    typing.innerHTML = '<i class="fas fa-ellipsis-h fa-spin"></i> ڈاکٹر شاہد تحریری جواب تیار کر رہا ہے...';
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
      bubble.style.cssText = 'background:var(--primary-green); color:#ffffff; padding:0.75rem 1rem; border-radius:0.75rem; font-size:0.9rem; font-weight:600; align-self:flex-end; max-width:82%; line-height:1.6; word-break:break-word;';
      bubble.textContent = text;
    } else {
      bubble.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.9rem 1.1rem; border-radius:0.75rem; font-size:0.9rem; color:var(--text-body); max-width:88%; align-self:flex-start; line-height:1.6; box-shadow:0 2px 6px rgba(0,0,0,0.05);';
      // Format simple markdown into HTML safely if response contains markdown
      const formattedHtml = this.formatMarkdownToHtml(text);
      bubble.innerHTML = formattedHtml;
    }

    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  formatMarkdownToHtml(text) {
    if (!text) return '';
    // If it already looks like HTML, return directly
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
    if (q.includes('بہترین') || q.includes('مشورہ') || q.includes('کون سا') || q.includes('best') || q.includes('recommend') || q.includes('suggestion') || q.includes('رہنمائی') || q.includes('فائدہ') || q.includes('نقصان')) {
      return `بہترین کورس کے انتخاب کے لیے تفصیلی رہنمائی اور تقابلی جائزہ:<br><br>
      🌟 <strong>1. اگر آپ نئے ہیں اور فوری طور پر AI کے ماسٹر بننا چاہتے ہیں:</strong><br>
      ➔ تجویز: <strong>AI ٹولز ماسٹری (30 دن، 30 ٹولز)</strong> (رعایتی فیس: 2,999 PKR)<br>
      • <strong>فائدہ (Pros):</strong> 30 دن میں ChatGPT، Gemini، Midjourney، ElevenLabs سمیت 30 ٹولز پر عملی مہارت، وقت کی زبردست بچت اور فوری فری لانسنگ کے مواقع۔<br>
      • <strong>نہ کرنے کا نقصان (Cons):</strong> مارکیٹ میں روایتی اور سست طریقوں پر وقت برباد ہونا اور جدید AI ٹولز سے ناواقف رہنا۔<br><br>
      
      💻 <strong>2. اگر آپ کوڈنگ یا ایپس بنانا چاہتے ہیں:</strong><br>
      ➔ تجویز: <strong>AI سافٹ ویئر ڈویلپمنٹ</strong> (فیس: 11,999 PKR)<br>
      • <strong>فائدہ (Pros):</strong> روایتی کوڈنگ سے 10 گنا تیز رفتار AI اسسٹڈ ویب ایپس، کروم ایکسٹینشنز بنانا اور ہائی انکم جابز۔<br>
      • <strong>نہ کرنے کا نقصان (Cons):</strong> سافٹ ویئر انڈسٹری کے بدلتے تقاضوں میں پیچھے رہ جانا۔<br><br>
      
      🎬 <strong>3. اگر آپ سوشل میڈیا، یوٹیوب یا ویڈیوز سے کمانا چاہتے ہیں:</strong><br>
      ➔ تجویز: <strong>AI کنٹینٹ کریایشن</strong> (فیس: 5,999 PKR)<br>
      • <strong>فائدہ (Pros):</strong> کیمرے کے سامنے آئے بغیر فیس لیس ویڈیوز اور وائرل کنٹینٹ سے ارننگ۔<br>
      • <strong>نہ کرنے کا نقصان (Cons):</strong> مہنگے اسٹوڈیوز اور ویڈیو ایڈیٹرز پر ہزاروں روپے ضائع کرنا۔<br><br>
      
      آپ اپنے تعلیمی یا پیشہ ورانہ پس منظر کے بارے میں بتائیں تاکہ میں آپ کے لیے مزید مخصوص مشورہ دے سکوں!`;
    }

    // 2. Fee Details
    if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('فیس') || q.includes('خرچہ')) {
      return `علمِ ٹیک پاکستان کے کورسز کی فیس درج ذیل ہے:<br><br>
      • <strong>AI ٹولز ماسٹری (30 دن، 30 ٹولز):</strong> 2,999 PKR (خصوصی رعایت)<br>
      • <strong>بیسک کمپیوٹر کورس (6 ہفتے):</strong> 3,999 PKR<br>
      • <strong>بیسک AI کورس (4 ہفتے):</strong> 4,999 PKR<br>
      • <strong>AI کنٹینٹ کریایشن (5 ہفتے):</strong> 5,999 PKR<br>
      • <strong>ٹریڈنگ ایجوکیشن کورس (6 ہفتے):</strong> 7,999 PKR<br>
      • <strong>AI سافٹ ویئر ڈویلپمنٹ (8 ہفتے):</strong> 11,999 PKR<br><br>
      تمام کورسز میں آسان اقساط اور لائیو لائف ٹائم LMS ریکارڈنگ کی سہولت دستیاب ہے۔`;
    }

    // 3. Courses List
    if (q.includes('course') || q.includes('class') || q.includes('کورس') || q.includes('سبق')) {
      return `علمِ ٹیک پاکستان کے 6 آفیشل لائیو کورسز کی فہرست:<br><br>
      1. <strong>بیسک AI کورس (4 ہفتے)</strong> — فیس: 4,999 PKR<br>
      2. <strong>AI ٹولز ماسٹری (30 دن، 30 ٹولز)</strong> — رعایتی فیس: 2,999 PKR<br>
      3. <strong>بیسک کمپیوٹر کورس (6 ہفتے)</strong> — فیس: 3,999 PKR<br>
      4. <strong>AI سافٹ ویئر ڈویلپمنٹ (8 ہفتے)</strong> — فیس: 11,999 PKR<br>
      5. <strong>AI کنٹینٹ کریایشن (5 ہفتے)</strong> — فیس: 5,999 PKR<br>
      6. <strong>ٹریڈنگ ایجوکیشن کورس (6 ہفتے)</strong> — فیس: 7,999 PKR<br><br>
      مزید تفصیل کے لیے ہمارے <a href="courses.html" style="color:var(--primary-green); font-weight:700;">کورسز کے صفحہ</a> پر وزٹ کریں۔`;
    }

    // 4. Payment Details
    if (q.includes('pay') || q.includes('jazzcash') || q.includes('easypaisa') || q.includes('sadapay') || q.includes('bank') || q.includes('shahid') || q.includes('ادائیگی') || q.includes('پیسے') || q.includes('اکاؤنٹ')) {
      return `فیس کی آن لائن ادائیگی کی آفیشل تفصیلات:<br><br>
      👤 <strong>اکاؤنٹ ہولڈر:</strong> شاہد اکرم (Shahid Akram)<br>
      📱 <strong>JazzCash / Easypaisa / SadaPay:</strong> <code>03206546008</code><br>
      🏦 <strong>میزان بینک IBAN:</strong> <code>PK36MEZN0001020304050607</code><br><br>
      فیس بھیجنے کے بعد رسید <a href="payments.html" style="color:var(--primary-green); font-weight:700;">آن لائن پیمنٹ پورٹل</a> پر اپلوڈ کریں۔ چند گھنٹوں میں داخلہ کنفرم ہو جائے گا۔`;
    }

    // 5. Admissions
    if (q.includes('admission') || q.includes('apply') || q.includes('داخلہ') || q.includes('رجسٹریشن')) {
      return `آن لائن داخلہ لینے کا طریقہ:<br><br>
      1. ہمارے <a href="admissions.html" style="color:var(--primary-green); font-weight:700;">داخلہ پورٹل</a> پر تشریف لے جائیں اور فارم جمع کریں۔<br>
      2. اکاؤنٹ <code>03206546008</code> پر فیس ادا کریں۔<br>
      3. رسید <a href="payments.html" style="color:var(--primary-green); font-weight:700;">پیمنٹ پیج</a> پر اپلوڈ کریں اور لاگ ان حاصل کریں۔`;
    }

    // 6. Certificate Verification
    if (q.includes('certificate') || q.includes('verify') || q.includes('سرٹیفکیٹ') || q.includes('تصدیق')) {
      return `سرٹیفکیٹ کی تصدیق کے لیے ہمارے <a href="verify-certificate.html" style="color:var(--primary-green); font-weight:700;">سرٹیفکیٹ تصدیقی پورٹل</a> پر جا کر اپنا ویریفیکیشن کوڈ (مثلاً <code>ILM-2026-000101</code>) درج کریں۔`;
    }

    // 7. Contact / Helpline
    if (q.includes('contact') || q.includes('whatsapp') || q.includes('phone') || q.includes('number') || q.includes('رابطہ') || q.includes('نمبر')) {
      return `علمِ ٹیک پاکستان سے رابطہ کرنے کی تفصیلات:<br><br>
      📞 <strong>آفیشل ہیلپ لائن / واٹس ایپ:</strong> <code>0307-4958837</code> (+92 307 4958837)<br>
      📧 <strong>ای میل:</strong> info@ilmetechpakistan.com<br>
      📍 <strong>کیمپس:</strong> لاہور اور اسلام آباد، پاکستان۔`;
    }

    // 8. Founder / CEO
    if (q.includes('shahid') || q.includes('founder') || q.includes('ceo') || q.includes('بانی')) {
      return `علمِ ٹیک پاکستان کے بانی و چیف ایگزیکٹو آفیسر <strong>ڈاکٹر شاہد اکرم مصطفائی (Dr. Shahid Akram Mustafai)</strong> ہیں۔ وہ جدید آرٹیفیشل انٹیلیجنس اور آئی ٹی کے شعبے میں طلباء کی رہنمائی اور بااختیار بنانے کے مشن پر گامزن ہیں۔`;
    }

    // Default Greeting & Counselor Assistance
    return `علمِ ٹیک پاکستان کے مشاورتی پورٹل میں خوش آمدید! میں <strong>ڈاکٹر شاہد اکرم مصطفائی</strong> ہوں۔<br><br>
    آپ مجھ سے اپنے لیے بہترین کورس کے مشورے، کورسز کے فوائد و نقصانات کے موازنے، فیس، داخلے، یا فیس کی ادائیگی (اکاؤنٹ: شاہد اکرم - <code>03206546008</code>) کے بارے میں کچھ بھی تحریری طور پر دریافت کر سکتے ہیں۔`;
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
