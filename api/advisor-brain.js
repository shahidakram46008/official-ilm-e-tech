/**
 * Unified AI Personal Assistant Brain for ILM E TECH PAKISTAN (علمِ ٹیک پاکستان)
 * Voice & Persona: Personal Educational Assistant to Dr. Shahid Akram Mustafai (Founder & CEO)
 * Used seamlessly by both Vercel Serverless Functions (api/chat.js) and Express (api/server.js).
 */

function sanitizeChatText(text, maxLen = 1500) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onerror\s*=/gi, '')
    .replace(/onload\s*=/gi, '')
    .replace(/eval\s*\(/gi, '')
    .trim()
    .slice(0, maxLen);
}

function formatProfileSummary(studentProfile = {}) {
  return [
    studentProfile.fullName ? `نام: ${String(studentProfile.fullName).slice(0, 80)}` : '',
    studentProfile.fatherName ? `والد کا نام: ${String(studentProfile.fatherName).slice(0, 80)}` : '',
    studentProfile.city ? `شہر/علاقہ: ${String(studentProfile.city).slice(0, 80)}` : '',
    studentProfile.profession ? `پیشہ: ${String(studentProfile.profession).slice(0, 80)}` : '',
    studentProfile.age ? `عمر: ${String(studentProfile.age).slice(0, 10)}` : '',
    studentProfile.education ? `تعلیم: ${String(studentProfile.education).slice(0, 80)}` : '',
    studentProfile.experience ? `سابقہ تجربہ: ${String(studentProfile.experience).slice(0, 140)}` : '',
    studentProfile.interest ? `دلچسپی: ${String(studentProfile.interest).slice(0, 140)}` : '',
    studentProfile.courseName ? `منتخب کورس: ${String(studentProfile.courseName).slice(0, 100)}` : '',
    studentProfile.appId ? `ٹوکن نمبر: ${String(studentProfile.appId).slice(0, 40)}` : ''
  ].filter(Boolean).join(' | ');
}

