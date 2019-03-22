const merge = require('webpack-merge');

const utils = require('./utils.js');
const webpackBase = require('./webpack.base.js');

module.exports = merge(webpackBase, {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    contentBase: utils.resolve('dist/'),
    compress: true,
    port: 8080,
  },
});
