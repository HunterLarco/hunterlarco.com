const path = require('path')
const merge = require('webpack-merge')

const webpackBase = require('./webpack.base.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(webpackBase, {
  mode: 'development',
  devtool: 'source-map',

  devServer: {
    contentBase: resolve('dist/'),
    compress: true,
    port: 8080,
  },
})
