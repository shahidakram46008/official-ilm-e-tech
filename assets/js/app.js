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

// Online Admission Form Handler
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
    const isFree = courseId === 'basic-ai' || courseId === 'ai-tools-mastery' || courseName.includes('FREE') || courseName.includes('مفت');

    const admissionData = {
      appId: refNo,
      fullName: formData.get('fullName'),
      fatherName: formData.get('fatherName'),
      cnic: formData.get('cnic') || 'N/A',
      phone: formData.get('phone'),
      whatsapp: formData.get('whatsapp'),
      email: formData.get('email'),
      city: formData.get('city'),
      courseId: courseId,
      courseName: courseName,
      preferredMode: formData.get('preferredMode') || 'Online Live',
      status: isFree ? '100% Free Enrollment Approved' : 'Pending Fee Verification',
      date: new Date().toISOString().split('T')[0]
    };

    if (window.ilmDB) {
      window.ilmDB.addAdmission(admissionData);
    }

    const resultBox = document.getElementById('admissionResult');
    if (resultBox) {
      resultBox.style.display = 'block';

      if (isFree) {
        resultBox.innerHTML = `
          <div class="card" style="background:#ecfdf5; border:2px solid #10b981; padding:2.5rem 2rem; border-radius:1.25rem; text-align:center; box-shadow:0 10px 30px rgba(4,106,56,0.15);">
            <div style="font-size:3.5rem; color:#16a34a; margin-bottom:0.75rem;"><i class="fas fa-check-circle"></i></div>
            <h3 style="color:#046a38; font-size:1.75rem; font-weight:800; margin-bottom:0.3rem;">100% FREE Admission Approved!</h3>
            <div style="font-family:'Noto Nastaliq Urdu', serif; font-size:1.35rem; color:#065f46; margin-bottom:1rem; line-height:1.7;">
              مبارک ہو! آپ کا داخلہ 100% مفت منظور ہو چکا ہے (کوئی فیس درکار نہیں)
            </div>
            
            <div style="background:#ffffff; border:1.5px dashed #046a38; padding:1.5rem; border-radius:1rem; margin:1.5rem auto; max-width:600px; text-align:left;">
              <p style="margin-bottom:0.5rem;"><strong>Application ID:</strong> <span style="color:#0284c7; font-weight:800; font-size:1.25rem;">${refNo}</span></p>
              <p style="margin-bottom:0.5rem;"><strong>Student Name:</strong> <span style="font-weight:700; color:#0f172a;">${admissionData.fullName}</span></p>
              <p style="margin-bottom:0.5rem;"><strong>Course:</strong> <span style="font-weight:700; color:#046a38;">${admissionData.courseName}</span></p>
              <p style="margin-bottom:0.5rem;"><strong>City:</strong> ${admissionData.city} &bull; <strong>Format:</strong> ${admissionData.preferredMode}</p>
              <p style="margin:0;"><strong>Fee Status:</strong> <span class="badge" style="background:#d1fae5; color:#065f46; padding:0.3rem 0.75rem; border-radius:1rem; font-size:0.85rem; font-weight:800;"><i class="fas fa-gift"></i> 100% FREE Grant (Rs. 0 Fee)</span></p>
            </div>

            <div style="display:flex; gap:0.85rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
              <a href="https://wa.me/923074958837?text=${encodeURIComponent('السلام علیکم ڈاکٹر شاہد اکرم مصطفائی صاحب!\nمیرا نام ' + admissionData.fullName + ' ہے۔ میری فری کورس ایڈمشن ID: ' + refNo + ' منظور ہو گئی ہے۔ برائے مہربانی مجھے ' + admissionData.courseName + ' کے واٹس ایپ گروپ میں ایڈ فرمائیں۔')}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg" style="background:linear-gradient(135deg, #059669 0%, #10b981 100%);">
                <i class="fab fa-whatsapp"></i> Join Student WhatsApp Batch
              </a>
              <a href="student-portal.html" class="btn btn-outline-blue btn-lg">
                <i class="fas fa-user-graduate"></i> Student Portal
              </a>
              <button onclick="window.print()" class="btn btn-outline btn-lg">
                <i class="fas fa-print"></i> Print Free Slip
              </button>
            </div>
          </div>
        `;
      } else {
        resultBox.innerHTML = `
          <div class="card" style="background:#ffffff; border:2px solid #034b75; padding:2.5rem 2rem; border-radius:1.25rem; text-align:center; box-shadow:0 10px 30px rgba(3,75,117,0.15);">
            <div style="font-size:3.5rem; color:#0284c7; margin-bottom:0.75rem;"><i class="fas fa-file-invoice"></i></div>
            <h3 style="color:#034b75; font-size:1.75rem; font-weight:800; margin-bottom:0.3rem;">Admission Application Registered!</h3>
            <div style="font-family:'Noto Nastaliq Urdu', serif; font-size:1.2rem; color:#475569; margin-bottom:1rem; line-height:1.6;">
              آپ کی رجسٹریشن کامیابی سے موصول ہو گئی ہے۔ واؤچر کی ادائیگی کے بعد کلاس رسائی جاری کی جائے گی۔
            </div>
            
            <div style="background:#f8fafc; border:1.5px dashed #0284c7; padding:1.5rem; border-radius:1rem; margin:1.5rem auto; max-width:600px; text-align:left;">
              <p style="margin-bottom:0.5rem;"><strong>Application Reference ID:</strong> <span style="color:#0284c7; font-weight:800; font-size:1.25rem;">${refNo}</span></p>
              <p style="margin-bottom:0.5rem;"><strong>Applicant Name:</strong> <span style="font-weight:700; color:#0f172a;">${admissionData.fullName}</span></p>
              <p style="margin-bottom:0.5rem;"><strong>Selected Course:</strong> <span style="font-weight:700; color:#034b75;">${admissionData.courseName}</span></p>
              <p style="margin-bottom:0.5rem;"><strong>Date:</strong> ${admissionData.date} &bull; <strong>City:</strong> ${admissionData.city}</p>
              <p style="margin:0;"><strong>Status:</strong> <span class="badge" style="background:#fef3c7; color:#d97706; padding:0.3rem 0.75rem; border-radius:1rem; font-size:0.85rem; font-weight:800;">Pending Verification</span></p>
            </div>

            <div style="display:flex; gap:0.85rem; justify-content:center; flex-wrap:wrap; margin-top:1.5rem;">
              <a href="payments.html?appId=${refNo}&course=${encodeURIComponent(admissionData.courseName)}" class="btn btn-primary btn-lg">
                <i class="fas fa-receipt"></i> Proceed to Pay Fee
              </a>
              <a href="https://wa.me/923074958837?text=${encodeURIComponent('Assalam o Alaikum! I submitted application ' + refNo + ' for ' + admissionData.courseName + '. Please assist with fee verification.')}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-blue btn-lg">
                <i class="fab fa-whatsapp"></i> WhatsApp Accounts
              </a>
              <button onclick="window.print()" class="btn btn-outline btn-lg">
                <i class="fas fa-print"></i> Print Voucher
              </button>
            </div>
          </div>
        `;
      }

      form.style.display = 'none';
      resultBox.scrollIntoView({ behavior: 'smooth' });
    }

    window.showToast(`Application ${refNo} registered successfully!`, 'success');
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
      appId: formData.get('appId') || 'APP-DIRECT',
      studentName: formData.get('studentName'),
      courseName: formData.get('courseName'),
      amount: formData.get('amount'),
      method: formData.get('paymentMethod'),
      trxId: formData.get('trxId'),
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


