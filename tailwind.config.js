module.exports = {
  content: ['./src/**/*.jsx'],
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
        'orange-ball': {
          '0%': {
            transform: 'translateX(0)',
            scale: '0.8',
          },
          '50%': {
            transform: 'translateX(-20px)',
            scale: '1.2',
          },

          '100%': {
            transform: 'translateX(50px)',
            scale: '0.8',
          },
        },
        'green-ball': {
          '0%': {
            transform: 'translateX(0)',
            scale: '1.2',
          },
          '50%': {
            transform: 'translateX(120px)',
            scale: '0.8',
          },
          '100%': {
            transform: 'translateX(-50px)',
            scale: '1.2',
          },
        },
      },
      animation: {
        'blink-right': 'blink-right 2s ease-in-out infinite',
        'orange-ball': 'orange-ball 3s ease-in-out infinite alternate ',
        'green-ball': 'green-ball 3s ease-in-out infinite alternate ',
      },
    },
  },
  plugins: [],
};
