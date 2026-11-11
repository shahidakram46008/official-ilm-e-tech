
// Enterprise Input Sanitization Utility (Anti-XSS & SQLi Defense)
window.sanitizeText = function(str) {
  if (typeof str !== 'string') return str || '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[;"'\`]/g, '') // Strip SQL/script injection metacharacters
    .trim();
};
/**
 * Main Application Logic & UI Interactions
 * ILM E TECH PAKISTAN (ilmetechpakistan.com)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLanguageSwitcher();
  initVerificationWidget();
  initAdmissionForm();
  initPaymentForm();
  renderDynamicComponents();
});

// Toast notification system
window.showToast = function(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.cssText = 'position:fixed; top:20px; right:20px; z-index:9999; display:flex; flex-direction:column; gap:10px;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#0284c7';
  toast.style.cssText = `background:${bg}; color:#ffffff; padding:12px 20px; border-radius:8px; font-weight:600; font-size:0.9rem; box-shadow:0 10px 15px -3px rgba(0,0,0,0.2); opacity:0; transform:translateY(-10px); transition:all 0.3s ease;`;
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// Copy to Clipboard Utility
window.copyToClipboard = function(text, label = 'Number') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(`<i class="fas fa-copy"></i> ${label} <strong>${text}</strong> copied to clipboard!`, 'success');
    }).catch(err => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
};

function fallbackCopy(text, label) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    window.showToast(`<i class="fas fa-copy"></i> ${label} <strong>${text}</strong> copied to clipboard!`, 'success');
  } catch (err) {
    window.showToast(`Copy failed. Please manually copy: ${text}`, 'error');
  }
  document.body.removeChild(textArea);
}

// Navigation & Mobile Drawer
function initNavigation() {
  const toggleBtn = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('drawerClose');

  if (toggleBtn && drawer && overlay) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('active');
    });

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }
}

// Ensure 100% Pure English Presentation (LTR)
function initLanguageSwitcher() {
  document.documentElement.setAttribute('lang', 'en');
  document.documentElement.setAttribute('dir', 'ltr');
  document.body.classList.remove('font-urdu');
}

// Certificate Verification Lookup

function initVerificationWidget() {
  const verifyForms = document.querySelectorAll('.cert-verify-form');
  verifyForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[name="certId"]');
      if (input && input.value.trim()) {
        const certId = input.value.trim();
        window.location.href = `verify-certificate.html?id=${encodeURIComponent(certId)}`;
      }
    });
  });
}

