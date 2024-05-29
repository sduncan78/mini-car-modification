const theme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mini: ['MINI Serif', ...theme.fontFamily.serif]
      },
      colors: {
        'mini-gray': '#4A4A4A',
        'mini-blue': '#347C9F',
        'mini-light-gray': '#707070',
        'mini-very-light-gray': '#E7E6E6',
        'mini-orange': '#DE8C33'
      }
    }
  },
  plugins: [
    require('tailwindcss-textshadow'),
    require('@tailwindcss/typography')
  ]
}
