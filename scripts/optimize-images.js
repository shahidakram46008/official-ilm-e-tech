const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImages() {
  console.log('--- Generating WebP versions of all team and brand images ---');
  const images = [
    'assets/images/ceo.jpg',
    'assets/images/founder.jpg',
    'assets/images/brands/cheezious-bite.jpg',
    'assets/images/brands/pizza-pop.jpg',
    'assets/images/brands/pizza-venue.png',
    'assets/images/brands/slice-up.jpg',
    'assets/images/brands/the-smart-school.png'
  ];

  for (const imgPath of images) {
    if (fs.existsSync(imgPath)) {
      const ext = path.extname(imgPath);
      const webpPath = imgPath.replace(ext, '.webp');
      await sharp(imgPath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      console.log(`[OK] Generated WebP: ${webpPath}`);
    }
  }
}

optimizeImages().catch(console.error);

