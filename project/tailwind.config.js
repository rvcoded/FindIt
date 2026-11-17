/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcf9',
          100: '#faf8f3',
          200: '#f4f0e6',
          300: '#ece6d5',
        },
        sand: {
          50: '#f9f7f2',
          100: '#f0ebe0',
          200: '#e2d9c5',
          300: '#cdbfa0',
          400: '#b5a279',
          500: '#9d8757',
          600: '#7e6c44',
        },
        charcoal: {
          50: '#f6f6f5',
          100: '#e8e8e6',
          200: '#d1d1ce',
          300: '#a9a9a4',
          400: '#7a7a75',
          500: '#56564f',
          600: '#3d3d37',
          700: '#2a2a25',
          800: '#1c1c18',
          900: '#121210',
        },
        accent: {
          50: '#fef9f0',
          100: '#fdedd4',
          200: '#fad9a8',
          300: '#f6be71',
          400: '#f09c3e',
          500: '#ec7e1b',
          600: '#d96310',
          700: '#b74a10',
          800: '#923b14',
          900: '#763314',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        scaleIn: 'scaleIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
