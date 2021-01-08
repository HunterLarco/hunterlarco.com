const { merge } = require('webpack-merge');

const { VueLoaderPlugin } = require('vue-loader');

const BaseConfig = require('./base.config.js');
const environment = require('../util/environment');
const workspace = require('../util/workspace');

module.exports = (env, flags) =>
  merge(BaseConfig(env, flags), {
    resolve: {
      extensions: ['.vue', '.css', '.scss'],
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
              test: /\.(css|sass|scss)$/,
              resourceQuery: /^\?raw$/,
              use: [
                'vue-style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ],
            },
            {
              test: /\.(css|sass|scss)$/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: environment.select(env, {
                        production: '[hash:base64]',
                        local: '[path][name]__[local]',
                      }),
                    },
                  },
                },
                'postcss-loader',
                'sass-loader',
              ],
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                name: environment.select(env, {
                  production: 'static/images/[hash:base64].[ext]',
                  local: 'static/images/[name].[hash:base64].[ext]',
                }),
              },
            },
            'image-webpack-loader',
          ],
        },
        {
          test: /\.(mp4)$/,
          loader: 'file-loader',
          options: {
            esModule: false,
            name: environment.select(env, {
              production: 'static/video/[hash:base64].[ext]',
              local: 'static/video/[name].[hash:base64].[ext]',
            }),
          },
        },
        {
          test: /\.(woff2?|otf|ttf|eot)$/,
          loader: 'file-loader',
          options: {
            esModule: false,
            name: environment.select(env, {
              production: 'static/fonts/[hash:base64].[ext]',
              local: 'static/fonts/[name].[hash:base64].[ext]',
            }),
          },
        },
      ],
    },

    performance: {
      assetFilter(assetFilename) {
        const ignore = [/^static\/video\//, /\.map$/];
        return !ignore.some((pattern) => assetFilename.match(pattern));
      },
    },

    plugins: [new VueLoaderPlugin()],
  });
