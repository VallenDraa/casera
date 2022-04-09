module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        ssp: ['Source Serif Pro', 'serif'],
      },
      keyframes: {
        'blink-right': {
          '0%': {
            transform: 'translate(-10px)',
          },
          '50%': {
            transform: 'translate(0px)',
          },
          '100%': {
            transform: 'translate(-10px)',
          },
        },
      },
      animation: {
        'blink-right': 'blink-right 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
