/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      backgroundImage: {
        'gif-background': "url('https://s12.gifyu.com/images/Sf7ot.gif')",
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}