const { merge } = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BaseWebConfig = require('./base.web.config.js');
const workspace = require('../util/workspace');

module.exports = (env, flags) =>
  merge(BaseWebConfig(env, flags), {
    entry: {
      main: workspace.resolve('src/web/main.js'),
    },

    output: {
      path: workspace.resolve(`build/${env}/web`),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        title: 'Hunter Larco',
        mobile: true,
        hash: true,
        lang: 'en-US',
        appMountId: 'app',
        meta: [
          {
            name: 'description',
            content: "Hunter Larco's personal website.",
          },
        ],
      }),
      new FaviconsWebpackPlugin({
        logo: workspace.resolve('src/web/assets/favicon.png'),
        prefix: 'static/favicon/',
        favicons: {
          icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
          },
        },
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: workspace.resolve('src/web/firebase.json') }],
      }),
    ],
  });
