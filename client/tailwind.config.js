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
        // glacier theme
        "glacier-primary":"#8FB3FF",
        "glacier-subprimary":"#253352",
        "glacier-secondary":"#001952",
        "glacier-accent":"#86DBED",
        "glacier-accent2":"#F199BF",
        "glacier-special":"#05C3FF",
        "glacier-background":"#030417",
        "glacier-error":"#DD5F5F",
        "glacier-untyped":"#777777",
        "glacier-button-green":"#68A741",
        "glacier-button-green-hover":"#82BE5D",
        "glacier-button-green-active":"#395527",
        "glacier-dark":"#2F2B45",
        "glacier-dark-hover":"#3E3957",
      }
    },
  },
  plugins: [],
}
