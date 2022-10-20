/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        1: ['Lora', 'serif'],

        2: ['Lustria', 'serif'],
    
        3: ['Montserrat', 'sans-serif']
      },
      colors:{
        1 : "#557B83",
        2 : "#39AEA9",
        3 : "#A2D5AB",
        4 : "#E5EFC1"
      }
    },
  },
  plugins: [],
}