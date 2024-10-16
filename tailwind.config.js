/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mdmBlue: '#235789',
        mdmGray: '#737373',
        mdmRed: '#E75B25',
        mdmGrayBorder: '#D2D2D2',
      },
    },
  },
  plugins: [],
};
