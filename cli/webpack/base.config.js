const webpack = require('webpack');

const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('../util/environment');
const workspace = require('../util/workspace');

module.exports = (env, flags) => ({
  mode: environment.select(env, {
    production: 'production',
    local: 'development',
  }),

  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': workspace.ROOT,
    },
  },

  optimization: {
    minimize: environment.select(env, {
      production: true,
      local: false,
    }),
    removeAvailableModules: true,
    removeEmptyChunks: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [workspace.resolve('src')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['@babel/plugin-transform-runtime'],
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        environment.select(env, {
          production: 'production',
          local: 'development',
        })
      ),
    }),
    new webpack.DefinePlugin({
      'process.fido.env': JSON.stringify(env),
      'process.fido.flags': JSON.stringify(flags),
    }),
    new WriteFilePlugin(),
  ],
});
