module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  darkMode: 'media',
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
  ],
}
