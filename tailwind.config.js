/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': 'url(/img/login_background.jpg)',
      },
    },
    colors: {
      primary: '#f05356',
      secondary: '#fafafa',
      white: '#ffffff',
      blue: '#35abec',
      black: '#262626',
      green: '#82c91e',
      label: '#f05356',
      lable1: '#e87d33',
      lable2: '#0f7fe8',
      lable3: '#F40612',
      lable4: '#fdf137',
      lable5: '#f1dede',
      lable6: '#acacacc4',
      fontcolor1: '#333333',
      fontcolor2: '#f05356',
      fontcolor3: '#7c7578',
      'fontcolor-white': '#ffffff',
      transparent: '#fafafa9',
    },
  },
  plugins: [],
};
