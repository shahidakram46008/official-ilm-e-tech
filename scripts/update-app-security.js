const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'assets', 'js', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Add sanitizeText utility if not present
if (!appJs.includes('window.sanitizeText')) {
  const sanitizeUtility = `
// Enterprise Input Sanitization Utility (Anti-XSS & SQLi Defense)
window.sanitizeText = function(str) {
  if (typeof str !== 'string') return str || '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[;\"'\\\`]/g, '') // Strip SQL/script injection metacharacters
    .trim();
};
`;
  appJs = sanitizeUtility + appJs;
}

// Ensure admission form sanitizes input fields
appJs = appJs.replace(/const admissionData = {[\s\S]*?};/,
  `const admissionData = {
      appId: refNo,
      fullName: window.sanitizeText(formData.get('fullName')),
      fatherName: window.sanitizeText(formData.get('fatherName')),
      cnic: window.sanitizeText(formData.get('cnic') || 'N/A'),
      phone: window.sanitizeText(formData.get('phone')),
      whatsapp: window.sanitizeText(formData.get('whatsapp')),
      email: window.sanitizeText(formData.get('email')),
      city: window.sanitizeText(formData.get('city')),
      courseId: window.sanitizeText(courseId),
      courseName: window.sanitizeText(courseName),
      preferredMode: window.sanitizeText(formData.get('preferredMode') || 'Online Live'),
      status: isFree ? '100% Free Enrollment Approved' : 'Pending Fee Verification',
      date: new Date().toISOString().split('T')[0]
    };`
);

// Ensure payment form sanitizes input fields
appJs = appJs.replace(/const paymentData = {[\s\S]*?};/,
  `const paymentData = {
      payId: payId,
      appId: window.sanitizeText(formData.get('appId') || 'APP-DIRECT'),
      studentName: window.sanitizeText(formData.get('studentName')),
      courseName: window.sanitizeText(formData.get('courseName')),
      amount: window.sanitizeText(formData.get('amount')),
      method: window.sanitizeText(formData.get('paymentMethod')),
      trxId: window.sanitizeText(formData.get('trxId')),
      status: 'Pending Verification',
      date: new Date().toISOString().split('T')[0]
    };`
);

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('[OK] assets/js/app.js updated with anti-XSS client input sanitization.');

