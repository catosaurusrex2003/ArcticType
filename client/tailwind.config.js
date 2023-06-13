/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "background-gray":"#323437",
        "background-dark-gray":"#2c2e31",
        "text-color":"#636568",
        "text-color-imp":"#646669"
      }
    },
  },
  plugins: [],
}
