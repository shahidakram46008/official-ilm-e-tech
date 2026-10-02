/**
 * Enterprise Production-Grade AI Assistant & 2-Way Voice Call Engine ("شاہد - Shahid AI")
 * Engineered by Senior Full-Stack AI Engineers for Ilm E Tech Pakistan (ilmetechpakistan.com)
 * Founder & CEO: Dr. Shahid Akram Mustafai
 * Features: Complete A-Z Urdu Voice Playback (No Truncation), Custom Founder Greeting, Garbage-Collector Protected Speech Engine.
 */

class IlmTechBot {
  constructor() {
    this.isOpen = false;
    this.history = [];
    this.isAudioEnabled = true;
    this.hasWelcomed = false;

    // Live Voice Call & Mic Permission State Machine
    this.isCallActive = false;
    this.isMuted = false;
    this.isAiSpeaking = false;
    this.callTimerInterval = null;
    this.callSeconds = 0;
    this.recognition = null;
    this.currentAudioPlayer = null;
    this.speakingSafetyTimeout = null;

    // Session Mic Permission Cache
    this.micPermissionRequested = false;
    this.isMicPermissionGranted = null;
    this.activeStream = null;

    try {
      this.initFloatingStack();
      this.initSpeechEngine();
    } catch (err) {
      console.warn('[IlmTech AI] Engine initialized with fallback mode:', err);
    }
  }

