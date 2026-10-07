/**
 * Secure Admin Dashboard CMS & Payment Verification Engine
 * ILM E TECH PAKISTAN (ilmetechpakistan.com)
 */

let currentAdminRole = 'SUPER_ADMIN'; // Options: SUPER_ADMIN, FINANCE_ADMIN, ADMISSION_ADMIN
let currentPaymentFilter = 'ALL';
let activePaymentId = null;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('adminApp')) {
    initAdminDashboard();
  }
});

function initAdminDashboard() {
  bindRoleSelector();
  bindPaymentSubTabs();
  bindPaymentSearchFilter();
  renderAdminStats();
  renderAdmissionsTable();
  renderPaymentsTable();
  renderCertificatesTable();
  renderCoursesAdmin();
  renderSettingsForm();
  bindAdminTabEvents();
}

// Role-based permissions UI
function bindRoleSelector() {
  const roleSelect = document.getElementById('adminRoleSelector');
  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      currentAdminRole = e.target.value;
      window.showToast(`Admin Role switched to: <strong>${currentAdminRole}</strong>`, 'info');
      applyRolePermissions();
    });
  }
  applyRolePermissions();
}

function applyRolePermissions() {
  const roleBadge = document.getElementById('dispAdminRole');
  if (roleBadge) roleBadge.textContent = currentAdminRole.replace('_', ' ');

  // Enable/Disable restricted panels based on role
  const settingsTab = document.querySelector('[data-target="panelSettings"]');
  const coursesTab = document.querySelector('[data-target="panelCourses"]');
  
  if (currentAdminRole === 'FINANCE_ADMIN') {
    if (settingsTab) settingsTab.style.display = 'none';
    if (coursesTab) coursesTab.style.display = 'none';
  } else {
    if (settingsTab) settingsTab.style.display = 'inline-block';
    if (coursesTab) coursesTab.style.display = 'inline-block';
  }
}

function bindAdminTabEvents() {
  const tabs = document.querySelectorAll('.admin-tab-btn');
  const panels = document.querySelectorAll('.admin-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');

      tab.classList.add('active');
      const target = document.getElementById(tab.getAttribute('data-target'));
      if (target) target.style.display = 'block';
    });
  });
}

function bindPaymentSubTabs() {
  const subBtns = document.querySelectorAll('.payment-subtab-btn');
  subBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      subBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPaymentFilter = btn.getAttribute('data-filter');
      renderPaymentsTable();
    });
  });
}

function bindPaymentSearchFilter() {
  const searchInput = document.getElementById('paymentSearchInput');
  const methodSelect = document.getElementById('paymentMethodFilter');
  const statusSelect = document.getElementById('paymentStatusFilter');

  if (searchInput) searchInput.addEventListener('input', renderPaymentsTable);
  if (methodSelect) methodSelect.addEventListener('change', renderPaymentsTable);
  if (statusSelect) statusSelect.addEventListener('change', renderPaymentsTable);
}

function renderAdminStats() {
  if (!window.ilmDB) return;
  const admissions = window.ilmDB.getAdmissions();
  const payments = window.ilmDB.getPayments();
  const certs = window.ilmDB.getCertificates();
  const courses = window.ilmDB.getCourses();

  // Calculate Payment Stats
  const pendingPayments = payments.filter(p => p.status === 'PENDING');
  const verifiedPayments = payments.filter(p => p.status === 'VERIFIED');
  const rejectedPayments = payments.filter(p => p.status === 'REJECTED');
  
  const todayStr = new Date().toISOString().split('T')[0];
  const verifiedToday = verifiedPayments.filter(p => (p.verificationDate && p.verificationDate.includes(todayStr)) || p.status === 'VERIFIED');

  const totalReceivedAmount = verifiedPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setEl('statTotalAdmissions', admissions.length);
  setEl('statTotalPayments', payments.length);
  setEl('statTotalCertificates', certs.length);
  setEl('statTotalCourses', courses.length);

  setEl('statPendingPayments', pendingPayments.length);
  setEl('statVerifiedToday', verifiedToday.length);
  setEl('statRejectedPayments', rejectedPayments.length);
  setEl('statTotalAmountReceived', 'Rs. ' + totalReceivedAmount.toLocaleString() + ' PKR');
  setEl('statPendingAmount', 'Rs. ' + pendingAmount.toLocaleString() + ' PKR');
}

