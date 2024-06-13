module.exports = {

  purge: [],

  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    extend: {
      colors: {
        'custom-blue': '#3B82F6',
        'custom-dark':'#1F2937', 
        
      },
    },
   },
   variants: {
     extend: {},
   },
   plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.placeholder-custom-blue::placeholder': {
          color: '#3B82F6',
        },
      });
    },
  ],
 }