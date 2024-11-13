/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          100: '#FFB84D',
          200: '#FF9E2C',
          500: '#FF3A00',
        },
        black: '#1A1A1A',
        grey: {
          100: '#F5F5F5',
          500: '#757575',
        },
        customTeal: '#419eae', 
      },
    },
  },
  darkMode: 'class',
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-orange-100': theme('colors.orange.100'),
          '--color-orange-200': theme('colors.orange.200'),
          '--color-orange-500': theme('colors.orange.500'),
          '--color-orange-600': theme('colors.orange.600'),
          '--color-orange-700': theme('colors.orange.700'),
          '--color-black': theme('colors.black'),
          '--color-grey-100': theme('colors.grey.100'),
          '--color-grey-500': theme('colors.grey.500'),
          '--color-teal': theme('colors.customTeal'),
        },
      });
    },
  ],
}