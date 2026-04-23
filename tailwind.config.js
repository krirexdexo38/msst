/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        complexity: {
          o1: '#10b981',
          on: '#f59e0b',
          olog: '#3b82f6',
          on2: '#ef4444',
          o2n: '#8b5cf6',
          ofact: '#dc2626',
        }
      }
    },
  },
  plugins: [],
}
