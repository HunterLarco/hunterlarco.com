module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: [
        "> 1%",
        "last 2 versions",
        "not ie <= 8",
      ],
    },
    'postcss-sorting': {
      'properties-order': 'alphabetical',
    },
  },
}
