const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = content;

  // Replace ceo.jpg with ceo.webp
  updated = updated.replace(/src="assets\/images\/ceo\.jpg"/g, 'src="assets/images/ceo.webp"');
  updated = updated.replace(/src="assets\/images\/founder\.jpg"/g, 'src="assets/images/founder.webp"');

  // Replace brands
  updated = updated.replace(/src="assets\/images\/brands\/cheezious-bite\.jpg"/g, 'src="assets/images/brands/cheezious-bite.webp"');
  updated = updated.replace(/src="assets\/images\/brands\/pizza-pop\.jpg"/g, 'src="assets/images/brands/pizza-pop.webp"');
  updated = updated.replace(/src="assets\/images\/brands\/pizza-venue\.png"/g, 'src="assets/images/brands/pizza-venue.webp"');
  updated = updated.replace(/src="assets\/images\/brands\/slice-up\.jpg"/g, 'src="assets/images/brands/slice-up.webp"');
  updated = updated.replace(/src="assets\/images\/brands\/the-smart-school\.png"/g, 'src="assets/images/brands/the-smart-school.webp"');

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`[OK] Updated WebP brand/ceo images in ${file}`);
  }
});

