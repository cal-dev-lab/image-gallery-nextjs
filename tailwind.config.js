/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      poppins: ['poppins', 'Poppins', 'sans-serif'],
      'baunk': ['baunk', 'Baunk'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
