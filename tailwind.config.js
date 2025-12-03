/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1'
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.06)'
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
    },
  },
  plugins: [],
}
