/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: '#0F0F0F',
        panel: '#1A1A1A',
        dot: '#2A2A2A',
        neon: '#FF006E',
        cyan: '#00F0FF',
        berry: '#C71585',
        violet: '#6B1E7D',
        paper: '#E5E5E5',
        muted: '#B8B8B8',
      },
    },
  },
  plugins: [],
}
