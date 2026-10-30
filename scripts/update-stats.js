const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

console.log('--- Applying Stats Updates ---');

// 1. UPDATE index.html
const indexPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const modernStatsRow = `      <!-- Real Impact Numbers Grid -->
      <div class="brand-impact-stats-row">
        <div class="brand-stat-box">
          <div class="brand-stat-num" data-counter="10">10+</div>
          <div class="brand-stat-lbl">10+ Trusted Brands &amp; Partners</div>
          <div style="font-family:'Noto Nastaliq Urdu', serif; font-size:0.85rem; color:#047857; margin-top:0.25rem;">ہمارے 10 قابلِ اعتماد پارٹنرز</div>
        </div>
        <div class="brand-stat-box">
          <div class="brand-stat-num" data-counter="50">50+</div>
          <div class="brand-stat-lbl">Commercial Campaigns &amp; Ads</div>
          <div style="font-family:'Noto Nastaliq Urdu', serif; font-size:0.85rem; color:#047857; margin-top:0.25rem;">کمرشل مہمات و ویڈیو ایڈز</div>
        </div>
        <div class="brand-stat-box">
          <div class="brand-stat-num" data-counter="150">150+</div>
          <div class="brand-stat-lbl">150+ Certified Students &amp; Trainees</div>
          <div style="font-family:'Noto Nastaliq Urdu', serif; font-size:0.85rem; color:#047857; margin-top:0.25rem;">150+ کامیاب اور تربیت یافتہ طلبہ</div>
        </div>
        <div class="brand-stat-box">
          <div class="brand-stat-num" data-counter-prefix="₨ " data-counter="3" data-counter-suffix="M+ / Month">₨ 3M+ / Month</div>
          <div class="brand-stat-lbl">₨ 3M+ / Month Client Revenue Impact</div>
          <div style="font-family:'Noto Nastaliq Urdu', serif; font-size:0.85rem; color:#047857; margin-top:0.25rem;">30 لاکھ+ روپے ماہانہ کلائنٹ ریونیو گروتھ</div>
        </div>
      </div>`;

indexHtml = indexHtml.replace(/<div class="brand-impact-stats-row">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
  modernStatsRow + '\n\n    </div>\n  </section>'
);

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('[OK] index.html stats updated.');

// 2. UPDATE about.html
const aboutPath = path.join(rootDir, 'about.html');
let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

// Update narrative in about.html
aboutHtml = aboutHtml.replace(
  /Dr\. Shahid Akram Mustafai and ILM E TECH have successfully collaborated with 50\+ commercial brands/g,
  'Dr. Shahid Akram Mustafai and ILM E TECH have successfully collaborated with 10+ trusted commercial brands'
);

aboutHtml = aboutHtml.replace(/<div class="brand-impact-stats-row">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
  modernStatsRow + '\n\n    </div>\n  </section>'
);

fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
console.log('[OK] about.html stats updated.');

// 3. UPDATE assets/js/app.js to add Smooth Counter Animation
const appJsPath = path.join(rootDir, 'assets', 'js', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const counterScript = `
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

          el.textContent = \`\${prefix}\${current}\${suffix}\`;

          if (progress < 1) {
            requestAnimationFrame(updateVal);
          } else {
            el.textContent = \`\${prefix}\${targetVal}\${suffix}\`;
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
`;

if (!appJs.includes('initMetricCounters')) {
  appJs += '\n' + counterScript;
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('[OK] assets/js/app.js updated with smooth metric counter animations.');
}

console.log('--- Stats Update Completed ---');
