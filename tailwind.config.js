/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFBF8',
          100: '#FAF7F2',
          200: '#F4EDE3',
          300: '#EDE0D0',
          DEFAULT: '#FAF7F2',
        },
        sand: {
          100: '#EDE0D0',
          200: '#E0CDBA',
          300: '#D4BAA4',
          DEFAULT: '#E0CDBA',
        },
        sage: {
          100: '#C8D5C5',
          200: '#9DB59A',
          300: '#718F6D',
          400: '#4E7249',
          500: '#3D5A47',
          DEFAULT: '#3D5A47',
        },
        charcoal: {
          100: '#6B6B69',
          200: '#3D3D3B',
          300: '#1A1A18',
          DEFAULT: '#1A1A18',
        },
        gold: {
          100: '#EDD9A3',
          200: '#D4B96A',
          300: '#B89840',
          DEFAULT: '#D4B96A',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'label': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.15em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '100': '25rem',
        '120': '30rem',
        '140': '35rem',
        '160': '40rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '100rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'line-expand': 'lineExpand 0.8s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineExpand: {
          '0%': { scaleX: '0', transformOrigin: 'left' },
          '100%': { scaleX: '1', transformOrigin: 'left' },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '2/3': '2 / 3',
      },
    },
  },
  plugins: [],
};