function buildPersonalAssistantPrompt(knowledge = '', studentProfile = {}) {
  const profileSummary = formatProfileSummary(studentProfile);

  return `
آپ **ڈاکٹر شاہد اکرم مصطفائی** (بانی و سی ای او، **علمِ ٹیک پاکستان — ILM E TECH PAKISTAN**) کے ذاتی تعلیمی اسسٹنٹ (Personal Educational Assistant) ہیں۔
آپ کا لہجہ بالکل روبوٹک یا مشینی نہیں ہونا چاہیے؛ آپ کو بالکل ایسے بات کرنی ہے جیسے ڈاکٹر شاہد اکرم مصطفائی صاحب خود یا ان کے ذاتی دفتر کا ایک شفیق، مخلص، بااخلاق اور سمجھدار پاکستانی اسسٹنٹ سامنے بیٹھ کر کسی طالبِ علم یا کاروباری دوست کی رہنمائی کر رہا ہو۔

### 1. شخصیت، لہجہ اور اندازِ گفتگو (Dr. Shahid Akram's Personal Assistant Style):
- نہایت گرمجوش، شائستہ، ہمدرد اور حوصلہ افزا پاکستانی اردو میں گفتگو کریں۔ ("جی محترم دوست"، "پیارے بھائی/بہن"، یا محفوظ نام لے کر "جی علی رضا صاحب!")۔
- روبوٹ کی طرح ہر جواب میں خشک بلٹس نہ پھینکیں؛ قدرتی، رواں اور دل کو چھو لینے والی گفتگو میں مختصر پیراگراف (3 سے 6 صاف سطریں، بغیر لمبے مضمون یا # ہیڈنگ کے) استعمال کریں۔ ضرورت کے وقت مختصر نکات دیں۔
- ڈاکٹر شاہد اکرم مصطفائی صاحب کا ویژن جھلکنا چاہیے: ہمارا مقصد محض کاغذی سرٹیفکیٹ یا بے جان ریکارڈڈ ویڈیوز بیچنا نہیں، بلکہ زوم (Zoom) پر لائیو اسکرین شیئر کر کے عملی ہنر سکھانا ہے تاکہ ہر نوجوان اور کاروباری فرد اپنے پاؤں پر کھڑا ہو سکے ("اب رُکنا نہیں، اب تھمنا نہیں، منزل کو پا کے دم لینا")۔
- اگر صارف نیا یا گھبرایا ہوا ہو ("مجھے کوڈنگ نہیں آتی"، "میں میٹرک پاس ہوں"، "میرے پاس صرف موبائل ہے")، تو اسے فوراً تسلی دیں اور پُراعتماد انداز میں آسان راستہ بتائیں۔

### 2. ویب سائٹ کا مستند ریکارڈ (صرف یہی حقائق حتمی ہیں):
- **ادارہ:** علمِ ٹیک پاکستان (اے آئی اینڈ ڈیجیٹل اسکلز سینٹر) — ویب سائٹ: ilmetechpakistan.com
- **بانی و سی ای او:** ڈاکٹر شاہد اکرم مصطفائی (AI، کمرشل ویڈیو ایڈ میکنگ، ویب ڈویلپمنٹ اور بزنس اسکیلنگ میں 3 سال کا عملی تجربہ، 10 مختلف برانڈز کے ساتھ کامیاب پراجیکٹس، 150+ سرٹیفائیڈ طلبہ)۔
- **ہیڈ آفس:** علمِ ٹیک پاکستان، موڑ کھنڈا، ضلع ننکانہ صاحب، پنجاب، پاکستان۔
- **طریقہ تدریس:** 100% آن لائن لائیو کلاسز بذریعہ زوم (Zoom Live Interactive Classes) — کوئی بے جان ریکارڈڈ پورٹل (LMS) نہیں۔ لائیو کلاس میں پابندیِ وقت ضروری ہے تاکہ سوالات کے فوری جوابات ملیں۔
- **مستند 6 کورسز اور فیسیں:**
  1. بیسک اے آئی کورس (Basic AI Course) — 7 روزہ 100% مفت (Rs. 0 — ChatGPT اور روزمرہ AI ٹولز سے عملی آغاز، نئے طلبہ کے لیے بہترین)
  2. اے آئی ٹولز ماسٹری (30 دن) — Rs. 3,000 (Midjourney، Leonardo، HeyGen، Canva AI سمیت 15+ ٹولز)
  3. اے آئی کنٹینٹ کریشن و ویڈیو ایڈیٹنگ — Rs. 3,500 (اسکرپٹ، AI اوتار، وائس اوور اور کمرشل ویڈیو ایڈز)
  4. اے آئی ویب سائٹ ڈویلپمنٹ (15 دن) — Rs. 5,000 (بغیر مشکل کوڈنگ ای کامرس ویب سائٹس، لینڈنگ پیجز اور سیلز فنلز)
  5. اے آئی سافٹ ویئر انجینئرنگ — Rs. 15,000 (AI ایجنٹس، کسٹم چیٹ بوٹس، آٹومیشن اور APIs انٹیگریشن)
  6. ون آن ون پرسنل مینٹورشپ (VIP) — Rs. 20,000 (ڈاکٹر شاہد اکرم مصطفائی کے ساتھ براہِ راست پرسنل رہنمائی برائے کاروبار و فری لانسنگ)
- **ڈیجیٹل ایجنسی سروسز:** کاروباروں کے لیے کمرشل و ویڈیو ایڈز، ٹارگٹڈ سوشل میڈیا ایڈز (فیس بک/انسٹاگرام)، مکمل سوشل میڈیا مینجمنٹ اور بزنس ویب سائٹس۔
- **آفیشل فیس اکاؤنٹس:** EasyPaisa / JazzCash / SadaPay & NayaPay: 0320-6546008 (ڈاکٹر شاہد اکرم مصطفائی)۔ Meezan Bank IBAN یا فیس اسکرین شاٹ کے لیے واٹس ایپ ہیلپ لائن: 0307-4958837۔
- **سرٹیفکیٹ:** کورس مکمل کرنے پر تصدیق شدہ ڈیجیٹل سرٹیفکیٹ دیا جاتا ہے جو ilmetechpakistan.com/verify-certificate پر آن لائن چیک ہو سکتا ہے۔

${knowledge ? `### 3. ویب سائٹ کے لائیو صفحے سے حاصل شدہ تازہ معلومات:\n${knowledge}\n` : ''}
${profileSummary ? `### 4. موجودہ طالبِ علم کی محفوظ شدہ تفصیلات (ضرور مدِنظر رکھیں):\n${profileSummary}\n` : ''}

### 5. سخت حدود اور ذہانت کے اصول (Strict Guardrails):
- **ویب سائٹ کے دائرے میں رہیں:** آپ کو دنیا جہان کے عمومی سوالات کا بھی ذہانت سے جواب دینا ہے، مگر ہر جواب کا تعلق **علمِ ٹیک پاکستان**، ہمارے کورسز، AI مہارتوں، فری لانسنگ، ڈیجیٹل کاروبار اور ویب سائٹ کی معلومات ہی سے جڑا ہونا چاہیے۔
- **غیر متعلقہ موضوعات پر شائستہ انکار:** اگر کوئی بالکل غیر متعلقہ سوال پوچھے (جیسے کرکٹ اسکور، سیاست، فلمیں، کھانے کی ترکیبیں، طبی نسخے یا دنیا کے بے تکی پہیلیاں)، تو نہایت پیار اور عزت سے کہیں کہ آپ ڈاکٹر شاہد اکرم مصطفائی صاحب کے آفیشل تعلیمی اسسٹنٹ ہیں اور آپ کی ذمہ داری صرف علمِ ٹیک پاکستان کے کورسز، AI ٹریننگ اور ڈیجیٹل اسکلز کے حوالے سے رہنمائی کرنا ہے۔
- اگر کوئی صارف نیا ہو اور کورس پوچھے تو پہلے محبت سے اس کا پسِ منظر (پیشہ، دلچسپی، تعلیم) پوچھ کر بہترین کورس مع وجہ تجویز کریں۔
- کبھی جھوٹی فیس، جعلی کورس (مثلاً ٹریڈنگ)، جھوٹا بینک اکاؤنٹ یا متروک دعوے ہرگز نہ کریں۔ جواب صاف اردو میں ہو اور ضرورت پر انگریزی اصطلاحات درست ہجوں میں لکھیں۔
  `.trim();
}

function buildGeminiContents(history = [], currentMessage = '') {
  const contents = [];
  const cleanHistory = Array.isArray(history) ? history.slice(-10) : [];

  for (const item of cleanHistory) {
    if (!item || !item.text) continue;
    const role = item.role === 'user' ? 'user' : 'model';
    const text = sanitizeChatText(String(item.text), 600);
    if (!text) continue;
    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += '\n' + text;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }

  const safeMsg = sanitizeChatText(currentMessage, 1500);
  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += '\n' + safeMsg;
  } else {
    contents.push({ role: 'user', parts: [{ text: safeMsg }] });
  }

  return contents;
}

function buildLocalAssistantFallback(message, studentProfile = {}) {
  const name = studentProfile.fullName ? String(studentProfile.fullName).trim() : '';
  const greet = name ? `جی محترم ${name} صاحب` : 'السلام علیکم محترم دوست';
  const q = message.toLowerCase();

  if (/(موبائل|لیپ ٹاپ|کمپیوٹر|laptop|mobile|phone|pc)/.test(q)) {
    return `${greet}! آپ بالکل فکر نہ کریں۔ 7 روزہ مفت بیسک AI کورس اور کنٹینٹ کریشن کے ابتدائی پریکٹیکلز آپ اپنے موبائل سے بھی باآسانی شروع کر سکتے ہیں، جبکہ ویب سائٹ ڈویلپمنٹ اور سافٹ ویئر انجینئرنگ کے لیے لیپ ٹاپ یا کمپیوٹر زیادہ مددگار رہتا ہے۔ ڈاکٹر شاہد اکرم صاحب زوم لائیو کلاس میں ہر قدم پر خود ساتھ لے کر چلتے ہیں۔ بتائیے آپ کس کورس سے آغاز کرنا پسند کریں گے؟`;
  }

  if (/(کما|پیسے|کمائی|ارننگ|فری لانس|earn|freelance|income|rozgar|نوکری|job)/.test(q)) {
    return `${greet}! ڈاکٹر شاہد اکرم مصطفائی صاحب کا پورا وژن یہی ہے کہ آپ صرف تھیوری نہ پڑھیں بلکہ عملی ہنر سیکھ کر کمانے کے قابل بنیں۔ مثال کے طور پر کمرشل ویڈیو ایڈز (Rs. 3,500) یا AI ویب سائٹ ڈویلپمنٹ (Rs. 5,000) سیکھ کر آپ لوکل کاروباروں اور انٹرنیشنل کلائنٹس کے لیے پراجیکٹس کر سکتے ہیں — اور اگر آپ بالکل نئے ہیں تو ہمارے 7 روزہ 100% مفت Basic AI کورس سے بے فکر ہو کر آغاز کریں!`;
  }

  if (/(وقت|ٹائم|ٹائمنگ|شیڈول|کب|time|timing|schedule|recording|ریکارڈ)/.test(q)) {
    return `${greet}! علمِ ٹیک پاکستان میں تمام کلاسز زوم (Zoom) پر 100% لائیو منعقد ہوتی ہیں اور ہمارا کوئی بے جان ریکارڈڈ پورٹل (LMS) نہیں ہے تاکہ ہر طالب علم براہِ راست سوالات پوچھ سکے۔ داخلہ فارم جمع کروانے کے بعد واٹس ایپ (0307-4958837) پر آپ کو لائیو بیچ کا مقررہ وقت اور زوم لنک فراہم کر دیا جاتا ہے۔`;
  }

  if (/(فیس|کتنی|cost|price|fee)/.test(q)) {
    return `${greet}! ہماری فیسیں ہر طالبِ علم کی آسانی کو مدِنظر رکھ کر رکھی گئی ہیں:\n` +
      `• 7 روزہ بیسک AI کورس: 100% مفت (Rs. 0)\n` +
      `• AI ٹولز ماسٹری (30 دن): Rs. 3,000\n` +
      `• AI کنٹینٹ کریشن و ویڈیو ایڈیٹنگ: Rs. 3,500\n` +
      `• AI ویب سائٹ ڈویلپمنٹ (15 دن): Rs. 5,000\n` +
      `• AI سافٹ ویئر انجینئرنگ: Rs. 15,000\n` +
      `• ون آن ون VIP مینٹورشپ: Rs. 20,000\n\n` +
      `اگر آپ چاہیں تو نیچے "نیا ہوں — بہترین کورس تجویز کریں" بٹن دبائیں، میں آپ کے شوق کے مطابق بہترین انتخاب بتا دوں گا۔`;
  }

  if (/(pay|jazzcash|easypaisa|sadapay|اکاؤنٹ|فیس جمع|بینک|meezan)/.test(q)) {
    return `${greet}! فیس جمع کروانے کے لیے صرف ہمارا آفیشل نمبر 0320-6546008 (EasyPaisa / JazzCash / SadaPay & NayaPay — ڈاکٹر شاہد اکرم مصطفائی) استعمال فرمائیں۔ اگر آپ کو Meezan Bank کا IBAN درکار ہو یا فیس جمع کروانے کے بعد رسید بھیجنی ہو، تو براہِ راست واٹس ایپ 0307-4958837 پر اسکرین شاٹ ارسال کر دیں۔`;
  }

  if (/(ceo|shahid|ڈاکٹر|شاہد|بانی|فاؤنڈر|ہیڈ آفس|پتہ|کہاں)/.test(q)) {
    return `${greet}! علمِ ٹیک پاکستان کے بانی و سی ای او ڈاکٹر شاہد اکرم مصطفائی ہیں، جو پچھلے 3 سال سے AI، کمرشل ویڈیو ایڈز، ویب ڈویلپمنٹ اور بزنس اسکیلنگ میں 10 مختلف برانڈز کے ساتھ عملی کام کر چکے ہیں اور 150+ طلبہ کو سرٹیفائیڈ تربیت دے چکے ہیں۔ ہمارا ہیڈ آفس موڑ کھنڈا، ضلع ننکانہ صاحب، پنجاب میں واقع ہے جبکہ کلاسز زوم پر دنیا بھر کے لیے 100% آن لائن لائیو ہوتی ہیں۔`;
  }

  if (/(سروس|ایجنسی|بزنس|کاروبار|کمرشل|اشتہار|ایڈ|agency)/.test(q)) {
    return `${greet}! علمِ ٹیک پاکستان کی ڈیجیٹل ایجنسی کاروباروں کے لیے AI کمرشل ویڈیو ایڈز، فیس بک و انسٹاگرام ٹارگٹڈ اشتہارات، مکمل سوشل میڈیا مینجمنٹ اور جدید ویب سائٹس تیار کرتی ہے۔ اپنے کاروبار کی گروتھ کے لیے واٹس ایپ 0307-4958837 پر براہِ راست ڈاکٹر شاہد اکرم صاحب سے مشورہ کریں۔`;
  }

  if (/(سیاست|کرکٹ|موسم|فلم|گانا|ریسیپی|cricket|politics|weather|song|movie|recipe)/.test(q)) {
    return `${greet}! میں ڈاکٹر شاہد اکرم مصطفائی صاحب کا آفیشل تعلیمی اسسٹنٹ ہوں اور میری تمام رہنمائی علمِ ٹیک پاکستان کے کورسز، زوم لائیو ٹریننگ، داخلے اور ڈیجیٹل اسکلز کے دائرے تک محدود ہے۔ بتائیے آپ کس ہنر یا کورس کے بارے میں جاننا چاہیں گے؟`;
  }

  return `${greet}! میں ڈاکٹر شاہد اکرم مصطفائی صاحب کا پرسنل ایجوکیشنل اسسٹنٹ ہوں۔ آپ مجھ سے علمِ ٹیک پاکستان کے کسی بھی کورس (بشمول 7 روزہ 100% مفت Basic AI کورس)، زوم لائیو کلاسز کے طریقہ کار، فیس اکاؤنٹس، یا ڈیجیٹل اسکلز کے ذریعے کمائی و کاروباری سروسز کے بارے میں دل کھول کر پوچھ سکتے ہیں۔ آپ ابھی کیا سیکھنا چاہ رہے ہیں؟`;
}

async function generateAdvisorReply({ message, history = [], knowledge = '', studentProfile = {} }) {
  const cleanMessage = sanitizeChatText(message, 1500);
  const cleanKnowledge = sanitizeChatText(knowledge, 3500);
  const systemPrompt = buildPersonalAssistantPrompt(cleanKnowledge, studentProfile);
  const fetchFn = typeof fetch !== 'undefined' ? fetch : (await import('node-fetch')).default;

  const geminiApiKey = process.env.GEMINI_API_KEY || '';
  if (geminiApiKey) {
    // Prioritize low-latency Flash Lite first so Vercel serverless responds in ~1.5-3s without hitting invocation timeout
    const geminiModels = ['gemini-3.1-flash-lite-preview', 'gemini-3-flash-preview', 'gemini-flash-latest'];
    const contents = buildGeminiContents(history, cleanMessage);

    for (const model of geminiModels) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
        const geminiRes = await fetchFn(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents,
            generationConfig: {
              temperature: 0.65,
              topP: 0.9,
              maxOutputTokens: 1200
            }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim()) {
            return {
              success: true,
              reply: reply.trim(),
              source: `gemini-${model}`,
              geminiActive: true
            };
          }
        }
      } catch (err) {
        console.warn(`[Gemini API ${model} Error]:`, err.message);
      } finally {
        clearTimeout(timeoutId);
      }
    }
  }

  if (process.env.GROQ_API_KEY) {
    const groqModels = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
    for (const model of groqModels) {
      try {
        const groqRes = await fetchFn('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            max_tokens: 550,
            messages: [
              { role: 'system', content: systemPrompt },
              ...(Array.isArray(history) ? history.slice(-8) : []).map(h => ({
                role: h.role === 'user' ? 'user' : 'assistant',
                content: sanitizeChatText(String(h.text || ''), 450)
              })),
              { role: 'user', content: cleanMessage }
            ],
            temperature: 0.6
          })
        });
        const groqData = await groqRes.json();
        const reply = groqData.choices?.[0]?.message?.content;
        if (reply && reply.trim()) {
          return {
            success: true,
            reply: reply.trim(),
            source: `groq-${model}`,
            geminiActive: false
          };
        }
      } catch (err) {
        console.warn(`[Groq API Model ${model} Warning]:`, err.message);
      }
    }
  }

  return {
    success: true,
    reply: buildLocalAssistantFallback(cleanMessage, studentProfile),
    source: 'truthful-local-advisor',
    geminiActive: false
  };
}

module.exports = {
  sanitizeChatText,
  generateAdvisorReply
};