function renderAdmissionsTable() {
  const container = document.getElementById('admissionsTableBody');
  if (!container || !window.ilmDB) return;

  const admissions = window.ilmDB.getAdmissions();
  if (admissions.length === 0) {
    container.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#64748b;">No admission applications found.</td></tr>`;
    return;
  }

  container.innerHTML = admissions.map(app => `
    <tr>
      <td><strong>${app.appId}</strong></td>
      <td>${app.fullName}<br><small style="color:#64748b;">${app.phone}</small></td>
      <td>${app.courseName}</td>
      <td>${app.preferredMode || 'Online Live'}</td>
      <td>${app.date}</td>
      <td>
        <span class="badge" style="background:${app.status === 'APPROVED' ? '#dcfce7' : app.status === 'PAYMENT_ISSUE' ? '#fee2e2' : '#fef3c7'}; color:${app.status === 'APPROVED' ? '#15803d' : app.status === 'PAYMENT_ISSUE' ? '#dc2626' : '#b45309'}; padding:0.25rem 0.6rem; border-radius:0.25rem; font-weight:700; font-size:0.8rem;">
          ${app.status}
        </span>
      </td>
      <td>
        <button onclick="approveAdmission('${app.appId}')" class="btn btn-primary btn-sm"><i class="fas fa-check"></i> Approve</button>
        <button onclick="rejectAdmission('${app.appId}')" class="btn btn-outline btn-sm" style="color:#dc2626; border-color:#dc2626;"><i class="fas fa-times"></i> Reject</button>
      </td>
    </tr>
  `).join('');
}

window.approveAdmission = function(appId) {
  window.ilmDB.updateAdmissionStatus(appId, 'APPROVED');
  window.showToast(`Admission ${appId} approved!`, 'success');
  renderAdmissionsTable();
  renderAdminStats();
};

window.rejectAdmission = function(appId) {
  window.ilmDB.updateAdmissionStatus(appId, 'REJECTED');
  window.showToast(`Admission ${appId} rejected.`, 'error');
  renderAdmissionsTable();
  renderAdminStats();
};

