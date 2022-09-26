/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**.tsx',
    './index.html'
  ],
  theme: {
    fontFamily:{
      'sans': ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        sky:"url('/background-sky.png')",
        'nlw-gradient':'linear-gradient(90deg, #9572FC 30%, #43E7AD 60%, #E1D55D 40%)',
        'nlw-game-gradient':'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)'
      }
    },
  },
  plugins: [],
}
