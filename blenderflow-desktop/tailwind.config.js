/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blender-orange': '#ea7600',
        'blender-orange-hover': '#ff9800',
        'surface-bg': '#0B0F19',
        'surface-card': '#111827',
        'surface-border': '#1F2937',
        'surface-hover': '#262a35',
        'accent-indigo': '#6366F1',
        'success-emerald': '#10B981',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