function renderPaymentsTable() {
  const container = document.getElementById('paymentsTableBody');
  if (!container || !window.ilmDB) return;

  let payments = window.ilmDB.getPayments();

  // Filter by Sub-tab
  if (currentPaymentFilter !== 'ALL') {
    if (currentPaymentFilter === 'AUDIT_REPORTS') {
      renderAuditReportsTable();
      return;
    } else {
      payments = payments.filter(p => p.status === currentPaymentFilter);
    }
  }

  // Filter by Search Input & Dropdowns
  const searchInput = document.getElementById('paymentSearchInput');
  const methodFilter = document.getElementById('paymentMethodFilter');
  const statusFilter = document.getElementById('paymentStatusFilter');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const methodVal = methodFilter ? methodFilter.value : 'ALL';
  const statusVal = statusFilter ? statusFilter.value : 'ALL';

  if (query) {
    payments = payments.filter(p => 
      (p.studentName && p.studentName.toLowerCase().includes(query)) ||
      (p.phone && p.phone.toLowerCase().includes(query)) ||
      (p.appId && p.appId.toLowerCase().includes(query)) ||
      (p.payId && p.payId.toLowerCase().includes(query)) ||
      (p.trxId && p.trxId.toLowerCase().includes(query)) ||
      (p.courseName && p.courseName.toLowerCase().includes(query))
    );
  }

  if (methodVal !== 'ALL') {
    payments = payments.filter(p => p.method === methodVal);
  }

  if (statusVal !== 'ALL') {
    payments = payments.filter(p => p.status === statusVal);
  }

  if (payments.length === 0) {
    container.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:2.5rem; color:#64748b;">No payment records match your filters.</td></tr>`;
    return;
  }

  container.innerHTML = payments.map(p => {
    let badgeBg = '#fef3c7';
    let badgeColor = '#b45309';
    if (p.status === 'VERIFIED') { badgeBg = '#dcfce7'; badgeColor = '#15803d'; }
    if (p.status === 'REJECTED') { badgeBg = '#fee2e2'; badgeColor = '#dc2626'; }
    if (p.status === 'ACTION_REQUIRED') { badgeBg = '#e0f2fe'; badgeColor = '#0369a1'; }

    return `
      <tr>
        <td><strong>${p.payId}</strong></td>
        <td><code>${p.appId}</code></td>
        <td><strong>${p.studentName}</strong><br><small style="color:#64748b;">${p.phone}</small></td>
        <td>${p.courseName}</td>
        <td><strong>Rs. ${Number(p.amount).toLocaleString()}</strong></td>
        <td><span class="badge" style="background:#f1f5f9; color:#334155; padding:0.2rem 0.5rem; border-radius:0.25rem;">${p.method}</span></td>
        <td><code>${p.trxId}</code></td>
        <td><span class="badge" style="background:${badgeBg}; color:${badgeColor}; padding:0.25rem 0.6rem; border-radius:0.25rem; font-weight:700; font-size:0.8rem;">${p.status}</span></td>
        <td>
          <button onclick="openPaymentVerificationModal('${p.payId}')" class="btn btn-primary btn-sm"><i class="fas fa-search"></i> View & Verify</button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAuditReportsTable() {
  const container = document.getElementById('paymentsTableBody');
  if (!container || !window.ilmDB) return;

  const logs = window.ilmDB.getAuditLogs();
  container.innerHTML = `
    <tr style="background:#f8fafc;"><td colspan="9"><strong>Payment Verification Audit Trail History (${logs.length} Records)</strong></td></tr>
    ${logs.map(l => `
      <tr>
        <td><code>${l.id}</code></td>
        <td><strong>${l.payId}</strong></td>
        <td colspan="2"><strong>${l.action}</strong><br><small style="color:#64748b;">Note: ${l.note || 'None'}</small></td>
        <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">${l.previousStatus} → ${l.newStatus}</span></td>
        <td colspan="2"><strong>${l.performedBy}</strong> (${l.role})</td>
        <td colspan="2">${l.date} ${l.time}</td>
      </tr>
    `).join('')}
  `;
}

// Open Payment Verification Full Modal
window.openPaymentVerificationModal = function(payId) {
  activePaymentId = payId;
  const pay = window.ilmDB ? window.ilmDB.getPaymentById(payId) : null;
  if (!pay) return;

  const adm = window.ilmDB.getAdmissionById(pay.appId) || {};
  const logs = window.ilmDB.getAuditLogs(payId);

  const modalHtml = `
    <div class="modal active" id="paymentVerificationModal">
      <div class="modal-backdrop" onclick="closeVerificationModal()"></div>
      <div class="modal-dialog" style="max-width:950px; width:95%;">
        
        <div class="modal-header" style="background:var(--dark-green); color:#ffffff;">
          <div>
            <h3 class="modal-title" style="color:#ffffff; font-size:1.3rem;">Payment Verification & Verification Audit</h3>
            <span style="font-size:0.8rem; color:#6ee7b7;">Payment Reference: ${pay.payId} | Application: ${pay.appId}</span>
          </div>
          <button class="modal-close" onclick="closeVerificationModal()" style="color:#ffffff;"><i class="fas fa-times"></i></button>
        </div>

        <div class="modal-body" style="padding:1.75rem; max-height:80vh; overflow-y:auto;">
          
          <!-- Top Status Alert -->
          <div style="background:${pay.status === 'VERIFIED' ? '#ecfdf5' : pay.status === 'REJECTED' ? '#fff1f2' : '#f0f9ff'}; border:2px solid ${pay.status === 'VERIFIED' ? '#10b981' : pay.status === 'REJECTED' ? '#f43f5e' : '#0284c7'}; padding:1rem 1.25rem; border-radius:0.75rem; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="color:var(--text-dark); font-size:1.1rem;">Current Payment Status:</strong> 
              <span class="badge" style="font-size:0.95rem; font-weight:800; padding:0.3rem 0.8rem; border-radius:0.4rem; background:${pay.status === 'VERIFIED' ? '#16a34a' : pay.status === 'REJECTED' ? '#dc2626' : '#d97706'}; color:#ffffff;">
                ${pay.status}
              </span>
            </div>
            <div>
              ${pay.rejectionReason ? `<span style="color:#dc2626; font-size:0.9rem; font-weight:600;">Reason: ${pay.rejectionReason}</span>` : ''}
              ${pay.adminNote ? `<span style="color:#0369a1; font-size:0.9rem; font-weight:600;">Note: ${pay.adminNote}</span>` : ''}
            </div>
          </div>

          <!-- 3-Column Info Grid -->
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:1.25rem; margin-bottom:1.75rem;">
            
            <!-- Student Information -->
            <div style="background:var(--bg-slate-50); border:1px solid var(--border-light); padding:1.25rem; border-radius:0.75rem;">
              <h4 style="color:var(--primary-green); font-size:1.05rem; font-weight:800; margin-bottom:0.75rem; border-bottom:1px solid var(--border-light); padding-bottom:0.4rem;">
                <i class="fas fa-user"></i> Student Information
              </h4>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Full Name:</strong> ${pay.studentName}</p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Father Name:</strong> ${pay.fatherName || adm.fatherName || 'N/A'}</p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Phone:</strong> ${pay.phone}</p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>WhatsApp:</strong> ${pay.whatsapp || pay.phone}</p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Email:</strong> ${pay.email || adm.email || 'N/A'}</p>
              <p style="font-size:0.875rem;"><strong>City:</strong> ${pay.city || adm.city || 'N/A'}</p>
            </div>

            <!-- Admission Information -->
            <div style="background:var(--bg-slate-50); border:1px solid var(--border-light); padding:1.25rem; border-radius:0.75rem;">
              <h4 style="color:var(--tech-blue); font-size:1.05rem; font-weight:800; margin-bottom:0.75rem; border-bottom:1px solid var(--border-light); padding-bottom:0.4rem;">
                <i class="fas fa-graduation-cap"></i> Admission Information
              </h4>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Application ID:</strong> <code>${pay.appId}</code></p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Course:</strong> ${pay.courseName}</p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Course Fee:</strong> Rs. ${Number(pay.courseFee || pay.amount).toLocaleString()} PKR</p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Class Mode:</strong> ${adm.preferredMode || 'Online Live Interactive'}</p>
              <p style="font-size:0.875rem;"><strong>Admission Status:</strong> <span style="font-weight:700; color:var(--primary-green);">${adm.status || 'PENDING'}</span></p>
            </div>

            <!-- Payment Information -->
            <div style="background:var(--bg-slate-50); border:1px solid var(--border-light); padding:1.25rem; border-radius:0.75rem;">
              <h4 style="color:#b45309; font-size:1.05rem; font-weight:800; margin-bottom:0.75rem; border-bottom:1px solid var(--border-light); padding-bottom:0.4rem;">
                <i class="fas fa-credit-card"></i> Payment Information
              </h4>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Payment ID:</strong> <code>${pay.payId}</code></p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Method:</strong> <span style="font-weight:700;">${pay.method}</span></p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Paid To:</strong> Shahid Akram (03206546008)</p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Paid Amount:</strong> <strong style="color:var(--primary-green); font-size:1.1rem;">Rs. ${Number(pay.amount).toLocaleString()} PKR</strong></p>
              <p style="font-size:0.875rem; margin-bottom:0.35rem;"><strong>Transaction TRX ID:</strong> <code>${pay.trxId}</code></p>
              <p style="font-size:0.875rem;"><strong>Submission Date:</strong> ${pay.submissionDate || 'Recently'}</p>
            </div>

          </div>

          <!-- Payment Proof & Screenshot Display -->
          <div style="background:#ffffff; border:1px solid var(--border-light); border-radius:0.75rem; padding:1.5rem; margin-bottom:1.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <h4 style="font-size:1.1rem; font-weight:800; color:var(--text-dark); margin:0;"><i class="fas fa-file-image"></i> Uploaded Payment Screenshot Proof</h4>
              <div>
                <a href="${pay.receiptUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm"><i class="fas fa-external-link-alt"></i> Open Full Image</a>
              </div>
            </div>

            <div style="text-align:center; background:var(--bg-slate-100); padding:1rem; border-radius:0.5rem; border:1px dashed var(--border-light);">
              <img src="${pay.receiptUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'}" alt="Payment Proof Screenshot" style="max-height:300px; width:auto; border-radius:0.5rem; box-shadow:var(--shadow-md);">
              <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem;">Uploaded Payment Receipt for Transaction TRX: <code>${pay.trxId}</code></p>
            </div>
          </div>

          <!-- Audit Log History -->
          <div style="background:var(--bg-slate-50); border:1px solid var(--border-light); border-radius:0.75rem; padding:1.25rem; margin-bottom:1.75rem;">
            <h4 style="font-size:1rem; font-weight:800; color:var(--text-dark); margin-bottom:0.75rem;"><i class="fas fa-history"></i> Verification Audit Log Trail</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${logs.map(l => `
                <div style="background:#ffffff; padding:0.6rem 0.85rem; border-radius:0.4rem; border:1px solid var(--border-light); font-size:0.85rem; display:flex; justify-content:space-between;">
                  <div>
                    <strong>${l.action}</strong> by <span>${l.performedBy}</span> (${l.role})
                    ${l.note ? `<div style="color:var(--text-muted); font-size:0.8rem;">Note: ${l.note}</div>` : ''}
                  </div>
                  <div style="text-align:right; color:var(--text-muted);">
                    ${l.date} ${l.time}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Admin Action Buttons -->
          <div style="padding-top:1rem; border-top:2px solid var(--border-light); display:flex; gap:1rem; justify-content:flex-end; flex-wrap:wrap;">
            <button onclick="promptApprovePayment('${pay.payId}')" class="btn btn-primary" style="padding:0.75rem 1.5rem;"><i class="fas fa-check-circle"></i> APPROVE PAYMENT</button>
            <button onclick="promptRejectPayment('${pay.payId}')" class="btn btn-outline" style="color:#dc2626; border-color:#dc2626; padding:0.75rem 1.25rem;"><i class="fas fa-times-circle"></i> REJECT PAYMENT</button>
            <button onclick="promptRequestMoreInfo('${pay.payId}')" class="btn btn-outline-blue" style="padding:0.75rem 1.25rem;"><i class="fas fa-question-circle"></i> Request More Information</button>
          </div>

        </div>
      </div>
    </div>
  `;

  let existingModal = document.getElementById('paymentVerificationModal');
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.closeVerificationModal = function() {
  const modal = document.getElementById('paymentVerificationModal');
  if (modal) modal.remove();
};

// --- WORKFLOW 1: APPROVE PAYMENT PROMPT ---
window.promptApprovePayment = function(payId) {
  if (currentAdminRole === 'ADMISSION_ADMIN') {
    window.showToast('Permission Denied: Admission Admins cannot verify payments independently.', 'error');
    return;
  }

  const pay = window.ilmDB.getPaymentById(payId);
  if (!pay) return;

  const note = prompt(`APPROVE PAYMENT VERIFICATION\n\nAre you sure you have verified this payment of Rs. ${Number(pay.amount).toLocaleString()} PKR (TRX: ${pay.trxId}) in your JazzCash/Easypaisa/SadaPay/Bank statement?\n\nEnter verification note (Optional):`, "Verified in bank/wallet statement");

  if (note !== null) {
    const res = window.ilmDB.approvePaymentWorkflow(payId, `${currentAdminRole.replace('_', ' ')}: Shahid Akram`, note);
    if (res.success) {
      window.showToast(`PAYMENT APPROVED! Student ID: ${res.studentId} | Enrollment: ${res.enrollmentId}`, 'success');
      closeVerificationModal();
      renderAdminStats();
      renderPaymentsTable();
      renderAdmissionsTable();
    }
  }
};

// --- WORKFLOW 2: REJECT PAYMENT PROMPT ---
window.promptRejectPayment = function(payId) {
  if (currentAdminRole === 'ADMISSION_ADMIN') {
    window.showToast('Permission Denied: Admission Admins cannot reject payments.', 'error');
    return;
  }

  const reason = prompt("REJECT PAYMENT VERIFICATION\n\nPlease select/enter the exact reason for rejection:\n\nPresets:\n- Payment not received in bank/wallet statement\n- Transaction TRX ID is incorrect or invalid\n- Payment screenshot proof is blurry/unclear\n- Paid amount does not match full course fee\n- Duplicate payment transaction", "Payment not received in bank/wallet statement");

  if (reason && reason.trim()) {
    const res = window.ilmDB.rejectPaymentWorkflow(payId, reason.trim(), `${currentAdminRole.replace('_', ' ')}: Shahid Akram`);
    if (res.success) {
      window.showToast('Payment rejected and student notified of issue.', 'error');
      closeVerificationModal();
      renderAdminStats();
      renderPaymentsTable();
      renderAdmissionsTable();
    }
  }
};

// --- WORKFLOW 3: REQUEST MORE INFO PROMPT ---
window.promptRequestMoreInfo = function(payId) {
  const note = prompt("REQUEST MORE INFORMATION FROM STUDENT\n\nEnter instructions for the student (e.g. Please upload a clearer payment screenshot or correct transaction ID):", "Please upload a clearer payment screenshot proof.");

  if (note && note.trim()) {
    const res = window.ilmDB.requestMoreInfoWorkflow(payId, note.trim(), `${currentAdminRole.replace('_', ' ')}: Shahid Akram`);
    if (res.success) {
      window.showToast('Requested more information from student.', 'info');
      closeVerificationModal();
      renderAdminStats();
      renderPaymentsTable();
    }
  }
};

function renderCertificatesTable() {
  const container = document.getElementById('certificatesTableBody');
  if (!container || !window.ilmDB) return;

  const certs = window.ilmDB.getCertificates();
  container.innerHTML = certs.map(c => `
    <tr>
      <td><code>${c.id}</code></td>
      <td><strong>${c.studentName}</strong></td>
      <td>${c.courseName}</td>
      <td>${c.issueDate}</td>
      <td><span class="badge" style="background:#dbeafe; color:#1e40af; padding:0.25rem 0.6rem; border-radius:0.25rem; font-weight:700;">${c.grade}</span></td>
      <td>
        <a href="verify-certificate.html?id=${c.id}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-blue btn-sm"><i class="fas fa-external-link-alt"></i> Verify View</a>
      </td>
    </tr>
  `).join('');
}

window.handleGenerateCertificate = function(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const certId = 'ILM-2026-' + Math.floor(100000 + Math.random() * 900000);
  const newCert = {
    id: certId,
    studentName: formData.get('studentName'),
    fatherName: formData.get('fatherName'),
    courseId: formData.get('courseId'),
    courseName: form.querySelector(`option[value="${formData.get('courseId')}"]`)?.textContent || 'Course',
    issueDate: formData.get('issueDate') || new Date().toISOString().split('T')[0],
    grade: formData.get('grade') || 'A Distinction',
    status: 'Verified',
    cnic: formData.get('cnic') || 'N/A'
  };

  window.ilmDB.addCertificate(newCert);
  window.showToast(`Certificate ${certId} generated successfully!`, 'success');
  form.reset();
  renderCertificatesTable();
  renderAdminStats();
};

function renderCoursesAdmin() {
  const container = document.getElementById('adminCoursesGrid');
  if (!container || !window.ilmDB) return;

  const courses = window.ilmDB.getCourses();
  container.innerHTML = courses.map(c => `
    <div class="card" style="background:#ffffff; border:1px solid #e2e8f0; padding:1.25rem; border-radius:0.75rem;">
      <h4 style="color:#046a38; font-weight:800; font-size:1.1rem; margin-bottom:0.2rem;">${c.title}</h4>
      
      <p style="font-size:0.85rem; color:#64748b; margin-bottom:1rem;">${c.shortDesc}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:0.75rem;">
        <span style="font-weight:800; color:#0284c7; font-size:1.1rem;">Rs. ${c.fee.toLocaleString()} PKR</span>
        <button onclick="editCourseFee('${c.id}')" class="btn btn-outline btn-sm"><i class="fas fa-edit"></i> Edit Fee</button>
      </div>
    </div>
  `).join('');
}

window.editCourseFee = function(courseId) {
  const course = window.ilmDB.getCourseById(courseId);
  if (!course) return;

  const newFee = prompt(`Enter new fee in PKR for "${course.title}":`, course.fee);
  if (newFee !== null && !isNaN(newFee)) {
    course.fee = Number(newFee);
    window.ilmDB.saveCourse(course);
    window.showToast(`Fee updated for ${course.title}!`, 'success');
    renderCoursesAdmin();
  }
};

function renderSettingsForm() {
  const settings = window.ilmDB.getSettings();
  
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  };

  const setCheck = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.checked = val !== false;
  };

  setVal('setPhone', settings.phone);
  setVal('setEmail', settings.email);
  setVal('setWhatsapp', settings.whatsapp);
  setVal('setAddress', settings.address);

  const p = settings.paymentAccounts || {};
  setVal('setJazzcashTitle', p.jazzcash?.title || 'Shahid Akram');
  setVal('setJazzcashNumber', p.jazzcash?.number || '03206546008');
  setCheck('setJazzcashEnabled', p.jazzcash?.enabled);

  setVal('setEasypaisaTitle', p.easypaisa?.title || 'Shahid Akram');
  setVal('setEasypaisaNumber', p.easypaisa?.number || '03206546008');
  setCheck('setEasypaisaEnabled', p.easypaisa?.enabled);

  setVal('setSadapayTitle', p.sadapay?.title || 'Shahid Akram');
  setVal('setSadapayNumber', p.sadapay?.number || '03206546008');
  setCheck('setSadapayEnabled', p.sadapay?.enabled);

  setVal('setBankTitle', p.bank?.title || 'Shahid Akram');
  setVal('setBankIban', p.bank?.iban || 'PK36MEZN0001020304050607');
  setCheck('setBankEnabled', p.bank?.enabled);
}

window.handleSaveSettings = function(event) {
  event.preventDefault();
  const settings = window.ilmDB.getSettings();

  settings.phone = document.getElementById('setPhone').value;
  settings.email = document.getElementById('setEmail').value;
  settings.whatsapp = document.getElementById('setWhatsapp').value;
  settings.address = document.getElementById('setAddress').value;

  if (!settings.paymentAccounts) settings.paymentAccounts = {};

  settings.paymentAccounts.jazzcash = {
    title: document.getElementById('setJazzcashTitle').value,
    number: document.getElementById('setJazzcashNumber').value,
    enabled: document.getElementById('setJazzcashEnabled').checked
  };

  settings.paymentAccounts.easypaisa = {
    title: document.getElementById('setEasypaisaTitle').value,
    number: document.getElementById('setEasypaisaNumber').value,
    enabled: document.getElementById('setEasypaisaEnabled').checked
  };

  settings.paymentAccounts.sadapay = {
    title: document.getElementById('setSadapayTitle').value,
    number: document.getElementById('setSadapayNumber').value,
    enabled: document.getElementById('setSadapayEnabled').checked
  };

  settings.paymentAccounts.bank = {
    title: document.getElementById('setBankTitle').value,
    bankName: "Meezan Bank Limited",
    iban: document.getElementById('setBankIban').value,
    enabled: document.getElementById('setBankEnabled').checked
  };

  window.ilmDB.saveSettings(settings);
  window.showToast('Payment Credentials & Site Settings Successfully Updated!', 'success');
};

