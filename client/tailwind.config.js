/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#695B5B",
        "secondary": "#AD63E8",
        "tartiary": "#A17EED",
        "pink": "#F6A4E9" 

      },
      fontFamily: {
        sedgwick: ['"Sedgwick Ave Display"', 'cursive'],
        
      }
    },
  },
  plugins: [],
}

