/**
 * Ilm E Tech Pakistan AI Chatbot Assistant ("IlmTech AI")
 * Powered by Google Gemini API (/api/chat) & Session Memory
 * Domain: ilmetechpakistan.com
 */

class IlmTechBot {
  constructor() {
    this.isOpen = false;
    this.history = [];
    this.initUI();
  }

  initUI() {
    const chatbotHtml = `
      <div class="chatbot-widget" id="chatbotWidget">
        <button class="chatbot-toggle nasa-float" id="chatbotToggle" aria-label="Open AI Assistant">
          <i class="fas fa-robot"></i>
        </button>
        <div class="chatbot-window nasa-card" id="chatbotWindow">
          <div class="chatbot-header" style="background:var(--dark-green); color:#ffffff; padding:1rem 1.25rem; display:flex; justify-content:space-between; align-items:center;">
            <div class="chatbot-header-info" style="display:flex; align-items:center; gap:0.75rem;">
              <img src="assets/images/logo.jpg" alt="Ilm E Tech Bot" style="width:36px; height:36px; border-radius:50%;">
              <div>
                <strong style="display:block; font-size:0.95rem; color:#ffffff;">IlmTech AI Assistant</strong>
                <span style="font-size:0.75rem; color:#6ee7b7;"><i class="fas fa-circle" style="font-size:0.5rem;"></i> Online | Powered by Gemini</span>
              </div>
            </div>
            <button id="chatbotClose" style="background:none; border:none; color:#ffffff; font-size:1.2rem; cursor:pointer;"><i class="fas fa-times"></i></button>
          </div>
          
          <div class="chatbot-messages" id="chatbotMessages" style="padding:1rem; height:320px; overflow-y:auto; display:flex; flex-direction:column; gap:0.75rem; background:var(--bg-slate-50);">
            <div class="chat-bubble bot" style="background:#ffffff; border:1px solid var(--border-light); padding:0.85rem 1rem; border-radius:0.75rem; font-size:0.9rem; color:var(--text-body); max-width:85%;">
              Welcome to <strong>Ilm E Tech Pakistan</strong>!<br><br>
              How can I help you today? You can ask me about our official AI courses, admission fees, payment methods (Account Holder: Shahid Akram - 03206546008), or certificate verification!
            </div>
          </div>

          <div style="padding:0.5rem 0.75rem; background:#ffffff; border-top:1px solid var(--border-light); display:flex; gap:0.4rem; overflow-x:auto;">
            <button class="btn btn-outline btn-sm quick-prompt" data-prompt="What courses are available?">Courses</button>
            <button class="btn btn-outline btn-sm quick-prompt" data-prompt="Course fees in PKR">Fees</button>
            <button class="btn btn-outline btn-sm quick-prompt" data-prompt="Payment methods for Shahid Akram 03206546008">Payments</button>
            <button class="btn btn-outline btn-sm quick-prompt" data-prompt="How to verify my certificate?">Verification</button>
          </div>

          <form class="chatbot-input-area" id="chatbotForm" style="display:flex; padding:0.75rem; background:#ffffff; border-top:1px solid var(--border-light); gap:0.5rem;">
            <input type="text" id="chatbotInput" class="form-control" placeholder="Ask AI assistant..." required style="font-size:0.9rem;">
            <button type="submit" class="btn btn-primary btn-sm"><i class="fas fa-paper-plane"></i></button>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHtml);
    this.bindEvents();
  }

  bindEvents() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const windowEl = document.getElementById('chatbotWindow');
    const formEl = document.getElementById('chatbotForm');
    const inputEl = document.getElementById('chatbotInput');
    const quickPrompts = document.querySelectorAll('.quick-prompt');

    toggleBtn.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      windowEl.classList.toggle('active', this.isOpen);
    });

    closeBtn.addEventListener('click', () => {
      this.isOpen = false;
      windowEl.classList.remove('active');
    });

    quickPrompts.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-prompt');
        inputEl.value = text;
        this.handleUserSubmit(text);
      });
    });

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputEl.value.trim();
      if (text) {
        this.handleUserSubmit(text);
        inputEl.value = '';
      }
    });
  }

  async handleUserSubmit(query) {
    this.appendMessage(query, 'user');
    this.showTypingIndicator();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: this.history })
      });
      const data = await response.json();
      this.removeTypingIndicator();

      if (data.success && data.reply) {
        this.appendMessage(data.reply, 'bot');
        this.history.push({ role: 'user', text: query });
        this.history.push({ role: 'assistant', text: data.reply });
        return;
      }
    } catch (err) {
      console.log('[IlmTech AI] API fallback chat mode');
    }

    this.removeTypingIndicator();
    const fallbackReply = this.generateFallbackResponse(query);
    this.appendMessage(fallbackReply, 'bot');
  }

  showTypingIndicator() {
    const messagesEl = document.getElementById('chatbotMessages');
    const typing = document.createElement('div');
    typing.id = 'chatTypingIndicator';
    typing.className = 'chat-bubble bot';
    typing.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.6rem 1rem; border-radius:0.75rem; font-size:0.85rem; color:var(--text-muted); max-width:60%;';
    typing.innerHTML = '<i class="fas fa-ellipsis-h fa-spin"></i> AI is thinking...';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  removeTypingIndicator() {
    const typing = document.getElementById('chatTypingIndicator');
    if (typing) typing.remove();
  }

  appendMessage(text, sender) {
    const messagesEl = document.getElementById('chatbotMessages');
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;

    if (sender === 'user') {
      bubble.style.cssText = 'background:var(--primary-green); color:#ffffff; padding:0.75rem 1rem; border-radius:0.75rem; font-size:0.9rem; font-weight:600; align-self:flex-end; max-width:80%;';
    } else {
      bubble.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.85rem 1rem; border-radius:0.75rem; font-size:0.9rem; color:var(--text-body); max-width:85%; align-self:flex-start;';
    }

    bubble.innerHTML = text;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  generateFallbackResponse(input) {
    const q = input.toLowerCase();
    const settings = window.ilmDB ? window.ilmDB.getSettings() : {};
    const courses = window.ilmDB ? window.ilmDB.getCourses() : [];

    if (q.includes('fee') || q.includes('price') || q.includes('cost')) {
      let feeList = courses.map(c => `• <strong>${c.title}</strong>: Rs. ${c.fee.toLocaleString()} PKR`).join('<br>');
      return `Here are our official course fees:<br><br>${feeList}<br><br>Affordable Pakistani pricing with installment plans available!`;
    }

    if (q.includes('course') || q.includes('class')) {
      return `We offer 6 official technology courses:<br>
      1. <strong>Basic AI Course</strong> (Beginner AI & Generative AI)<br>
      2. <strong>AI Tools Mastery</strong> (25+ AI productivity tools)<br>
      3. <strong>Basic Computer Course</strong> (Windows & MS Office)<br>
      4. <strong>AI Software Development</strong> (Web & Mobile with AI)<br>
      5. <strong>AI Content Creation</strong> (Reels, Avatars, Voiceovers)<br>
      6. <strong>Trading Course</strong> (Technical Analysis)<br><br>
      Click <a href="courses.html" style="color:var(--primary-green); font-weight:700;">Explore Courses</a> for full details!`;
    }

    if (q.includes('pay') || q.includes('jazzcash') || q.includes('easypaisa') || q.includes('sadapay') || q.includes('bank') || q.includes('shahid')) {
      return `Pay your fee to Account Holder <strong>Shahid Akram</strong>:<br><br>
      📱 <strong>JazzCash / Easypaisa / SadaPay:</strong> <code>03206546008</code><br>
      🏦 <strong>Meezan Bank IBAN:</strong> <code>PK36MEZN0001020304050607</code><br><br>
      Then submit your receipt on our <a href="payments.html" style="color:var(--primary-green); font-weight:700;">Fee Payment Portal</a>.`;
    }

    if (q.includes('certificate') || q.includes('verify')) {
      return `To verify any official certificate, visit our <a href="verify-certificate.html" style="color:var(--primary-green); font-weight:700;">Certificate Verification Portal</a> and enter the Verification Code (e.g. <code>ILM-2026-000101</code>).`;
    }

    return `Thank you for reaching out to <strong>Ilm E Tech Pakistan</strong>! You can ask me about our courses, fees, admissions, or official payment methods (Account Holder: Shahid Akram - 03206546008).`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ilmChatbot = new IlmTechBot();
});
