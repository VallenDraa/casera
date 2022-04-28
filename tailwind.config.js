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
        toast: {
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
        'scale-in': {
          '0%': {
            opacity: '.0',
            transform: 'scale(20%)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(100%)',
          },
        },
        'scale-out': {
          '0%': {
            opacity: '1',
            transform: 'scale(100%)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(20%)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'fade-in-bottom': {
          '0%': {
            transform: 'translateY(15px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: '1',
          },
        },
        'fade-out-bottom': {
          '0%': {
            transform: 'translateY(0px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(15px)',
            opacity: '0',
          },
        },
        'fade-in-left': {
          '0%': {
            transform: 'translateX(-15px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0px)',
            opacity: '1',
          },
        },
        'fade-out-left': {
          '0%': {
            transform: 'translateX(0px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-15px)',
            opacity: '0',
          },
        },
        'fade-in-left-homeAside': {
          '0%': {
            transform: 'translateX(-15px) rotate(-90deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0px) rotate(-90deg)',
            opacity: '1',
          },
        },
        'menu-o': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'menu-c': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        timer: 'timer 5s ease-in-out',
        'menu-o': 'menu-o 500ms ease-in-out',
        'menu-c': 'menu-c 500ms ease-in-out',
        'scale-in': 'scale-in 300ms ease-in-out',
        'scale-out': 'scale-out 300ms ease-in-out',
        'fade-in': 'fade-in 300ms ease-in-out',
        'fade-out': 'fade-out 300ms ease-in-out',
        'fade-in-left-homeAside': 'fade-in-left-homeAside 300ms ease-in-out',
        'fade-in-bottom': 'fade-in-bottom 300ms ease-in-out',
        'fade-out-bottom': 'fade-out-bottom 300ms ease-in-out',
        'fade-in-left': 'fade-in-left 300ms ease-in-out',
        'fade-out-left': 'fade-out-left 300ms ease-in-out',
        toast: 'toast 300ms ease-in-out',
        'blink-right': 'blink-right 2s ease-in-out infinite',
        'green-ball': 'green-ball 2s ease-in-out infinite alternate',
        'orange-ball': 'orange-ball 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
