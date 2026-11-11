/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./thank-you.html",
    "./admission-success.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#031c15',
          deep: '#063D2E',
          emerald: '#0B4635',
          surface: '#0f4436',
          border: '#1a5c4a',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-hover': '#b59228',
          accent: '#10B981'
        }
      },
      fontFamily: {
        nastaleeq: ['"Jameel Noori Nastaleeq"', '"Noto Nastaliq Urdu"', 'Gulzar', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        latin: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
