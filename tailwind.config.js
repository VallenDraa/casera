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
        'green-ball': {
          '0%': {
            transform: 'translateX(0px)',
          },
          '50%': {
            transform: 'translateX(80px) scale(0.825)',
          },
          '100%': {
            transform: 'translateX(-20px) scale(1.25)',
          },
        },
        'orange-ball': {
          '0%': {
            transform: 'translateX(0px)',
          },
          '50%': {
            transform: 'translateX(-80px) scale(1.25)',
          },
          '100%': {
            transform: 'translateX(20px) scale(0.825)',
          },
        },

        'slide-x': {
          '0%': {
            opacity: '.1',
            transform: 'translateX(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        timer: {
          '0%': {
            width: '100%',
          },
          '100%': {
            width: '0',
          },
        },
      },
      animation: {
        timer: 'timer 5s ease-in-out',
        'slide-x': 'slide-x 300ms ease-in-out',
        'blink-right': 'blink-right 2s ease-in-out infinite',
        'green-ball': 'green-ball 2s ease-in-out infinite alternate',
        'orange-ball': 'orange-ball 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
