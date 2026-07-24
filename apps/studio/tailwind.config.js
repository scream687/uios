/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#08090a',
          surface: '#0f1115',
          card: '#161920',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#5e6ad2',
          glow: '#8a99ff',
        },
      },
    },
  },
  plugins: [],
};