// Online Admission Form Handler (Compact & NASA-Grade Verification)
function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const refNo = 'APP-2026-' + Math.floor(10000 + Math.random() * 90000);
    const courseId = formData.get('courseId');
    const courseOption = form.querySelector(`option[value="${courseId}"]`);
    const courseName = courseOption ? courseOption.textContent : 'Selected Course';
    const isFree = courseId === 'basic-ai' || (courseName.toLowerCase().includes('basic ai') && !courseName.toLowerCase().includes('tools'));

    const fullName = window.sanitizeText(formData.get('fullName') || '');
    const fatherName = window.sanitizeText(formData.get('fatherName') || '');
    const city = window.sanitizeText(formData.get('city') || '');
    const profession = window.sanitizeText(formData.get('profession') || 'طالب علم (Student)');
    const age = window.sanitizeText(formData.get('age') || 'N/A');
    const whatsapp = window.sanitizeText(formData.get('whatsapp') || '');
    const preferredMode = window.sanitizeText(formData.get('preferredMode') || 'Online Live Interactive');

    const admissionData = {
      appId: refNo,
      fullName: fullName,
      fatherName: fatherName,
      city: city,
      profession: profession,
      age: age,
      whatsapp: whatsapp,
      phone: whatsapp,
      cnic: 'N/A',
      courseId: window.sanitizeText(courseId),
      courseName: window.sanitizeText(courseName),
      preferredMode: preferredMode,
      status: isFree ? '100% Free Enrollment Approved' : 'Pending Fee Verification',
      date: new Date().toISOString().split('T')[0]
    };

    if (window.ilmDB) {
      window.ilmDB.addAdmission(admissionData);
    }

    // Prepare WhatsApp Message for Dr. Shahid Akram
    const waText = `السلام علیکم ڈاکٹر شاہد اکرم مصطفائی صاحب!\nعلمِ ٹیک پاکستان آن لائن داخلہ فارم موصول ہوا ہے:\n---------------------------------\nآئی ڈی: ${refNo}\nطالب علم کا نام: ${fullName}\nوالد کا نام: ${fatherName}\nشہر / علاقہ: ${city}\nپیشہ / شعبہ: ${profession}\nعمر: ${age} سال\nواٹس ایپ نمبر: ${whatsapp}\nمنتخب کورس: ${courseName}\nکلاس فارمیٹ: ${preferredMode}\nفیس اسٹیٹس: ${isFree ? '100% مفت داخلہ (Rs. 0)' : 'کورس فیس کا واؤچر جاری'}\n---------------------------------\nبرائے مہربانی سیٹ کنفرمیشن اور کلاس گروپ لنک شیئر فرمائیں۔`;

    const resultBox = document.getElementById('admissionResult');
    const formCard = document.getElementById('formWrapperCard');

    if (resultBox) {
      resultBox.style.display = 'block';

      resultBox.innerHTML = `
        <div class="card" style="background:#ffffff; border:2px solid ${isFree ? '#10b981' : '#0284c7'}; padding:2rem 1.5rem; border-radius:1.25rem; text-align:center; box-shadow:0 15px 40px rgba(0,0,0,0.08);">
          <div style="font-size:3rem; color:${isFree ? '#16a34a' : '#0284c7'}; margin-bottom:0.5rem;">
            <i class="fas fa-${isFree ? 'check-circle' : 'file-invoice'}"></i>
          </div>
          <h2 style="color:${isFree ? '#046a38' : '#0369a1'}; font-size:1.6rem; font-weight:900; margin-bottom:0.25rem;">
            ${isFree ? '100% مفت داخلہ منظور!' : 'داخلہ درخواست کامیابی سے موصول ہو گئی!'}
          </h2>
          <div style="font-family:'Noto Nastaliq Urdu', serif; font-size:1.2rem; color:#475569; margin-bottom:1.25rem; line-height:1.8;">
            مبارک ہو ${fullName}! علم ٹیک پاکستان میں آپ کی رجسٹریشن مکمل ہو گئی ہے۔
          </div>

          <div style="background:#f8fafc; border:1.5px dashed ${isFree ? '#10b981' : '#0284c7'}; padding:1.25rem; border-radius:1rem; margin:1rem auto 1.5rem; max-width:620px; text-align:left; font-size:0.92rem;">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.6rem;">
              <div><strong>Application ID:</strong> <span style="color:#0284c7; font-weight:800;">${refNo}</span></div>
              <div><strong>Student Name:</strong> <span style="font-weight:700;">${fullName}</span></div>
              <div><strong>Father's Name:</strong> ${fatherName}</div>
              <div><strong>City / Area:</strong> ${city}</div>
              <div><strong>Profession:</strong> ${profession}</div>
              <div><strong>Age:</strong> ${age} Years</div>
              <div><strong>WhatsApp:</strong> ${whatsapp}</div>
              <div><strong>Format:</strong> ${preferredMode}</div>
            </div>
            <div style="margin-top:0.75rem; padding-top:0.75rem; border-top:1px solid #e2e8f0;">
              <strong>Course:</strong> <span style="color:#046a38; font-weight:800;">${courseName}</span>
            </div>
          </div>

          <div style="display:flex; gap:0.75rem; justify-content:center; flex-wrap:wrap;">
            <a href="https://wa.me/923074958837?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg" style="background:linear-gradient(135deg, #059669 0%, #10b981 100%);">
              <i class="fab fa-whatsapp"></i> ڈاکٹر شاہد اکرم صاحب کو واٹس ایپ پر تفصیلات بھیجیں
            </a>
            ${!isFree ? `<a href="payments.html?appId=${refNo}&course=${encodeURIComponent(courseName)}" class="btn btn-primary btn-lg"><i class="fas fa-receipt"></i> آن لائن فیس ادا کریں</a>` : ''}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeghlY7TLWi-nOkmOmlmCFi9GFXs0dL_vpyz8HcDOefc4ksrw/viewform" target="_blank" rel="noopener noreferrer" class="btn btn-outline-blue btn-lg">
              <i class="fab fa-google"></i> گوگل فارم پر بھی ریکارڈ رکھیں
            </a>
            <a href="admission-success.html?appId=${refNo}&name=${encodeURIComponent(fullName)}&course=${encodeURIComponent(courseName)}&free=${isFree}" class="btn btn-lg" style="background:linear-gradient(135deg, #d4af37 0%, #aa8010 100%); color:#04231a; font-weight:800; box-shadow:0 6px 20px rgba(212,175,55,0.4);">
              <i class="fas fa-award"></i> داخلہ تصدیق و آفیشل فیس پورٹل کھولیں
            </a>
            <button onclick="window.print()" class="btn btn-outline btn-lg">
              <i class="fas fa-print"></i> سلپ پرنٹ کریں
            </button>
          </div>
        </div>
      `;

      if (formCard) {
        formCard.style.display = 'none';
      }
      resultBox.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Payment Submission Handler
function initPaymentForm() {
  const form = document.getElementById('paymentForm');
  if (!form) return;

  // Auto fee calculations
  const courseSelect = form.querySelector('select[name="courseName"]');
  const amountInput = form.querySelector('input[name="amount"]');

  if (courseSelect && amountInput && window.ilmDB) {
    const courses = window.ilmDB.getCourses();
    const updateFee = () => {
      const selected = courses.find(c => c.title === courseSelect.value || c.id === courseSelect.value);
      if (selected) {
        amountInput.value = selected.fee;
      }
    };
    courseSelect.addEventListener('change', updateFee);
    updateFee();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const payId = 'PAY-2026-' + Math.floor(10000 + Math.random() * 90000);
    const paymentData = {
      payId: payId,
      appId: window.sanitizeText(formData.get('appId') || 'APP-DIRECT'),
      studentName: window.sanitizeText(formData.get('studentName')),
      courseName: window.sanitizeText(formData.get('courseName')),
      amount: window.sanitizeText(formData.get('amount')),
      method: window.sanitizeText(formData.get('paymentMethod')),
      trxId: window.sanitizeText(formData.get('trxId')),
      status: 'Pending Verification',
      date: new Date().toISOString().split('T')[0]
    };

    if (window.ilmDB) {
      window.ilmDB.addPayment(paymentData);
    }

    const resultBox = document.getElementById('paymentResult');
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="card" style="background:#f0f9ff; border:2px solid #0284c7; padding:2rem; border-radius:1rem; text-align:center;">
          <div style="font-size:3.5rem; color:#0284c7; margin-bottom:1rem;"><i class="fas fa-clock"></i></div>
          <h3 style="color:#1e3a8a; font-size:1.6rem; font-weight:800; margin-bottom:0.5rem;">Payment Submitted & Pending Verification</h3>
          
          
          <div style="background:#ffffff; border:1px solid #bae6fd; padding:1.25rem; border-radius:0.75rem; margin:1.5rem 0; text-align:left; max-width:550px; margin-left:auto; margin-right:auto;">
            <p><strong>Payment Reference ID:</strong> <span style="color:#046a38; font-weight:800; font-size:1.1rem;">${payId}</span></p>
            <p><strong>Account Holder Paid To:</strong> Shahid Akram (03206546008)</p>
            <p><strong>Payment Method:</strong> ${paymentData.method}</p>
            <p><strong>Transaction / TRX ID:</strong> <code>${paymentData.trxId}</code></p>
            <p><strong>Amount Paid:</strong> Rs. ${Number(paymentData.amount).toLocaleString()} PKR</p>
            <p><strong>Current Status:</strong> <span style="background:#fef3c7; color:#b45309; padding:0.2rem 0.6rem; border-radius:0.25rem; font-weight:700; font-size:0.85rem;"><i class="fas fa-hourglass-half"></i> Pending Verification (Under Review by Admin)</span></p>
          </div>
          
          <div style="background:#fffbeb; border:1px solid #fef08a; padding:1rem; border-radius:0.5rem; max-width:550px; margin:0 auto 1.5rem; text-align:left; font-size:0.875rem; color:#b45309;">
            <i class="fas fa-info-circle"></i> <strong>Important Note:</strong> Payments are not marked as approved until verified by the ILM E TECH PAKISTAN accounts team. Verification usually takes 2 to 24 hours. You can check your status anytime in the Student Portal.
          </div>

          <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
            <a href="student-portal.html" class="btn btn-secondary"><i class="fas fa-user-graduate"></i> Go to Student Portal</a>
            <button onclick="window.print()" class="btn btn-outline"><i class="fas fa-print"></i> Print Receipt Voucher</button>
          </div>
        </div>
      `;
      form.style.display = 'none';
      resultBox.scrollIntoView({ behavior: 'smooth' });
    }

    window.showToast(`Payment receipt ${payId} submitted! Waiting for admin verification.`, 'success');
  });
}

// Populate Dynamic Components (Header settings, footer, contact numbers)
function renderDynamicComponents() {
  if (!window.ilmDB) return;
  const settings = window.ilmDB.getSettings();

  document.querySelectorAll('.site-phone').forEach(el => el.textContent = settings.phone);
  document.querySelectorAll('.site-email').forEach(el => el.textContent = settings.email);
  document.querySelectorAll('.site-address').forEach(el => el.textContent = settings.address);
}

// Security isolation guard for all external/new-tab links
function enforceSecurityRel() {
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const currentRel = link.getAttribute('rel') || '';
    if (!currentRel.includes('noopener')) {
      link.setAttribute('rel', (currentRel + ' noopener noreferrer').trim());
    }
  });
}

document.addEventListener('DOMContentLoaded', enforceSecurityRel);




// Smooth Metric Counter Animation (Observer Driven)
function initMetricCounters() {
  const statElements = document.querySelectorAll('[data-counter]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-counter'), 10);
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || (prefix ? '' : '+');
        const duration = 1200;
        const startTime = performance.now();

        function updateVal(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic curve
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * targetVal);

          el.textContent = `${prefix}${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateVal);
          } else {
            el.textContent = `${prefix}${targetVal}${suffix}`;
          }
        }

        requestAnimationFrame(updateVal);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initMetricCounters);


