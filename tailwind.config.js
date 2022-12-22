const plugin = require('tailwindcss/plugin');

const Button = (theme) => {
  const colors = {};
  Object.keys(theme('colors')).forEach((color) => {
    colors[`&-${color}-filled`] = {
      [`@apply bg-${color}-500 border-transparent hover:bg-${color}-400 text-white`]: {},
    };
    colors[`&-${color}-outline`] = {
      [`@apply text-${color}-500 border-${color}-500 hover:text-${color}-400 hover:border-${color}-400 bg-transparent`]: {},
    };
    colors[`&-${color}-text`] = {
      [`@apply text-${color}-500 border-transparent shadow-none hover:text-${color}-400 hover:border-${color}-400 bg-transparent`]: {},
    };
  });
  return {
    '.btn': {
      '@apply inline-flex items-center justify-center whitespace-nowrap box-border rounded-md text-base border-2 font-medium p-2 shadow-sm': {},
      '&-icon': {
        '@apply hover:text-gray-500 hover:bg-gray-100 shadow-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500': {},
      },
      ...colors,
    }
  }
};

module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  darkMode: 'class',
  // darkMode: 'media',
  theme: {
    linearBorderGradients: {
      colors: {
        'indigo': ['#ebf4ff', '#c3dafe', '#5a67d8'],
      },
    },
    repeatingLinearBorderGradients: theme => ({
      colors: theme('linearBorderGradients.colors'), // defaults to {}
    }),
  },
  variants: {
    linearBorderGradients: ['responsive'], // defaults to ['responsive']
    repeatingLinearBorderGradients: ['responsive'], // defaults to ['responsive']
  },
  plugins: [
    require('tailwindcss-border-gradients')(),
    plugin(function({ addComponents, theme }) {
      addComponents(Button(theme))
    })
  ],
}
