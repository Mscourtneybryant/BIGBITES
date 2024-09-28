// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        'fade-in':'fadeIn 1.5s ease-out forwards'
      },
      keyframes:{
        fadeIn:{
          '0%': { opacity: 0},
          '100%':{ opacity:1 }
        }
      },
      colors: {
        primary: '#FFFF00',
        btn: '#FFFF00',
        alert:'#FFFF00',
        hoverClr: '#FFA500',  
        subtleBg: '#FFDA89',
        btn2: '#FFDA89',
        alert2: '#FFDA89',
        error: '#FF7F50',
        delete: '#FF7F50',
        bg: '#FFFFFF'
      },
      spacing: {
        '3rem': '3rem',
        '7rem': '7rem'
      }
    },
  },
  plugins: [],
}
