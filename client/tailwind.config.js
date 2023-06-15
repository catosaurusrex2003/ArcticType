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
        // original theme
        "background-gray":"#323437",
        "background-dark-gray":"#2c2e31",
        "background-darker-gray":"#1f1f21",
        "text-color":"#636568",
        "text-color-imp":"#646669",

        // blue theme
        "donkey-darkBlue":"#08082C", //
        "donkey-lessdark":"#101053",
        "donkey-navyBlue":"#120566",
        "donkey-federalBlue":"#1B0F67",
        "donkey-violetBlue":"#3943B7",
        "donkey-celestialBlue":"#449DD1",
        "donkey-skyBlue":"#78C0E0",

        // red
        "donkey-grape":"#7209B7",
        "donkey-rose":"#F72585",
        "donkey-zaffre":"#3A0CA3",
        "donkey-neon":"#4361EE",
        "donkey-veronica":"#B14ADD",
        "donkey-magenta":"#FF29D1",
        "donkey-tropicalIndigo":"#E2CCFF",
        "donkey-dark-purple":"#1F002C",

        // orange
        "donkey-utorange":"#FB8500",
      }
    },
  },
  plugins: [],
}
