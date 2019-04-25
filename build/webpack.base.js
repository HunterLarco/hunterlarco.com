const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const utils = require('./utils.js');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: utils.resolve('dist/'),
  },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      '@': utils.resolve('src/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(css|sass)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: utils.envSelector({
                prod: '[hash:base64]',
                dev: '[local]_[hash:base64:8]',
              }),
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        include: [utils.resolve('src')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['@babel/plugin-transform-runtime'],
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: utils.assetPath(
            utils.envSelector({
              prod: 'images/[hash:base64].[ext]',
              dev: 'images/[name].[ext]',
            })
          ),
        },
      },
      {
        test: /\.glsl%/,
        use: 'raw-loader',
      },
    ],
  },

  optimization: {
    minimize: true,
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], { root: utils.resolve('') }),
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,

      // Options
      title: 'Hunter Larco',
      mobile: true,
      hash: true,
      lang: 'en-US',
      appMountId: 'app',
      links: ['https://fonts.googleapis.com/css?family=Open+Sans'],
    }),
    new VueLoaderPlugin(),
  ],
};