  async requestMicPermissionOnce() {
    if (this.isMicPermissionGranted === true) return true;
    if (this.micPermissionRequested && this.isMicPermissionGranted === false) return false;

    this.micPermissionRequested = true;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.isMicPermissionGranted = true;
        this.activeStream = stream;
        return true;
      } catch (err) {
        console.warn('[Microphone Permission Denied]:', err);
        this.isMicPermissionGranted = false;
        return false;
      }
    }
    return false;
  }

  initSpeechEngine() {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          this.voices = window.speechSynthesis.getVoices();
        } catch (e) {}
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'ur-PK';

        this.recognition.onstart = () => {
          if (this.isCallActive && !this.isAiSpeaking) {
            this.updateCallStatus('🎙️ آپ بولیں، شاہد سن رہا ہے...', '#10b981', true);
          }
        };

        this.recognition.onresult = (event) => {
          let transcript = '';
          let isFinal = false;
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
            if (event.results[i].isFinal) isFinal = true;
          }

          if (transcript.trim()) {
            this.updateCallTranscript(`<strong>آپ:</strong> "${transcript}"`);
          }

          if (isFinal && transcript.trim()) {
            this.handleVoiceCallInput(transcript.trim());
          }
        };

        this.recognition.onerror = (event) => {
          console.warn('[STT Error]:', event.error);
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            this.isMicPermissionGranted = false;
            this.updateCallStatus('⚠️ براؤزر میں مائیک کی اجازت دیں (Allow Mic)', '#ef4444', false);
            return;
          }
          if (this.isCallActive && !this.isAiSpeaking && event.error !== 'aborted') {
            const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (isSecure) {
              setTimeout(() => this.listenForUserVoice(), 1500);
            } else {
              this.updateCallStatus('🎙️ بولنے کے لیے "ٹیپ کریں" بٹن دبا ئیں', '#10b981', false);
            }
          }
        };

        this.recognition.onend = () => {
          if (this.isCallActive && !this.isAiSpeaking && !this.isMuted && this.isMicPermissionGranted !== false) {
            const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            if (isSecure) {
              setTimeout(() => this.listenForUserVoice(), 600);
            } else {
              this.updateCallStatus('🎙️ بولنے کے لیے "ٹیپ کریں" بٹن دبا ئیں', '#10b981', false);
            }
          }
        };
      } catch (e) {
        console.warn('[STT Init Exception]:', e);
      }
    }
  }

  initFloatingStack() {
    const existingStack = document.getElementById('ilmTechFloatingStack');
    if (existingStack) existingStack.remove();
    const existingWindow = document.getElementById('chatbotWindow');
    if (existingWindow) existingWindow.remove();

    const officialGreeting = "السلام علیکم! علم ٹیک پاکستان کی جانب سے ڈاکٹر شاہد اکرم مصطفائی بات کر رہا ہوں۔ فرمائیں، میں آپ کی کیا مدد کر سکتا ہوں؟";

    const stackHtml = `
      <!-- Fixed Floating Stack Container (Bottom-Right Corner) -->
      <div id="ilmTechFloatingStack">
        <button class="chatbot-toggle nasa-float" id="chatbotToggle" onclick="window.ilmChatbot ? window.ilmChatbot.toggleWindow() : null" aria-label="Open AI Assistant Shahid" title="شاہد AI - کال یا چیٹ کریں">
          <i class="fas fa-robot" style="pointer-events:none;"></i>
          <span class="pulse-call-ring" style="pointer-events:none;"></span>
        </button>

        <a href="https://wa.me/923074958837" target="_blank" class="whatsapp-toggle nasa-float" aria-label="WhatsApp Support" title="WhatsApp Helpline 0307-4958837">
          <i class="fab fa-whatsapp" style="pointer-events:none;"></i>
        </a>
      </div>

      <!-- AI Chatbot Window -->
      <div class="chatbot-window" id="chatbotWindow" role="dialog" aria-label="IlmTech AI Assistant Window">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-header-info">
            <img src="assets/images/logo.jpg" alt="Shahid AI Logo">
            <div>
              <strong style="display:block; font-size:0.95rem; color:#ffffff; font-weight:700;">ڈاکٹر شاہد اکرم مصطفائی (AI)</strong>
              <span style="font-size:0.75rem; color:#6ee7b7;"><i class="fas fa-circle" style="font-size:0.5rem; color:#10b981;"></i> Online | 2-Way وائس کال</span>
            </div>
          </div>
          
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <button id="headerCallBtn" onclick="window.ilmChatbot.startVoiceCall()" class="btn btn-sm" style="background:#10b981; color:#ffffff; font-weight:700; border:none; border-radius:0.4rem; padding:0.35rem 0.65rem; font-size:0.8rem; display:flex; align-items:center; gap:0.3rem; cursor:pointer;" title="لائیو فون کال کریں">
              <i class="fas fa-phone-alt"></i> <span>کال کریں</span>
            </button>
            <button id="chatbotAudioToggle" title="آواز On/Off" style="background:rgba(255,255,255,0.18); border:1px solid rgba(255,255,255,0.3); color:#ffffff; font-size:0.8rem; padding:0.35rem 0.55rem; border-radius:0.4rem; cursor:pointer;">
              <i class="fas fa-volume-up" id="audioToggleIcon"></i>
            </button>
            <button id="chatbotClose" onclick="window.ilmChatbot.toggleWindow(false)" style="background:none; border:none; color:#ffffff; font-size:1.2rem; cursor:pointer; padding:0.2rem;" title="بند کریں (Close/Return)"><i class="fas fa-times"></i></button>
          </div>
        </div>

        <!-- Voice Call Screen Overlay (Hidden by Default) -->
        <div class="call-screen-overlay" id="callScreenOverlay" style="display:none;">
          <div style="text-align:center; width:100%;">
            <div class="call-avatar-container">
              <div class="call-waves" id="callWavesAnim"></div>
              <img src="assets/images/logo.jpg" alt="Shahid Voice AI" class="call-avatar-img">
            </div>
            <h3 style="color:#ffffff; font-size:1.15rem; font-weight:800; margin:0.75rem 0 0.2rem;">ڈاکٹر شاہد اکرم مصطفائی (AI)</h3>
            <div style="font-size:0.85rem; color:#6ee7b7; font-weight:600;" id="callTimerDisplay">🔴 00:00 | لائیو وائس کال جاری ہے</div>
            
            <div class="call-status-badge" id="callStatusBadge">
              <i class="fas fa-microphone" id="callStatusIcon" style="color:#10b981;"></i>
              <span id="callStatusText">کال شروع کی جا رہی ہے...</span>
            </div>
          </div>

          <div class="call-transcript-box" id="callTranscriptBox">
            <span style="color:#cbd5e1; font-style:italic;">مائیک میں بولنا شروع کریں، شاہد آپ کی بات سن کر مکمل جواب دے گا...</span>
          </div>

          <!-- Manual Tap to Speak Button in Call Mode -->
          <div style="margin-bottom:0.75rem; text-align:center;">
            <button id="callTapToSpeakBtn" onclick="window.ilmChatbot.listenForUserVoice()" style="background:linear-gradient(135deg, #10b981 0%, #046a38 100%); border:1px solid #6ee7b7; color:#ffffff; font-size:0.9rem; padding:0.55rem 1.35rem; border-radius:2rem; cursor:pointer; font-weight:700; box-shadow:0 6px 15px rgba(16,185,129,0.4);">
              🎙️ بولنے کے لیے ٹیپ کریں (Tap to Speak)
            </button>
          </div>

          <div class="call-controls-bar">
            <button class="call-btn call-btn-mute" id="callMuteBtn" title="مائیک میوٹ کریں">
              <i class="fas fa-microphone" id="callMuteIcon"></i>
            </button>
            <button class="call-btn call-btn-end" id="callEndBtn" onclick="window.ilmChatbot.endVoiceCall()" title="کال ختم کریں اور واپس جائیں">
              <i class="fas fa-phone-slash"></i>
            </button>
            <button class="call-btn call-btn-chat" id="callSwitchChatBtn" onclick="window.ilmChatbot.endVoiceCall()" title="ٹیکسٹ چیٹ میں جائیں">
              <i class="fas fa-comment-alt"></i>
            </button>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div class="chatbot-messages" id="chatbotMessages">
          <!-- Call Banner -->
          <div style="background:linear-gradient(135deg, #046a38 0%, #022c22 100%); color:#ffffff; padding:0.85rem; border-radius:0.75rem; display:flex; justify-content:space-between; align-items:center; border:1px solid #10b981; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <div>
              <strong style="display:block; font-size:0.92rem; color:#6ee7b7;"><i class="fas fa-headset"></i> AI 2-Way Voice Call</strong>
              <span style="font-size:0.78rem; opacity:0.9;">ڈاکٹر شاہد اکرم سے فون کال کی طرح بول کر بات کریں</span>
            </div>
            <button id="bannerStartCallBtn" onclick="window.ilmChatbot.startVoiceCall()" class="btn btn-primary btn-sm" style="background:#10b981; border:none; font-weight:700; white-space:nowrap; padding:0.45rem 0.8rem; font-size:0.82rem; cursor:pointer;">
              <i class="fas fa-phone-alt"></i> کال شروع کریں
            </button>
          </div>

          <div class="chat-bubble bot">
            السلام علیکم! 🌸<br><br>
            <strong>علم ٹیک پاکستان</strong> کی جانب سے <strong>ڈاکٹر شاہد اکرم مصطفائی</strong> بات کر رہا ہوں۔ فرمائیں، میں آپ کی کیا مدد کر سکتا ہوں؟<br><br>
            آپ اوپر <strong>"کال شروع کریں"</strong> بٹن دبا کر مجھ سے لائیو فون کال پر بول کر بات کر سکتے ہیں، یا نیچے میسج ٹائپ کر سکتے ہیں!
            <br>
            <button class="speak-bubble-btn" title="آواز سنیں" onclick="window.ilmChatbot.speakUrdu('${officialGreeting}')">
              <i class="fas fa-volume-up"></i>
            </button>
          </div>
        </div>

        <!-- Quick Prompts -->
        <div style="padding:0.5rem 0.75rem; background:#ffffff; border-top:1px solid var(--border-light); display:flex; gap:0.4rem; overflow-x:auto; white-space:nowrap;">
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="کورسز کی تفصیلی معلومات دیں">کورسز کی تفصیلات</button>
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="کورسز کی فیس کتنی ہے؟">فیس کی معلومات</button>
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="شاہد اکرم کا اکاؤنٹ نمبر 03206546008 اور ادائیگی کا طریقہ">ادائیگی (03206546008)</button>
          <button class="btn btn-outline btn-sm quick-prompt" data-prompt="سرٹیفکیٹ کی تصدیق کیسے کریں؟">سرٹیفکیٹ تصدیق</button>
        </div>

        <!-- Input Area -->
        <form class="chatbot-input-area" id="chatbotForm">
          <input type="text" id="chatbotInput" class="form-control" placeholder="اردو یا انگلش میں سوال ٹائپ کریں..." required style="font-size:0.9rem;">
          <button type="button" id="micInputBtn" class="btn btn-outline btn-sm" title="بول کر لکھیں" style="color:#046a38; border-color:#cbd5e1; padding:0.4rem 0.6rem;">
            <i class="fas fa-microphone"></i>
          </button>
          <button type="submit" class="btn btn-primary btn-sm" title="بھیجیں" style="padding:0.4rem 0.8rem;"><i class="fas fa-paper-plane"></i></button>
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

      if (!this.hasWelcomed) {
        this.hasWelcomed = true;
        const officialGreeting = "السلام علیکم! علم ٹیک پاکستان کی جانب سے ڈاکٹر شاہد اکرم مصطفائی بات کر رہا ہوں۔ فرمائیں، میں آپ کی کیا مدد کر سکتا ہوں؟";
        this.speakUrdu(officialGreeting);
      }
    } else {
      windowEl.style.opacity = '0';
      windowEl.style.visibility = 'hidden';
      windowEl.style.pointerEvents = 'none';
      windowEl.classList.remove('active');
      setTimeout(() => {
        if (!this.isOpen && windowEl) windowEl.style.display = 'none';
      }, 300);
      this.endVoiceCall();
      this.stopSpeech();
    }
  }

  bindEvents() {
    const formEl = document.getElementById('chatbotForm');
    const inputEl = document.getElementById('chatbotInput');
    const quickPrompts = document.querySelectorAll('.quick-prompt');
    const audioToggleBtn = document.getElementById('chatbotAudioToggle');
    const callMuteBtn = document.getElementById('callMuteBtn');
    const micInputBtn = document.getElementById('micInputBtn');

    if (audioToggleBtn) {
      audioToggleBtn.onclick = (e) => {
        if (e) e.preventDefault();
        this.isAudioEnabled = !this.isAudioEnabled;
        const icon = document.getElementById('audioToggleIcon');
        if (this.isAudioEnabled) {
          if (icon) icon.className = 'fas fa-volume-up';
          audioToggleBtn.style.background = 'rgba(255,255,255,0.2)';
        } else {
          if (icon) icon.className = 'fas fa-volume-mute';
          audioToggleBtn.style.background = 'rgba(239,68,68,0.4)';
          this.stopSpeech();
        }
      };
    }

    if (callMuteBtn) {
      callMuteBtn.onclick = () => {
        this.isMuted = !this.isMuted;
        const icon = document.getElementById('callMuteIcon');
        if (this.isMuted) {
          if (icon) icon.className = 'fas fa-microphone-slash';
          callMuteBtn.style.background = '#ef4444';
          this.updateCallStatus('🔇 مائیک میوٹ ہے', '#f59e0b', false);
          if (this.recognition) try { this.recognition.stop(); } catch(e){}
        } else {
          if (icon) icon.className = 'fas fa-microphone';
          callMuteBtn.style.background = 'rgba(255,255,255,0.2)';
          this.listenForUserVoice();
        }
      };
    }

    if (micInputBtn) {
      micInputBtn.onclick = () => this.startSingleSpeechRecognition();
    }

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

  // ==========================================
  // LIVE 2-WAY VOICE CALL LOGIC
  // ==========================================
  async startVoiceCall() {
    this.isCallActive = true;
    this.isMuted = false;
    this.isAiSpeaking = false;
    this.callSeconds = 0;

    const overlay = document.getElementById('callScreenOverlay');
    if (overlay) overlay.style.display = 'flex';

    await this.requestMicPermissionOnce();

    // Start Call Timer
    clearInterval(this.callTimerInterval);
    this.callTimerInterval = setInterval(() => {
      this.callSeconds++;
      const mins = String(Math.floor(this.callSeconds / 60)).padStart(2, '0');
      const secs = String(this.callSeconds % 60).padStart(2, '0');
      const timerDisplay = document.getElementById('callTimerDisplay');
      if (timerDisplay) timerDisplay.innerHTML = `🔴 ${mins}:${secs} | لائیو وائس کال جاری ہے`;
    }, 1000);

    const greetingText = "السلام علیکم! علم ٹیک پاکستان کی جانب سے ڈاکٹر شاہد اکرم مصطفائی بات کر رہا ہوں۔ فرمائیں، میں آپ کی کیا مدد کر سکتا ہوں؟";
    this.updateCallTranscript(`<strong>ڈاکٹر شاہد:</strong> "${greetingText}"`);

    // Speak Initial Call Greeting
    this.speakUrduCall(greetingText, () => {
      const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isSecure) {
        this.listenForUserVoice();
      } else {
        this.updateCallStatus('🎙️ بولنے کے لیے "ٹیپ کریں" بٹن دبا ئیں', '#10b981', false);
      }
    });
  }

  endVoiceCall() {
    this.isCallActive = false;
    this.isAiSpeaking = false;
    clearInterval(this.callTimerInterval);
    clearTimeout(this.speakingSafetyTimeout);

    const overlay = document.getElementById('callScreenOverlay');
    if (overlay) overlay.style.display = 'none';

    if (this.recognition) {
      try { this.recognition.stop(); } catch(e){}
    }
    this.stopSpeech();
  }

  async listenForUserVoice() {
    if (!this.isCallActive || this.isMuted || this.isAiSpeaking) return;

    if (this.isMicPermissionGranted === false) {
      this.updateCallStatus('⚠️ مائیک کی اجازت درکار ہے (Allow Mic)', '#ef4444', false);
      return;
    }

    this.updateCallStatus('🎙️ آپ بولیں، شاہد سن رہا ہے...', '#10b981', true);

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        // Recognition already active
      }
    } else {
      this.updateCallStatus('⚠️ مائیک ریکگنیشن فعال نہیں، بٹن دبائیں', '#f59e0b', false);
    }
  }

  async handleVoiceCallInput(spokenText) {
    if (!spokenText || !spokenText.trim()) return;

    if (this.recognition) {
      try { this.recognition.stop(); } catch(e){}
    }

    this.updateCallStatus('🧠 شاہد سوچ رہا ہے...', '#60a5fa', false);

    let replyText = '';

    try {
      if (window.location.protocol !== 'file:') {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: spokenText, history: this.history })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.reply) {
            replyText = data.reply;
            this.history.push({ role: 'user', text: spokenText });
            this.history.push({ role: 'assistant', text: replyText });
          }
        }
      }
    } catch (err) {
      console.log('[IlmTech AI Call] API fallback engine active');
    }

    if (!replyText) {
      replyText = this.generateFallbackResponse(spokenText);
    }

    this.appendMessage(spokenText, 'user');
    this.appendMessage(replyText, 'bot');

    const cleanTranscript = this.formatSpokenTextUrdu(replyText);
    this.updateCallTranscript(`<strong>ڈاکٹر شاہد:</strong> "${cleanTranscript}"`);

    // Speak AI Reply Out Loud (Full A-Z)
    this.speakUrduCall(replyText, () => {
      if (this.isCallActive) {
        const isSecure = window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isSecure) {
          this.listenForUserVoice();
        } else {
          this.updateCallStatus('🎙️ بولنے کے لیے "ٹیپ کریں" بٹن دبا ئیں', '#10b981', false);
        }
      }
    });
  }

  async speakUrduCall(rawText, onEndCallback) {
    this.isAiSpeaking = true;
    this.updateCallStatus('🔊 ڈاکٹر شاہد بول رہا ہے...', '#38bdf8', false);
    this.stopSpeech();

    // 1. Attempt ElevenLabs Studio AI Voice via /api/tts
    try {
      if (window.location.protocol !== 'file:') {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: rawText })
        });

        if (response.ok && response.headers.get('content-type')?.includes('audio')) {
          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);
          this.currentAudioPlayer = audio;

          audio.onended = () => {
            this.isAiSpeaking = false;
            if (onEndCallback) onEndCallback();
          };
          audio.onerror = () => {
            this.fallbackBrowserSpeechCall(rawText, onEndCallback);
          };

          await audio.play();
          return;
        }
      }
    } catch (e) {
      console.log('[ElevenLabs Stream Fallback]: Switching to browser Urdu voice engine');
    }

    // 2. Fallback to Browser SpeechSynthesis Engine
    this.fallbackBrowserSpeechCall(rawText, onEndCallback);
  }

  fallbackBrowserSpeechCall(rawText, onEndCallback) {
    if (!('speechSynthesis' in window)) {
      this.isAiSpeaking = false;
      if (onEndCallback) onEndCallback();
      return;
    }

    const cleanText = this.formatSpokenTextUrdu(rawText);

    // Cancel and Resume SpeechSynthesis to unblock Chrome Speech Queue
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    } catch (e) {}

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const urduVoice = voices.find(v => v.lang.startsWith('ur') || v.lang.includes('PK') || v.name.toLowerCase().includes('urdu'));
    if (urduVoice) {
      utterance.voice = urduVoice;
      utterance.lang = urduVoice.lang;
    } else {
      utterance.lang = 'ur-PK';
    }

    let hasHandledEnd = false;
    const handleSpeechDone = () => {
      if (hasHandledEnd) return;
      hasHandledEnd = true;
      clearTimeout(this.speakingSafetyTimeout);
      this.isAiSpeaking = false;
      if (onEndCallback) onEndCallback();
    };

    utterance.onend = handleSpeechDone;
    utterance.onerror = handleSpeechDone;

    // Safety timeout based on clean text length
    const estimatedSpeechMs = (cleanText.length * 120) + 2000;
    this.speakingSafetyTimeout = setTimeout(handleSpeechDone, estimatedSpeechMs);

    // Store utterance on global window to prevent Chrome V8 Garbage Collector deletion!
    window.ilmCurrentUtterance = utterance;
    this.currentUtterance = utterance;

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      handleSpeechDone();
    }
  }

  formatSpokenTextUrdu(rawText) {
    if (!rawText) return '';

    return rawText
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`/g, '')
      .replace(/#/g, '')
      .replace(/•/g, ' ')
      .replace(/علم\s*اینڈ\s*ٹیک/gi, 'علم ٹیک')
      .replace(/03206546008/g, 'صفر تین سو بیس، چھپن، چھیالیس، زیرو زیرو آٹھ')
      .replace(/0307-4958837/g, 'صفر تین سو سات، انچاس، اٹھاون، آٹھ سو سینتیس')
      .replace(/PK36MEZN0001020304050607/g, 'میزان بینک اکاؤنٹ')
      .replace(/3,999/g, 'تین ہزار نو سو ننانوے')
      .replace(/14,999/g, 'چودہ ہزار نو سو ننانوے')
      .replace(/PKR/gi, 'روپے')
      .replace(/Rs\./gi, 'روپے')
      .replace(/\s+/g, ' ')
      .trim();
  }

  updateCallStatus(text, color = '#10b981', spinIcon = false) {
    const badge = document.getElementById('callStatusBadge');
    const statusText = document.getElementById('callStatusText');
    const icon = document.getElementById('callStatusIcon');

    if (statusText) statusText.textContent = text;
    if (badge) badge.style.borderColor = color;
    if (icon) {
      icon.style.color = color;
      icon.className = spinIcon ? 'fas fa-microphone fa-spin' : 'fas fa-microphone';
    }
  }

  updateCallTranscript(htmlText) {
    const box = document.getElementById('callTranscriptBox');
    if (box) {
      box.innerHTML = htmlText;
      box.scrollTop = box.scrollHeight;
    }
  }

  async startSingleSpeechRecognition() {
    await this.requestMicPermissionOnce();
    if (!this.recognition) {
      alert('آپ کے براؤزر میں مائیک ریکگنیشن کی اجازت یا سہولت دستیاب نہیں۔');
      return;
    }
    const inputEl = document.getElementById('chatbotInput');
    const micBtn = document.getElementById('micInputBtn');
    if (micBtn) micBtn.style.color = '#ef4444';

    this.recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      if (inputEl) inputEl.value = text;
      if (micBtn) micBtn.style.color = '#046a38';
    };

    try {
      this.recognition.start();
    } catch (e) {}
  }

  async handleUserSubmit(query) {
    this.appendMessage(query, 'user');
    this.showTypingIndicator();

    let replyText = '';

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
            replyText = data.reply;
            this.history.push({ role: 'user', text: query });
            this.history.push({ role: 'assistant', text: replyText });
          }
        }
      }
    } catch (err) {
      console.log('[IlmTech AI] Fallback chat active');
    }

    this.removeTypingIndicator();

    if (!replyText) {
      replyText = this.generateFallbackResponse(query);
    }

    this.appendMessage(replyText, 'bot');

    if (this.isAudioEnabled && !this.isCallActive) {
      this.speakUrdu(replyText);
    }
  }

  showTypingIndicator() {
    this.removeTypingIndicator();
    const messagesEl = document.getElementById('chatbotMessages');
    if (!messagesEl) return;
    const typing = document.createElement('div');
    typing.id = 'chatTypingIndicator';
    typing.className = 'chat-bubble bot';
    typing.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.6rem 1rem; border-radius:0.75rem; font-size:0.85rem; color:var(--text-muted); max-width:60%; align-self:flex-start;';
    typing.innerHTML = '<i class="fas fa-ellipsis-h fa-spin"></i> ڈاکٹر شاہد جواب تیار کر رہا ہے...';
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
      bubble.style.cssText = 'background:var(--primary-green); color:#ffffff; padding:0.75rem 1rem; border-radius:0.75rem; font-size:0.9rem; font-weight:600; align-self:flex-end; max-width:80%;';
      bubble.innerHTML = text;
    } else {
      bubble.style.cssText = 'background:#ffffff; border:1px solid var(--border-light); padding:0.85rem 1rem; border-radius:0.75rem; font-size:0.9rem; color:var(--text-body); max-width:85%; align-self:flex-start;';

      const plainText = text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      bubble.innerHTML = `
        <div>${text}</div>
        <button class="speak-bubble-btn" title="آواز سنیں" onclick="window.ilmChatbot.speakUrdu('${plainText}')">
          <i class="fas fa-volume-up"></i>
        </button>
      `;
    }

    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  speakUrdu(rawText) {
    if (!('speechSynthesis' in window)) return;
    this.stopSpeech();

    const cleanText = this.formatSpokenTextUrdu(rawText);

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    } catch (e) {}

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const urduVoice = voices.find(v => v.lang.startsWith('ur') || v.lang.includes('PK') || v.name.toLowerCase().includes('urdu'));
    if (urduVoice) {
      utterance.voice = urduVoice;
      utterance.lang = urduVoice.lang;
    } else {
      utterance.lang = 'ur-PK';
    }

    window.ilmCurrentUtterance = utterance;
    this.currentUtterance = utterance;
    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  stopSpeech() {
    if (this.currentAudioPlayer) {
      try {
        this.currentAudioPlayer.pause();
        this.currentAudioPlayer.currentTime = 0;
      } catch (e) {}
      this.currentAudioPlayer = null;
    }
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  generateFallbackResponse(input) {
    const q = input.toLowerCase();

    if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('فیس')) {
      return `علم ٹیک پاکستان کے کورسز کی فیس <strong>3,999 PKR سے 14,999 PKR</strong> تک ہے، اور تمام کورسز میں آسان اقساط بھی دستیاب ہیں۔`;
    }

    if (q.includes('course') || q.includes('class') || q.includes('کورس')) {
      return `ہمارے 6 آفیشل AI کورسز موجود ہیں:<br>
      1. <strong>بیسک AI کورس</strong><br>
      2. <strong>AI ٹولز ماسٹری</strong><br>
      3. <strong>بیسک کمپیوٹر کورس</strong><br>
      4. <strong>AI سافٹ ویئر ڈویلپمنٹ</strong><br>
      5. <strong>AI کنٹینٹ کریایشن</strong><br>
      6. <strong>کریپٹو اور فوریکس ٹریڈنگ</strong><br><br>
      تفصیلات کے لیے <a href="courses.html" style="color:var(--primary-green); font-weight:700;">کورسز کا صفحہ</a> دیکھیں۔`;
    }

    if (q.includes('pay') || q.includes('jazzcash') || q.includes('easypaisa') || q.includes('sadapay') || q.includes('bank') || q.includes('shahid') || q.includes('ادائیگی') || q.includes('پیسے')) {
      return `فیس کی آن لائن ادائیگی کی تفصیلات:<br><br>
      📱 <strong>اکاؤنٹ ہولڈر:</strong> شاہد اکرم (Shahid Akram)<br>
      💳 <strong>JazzCash / Easypaisa / SadaPay:</strong> <code>03206546008</code><br>
      🏦 <strong>میزان بینک IBAN:</strong> <code>PK36MEZN0001020304050607</code><br><br>
      ادائیگی کے بعد رسیپٹ <a href="payments.html" style="color:var(--primary-green); font-weight:700;">آن لائن پورٹل</a> پر اپلوڈ کریں۔`;
    }

    if (q.includes('certificate') || q.includes('verify') || q.includes('سرٹیفکیٹ')) {
      return `سرٹیفکیٹ کی تصدیق کے لیے ہمارے <a href="verify-certificate.html" style="color:var(--primary-green); font-weight:700;">سرٹیفکیٹ پورٹل</a> پر جا کر ویریفیکیشن کوڈ (مثلاً <code>ILM-2026-000101</code>) درج کریں۔`;
    }

    return `علم ٹیک پاکستان سے رابطہ کرنے کا شکریہ! علم ٹیک پاکستان کی جانب سے <strong>ڈاکٹر شاہد اکرم مصطفائی</strong> بات کر رہا ہوں۔ آپ مجھ سے ہمارے تمام کورسز، فیس، آن لائن داخلے، یا ادائیگی (اکاؤنٹ ہولڈر: شاہد اکرم - 03206546008) کے بارے میں کچھ بھی پوچھ سکتے ہیں۔`;
  }
}

// Singleton Safe Initialization Engine
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