// ==========================================================================
// NASA-Grade Verified Student Testimonials Controller & Lightbox
// ==========================================================================

function initTestimonialsFilter() {
  const filterBtns = document.querySelectorAll('.testi-tab-btn');
  const cards = document.querySelectorAll('.testi-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.split(' ').includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Global Lightbox Open / Close Handlers
window.openTestiLightbox = function(imgSrc, title) {
  const overlay = document.getElementById('testiLightboxOverlay');
  const img = document.getElementById('testiLightboxImg');
  const titleEl = document.getElementById('testiModalTitle');

  if (!overlay || !img) return;

  img.src = imgSrc;
  if (title && titleEl) {
    titleEl.innerHTML = '<i class="fas fa-shield-check text-emerald-400"></i> ' + title;
  }
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeTestiLightbox = function() {
  const overlay = document.getElementById('testiLightboxOverlay');
  const img = document.getElementById('testiLightboxImg');
  if (!overlay) return;

  overlay.classList.remove('active');
  document.body.style.overflow = '';
  if (img) img.src = '';
};

// Lightbox backdrop & Escape key handlers
document.addEventListener('DOMContentLoaded', () => {
  initTestimonialsFilter();

  const overlay = document.getElementById('testiLightboxOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        window.closeTestiLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeTestiLightbox();
    }
  });
});
