module.exports = {
  plugins: [
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
