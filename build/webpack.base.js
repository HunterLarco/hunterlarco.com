const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: './src/main.js',

  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      '/': resolve('src/'),
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
              localIdentName:
                process.env.NODE_ENV === 'production'
                  ? '[hash:base64]'
                  : '[local]_[hash:base64:8]',
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              data: [
                '@import "//scss/fonts";',
                '@import "//scss/layout";',
                '@import "//scss/colors";',
              ].join(''),
            },
          },
        ],
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name:
              process.env.NODE_ENV === 'production'
                ? '[hash:base64].[ext]'
                : '[name].[ext]',
            outputPath: 'images',
          },
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], { root: resolve('') }),
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,

      // Options
      title: 'Hunter Larco',
      mobile: true,
      hash: true,
      lang: 'en-US',
      appMountId: 'app',
      links: ['https://fonts.googleapis.com/css?family=Fira+Mono'],
    }),
    new VueLoaderPlugin(),
  ],

  output: {
    filename: 'main.js',
    path: resolve('dist/'),
  },
};
