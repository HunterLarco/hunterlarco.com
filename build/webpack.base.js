const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

const utils = require('./utils.js');

module.exports = {
  entry: utils.resolve('src/main.js'),
  output: {
    filename: 'main.js',
    path: utils.resolve('dist'),
  },

  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      '@': utils.resolve('/'),
    },
  },

  output: {
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        oneOf: [
          {
            test: /\.(css|sass)$/,
            resourceQuery: /^\?raw$/,
            use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
                    dev: '[local]_[hash:base64:8].[ext]',
                    local: '[path][name]__[local]',
                  }),
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          },
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
              dev: 'image/[hash:base64].[ext]',
              local: 'images/[path][name].[ext]',
            })
          ),
        },
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: utils.assetPath(
            utils.envSelector({
              prod: 'fonts/[hash:base64].[ext]',
              dev: 'fonts/[hash:base64].[ext]',
              local: 'fonts/[path][name].[ext]',
            })
          ),
        },
      },
    ],
  },

  optimization: {
    minimize: utils.envSelector({
      prod: true,
      dev: true,
      local: false,
    }),
    removeAvailableModules: utils.envSelector({
      prod: true,
      dev: true,
      local: false,
    }),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.RELEASE_ENV': JSON.stringify(process.env.RELEASE_ENV),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: utils.resolve('/'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'Boilerplate Frontend',
      mobile: true,
      hash: true,
      lang: 'en-US',
      appMountId: 'app',
      meta: [
        {
          name: 'description',
          content: 'Boilerplate Terrace frontend example',
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      inject: 'force',
      logo: utils.resolve('assets/images/favicon.png'),
      prefix: 'static/favicon/',
      mode: 'webapp',
      favicons: {
        appName: 'Boilerplate Frontend',
        icons: {
          appleStartup: false,
          coast: false,
          windows: false,
          yandex: false,
        },
      },
    }),
    new VueLoaderPlugin(),
  ],
};
