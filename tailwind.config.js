/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./thank-you.html",
    "./admission-success.html",
    "./assets/js/ai-robot.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#01140c',
          deep: '#032819',
          emerald: '#06492F',
          surface: '#053321',
          border: '#11543a',
          silver: '#E2E8F0',
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

