const webpack = require('webpack');
const Server = require('webpack-dev-server');
const createLogger = require('webpack-dev-server/lib/utils/createLogger');

const argparse = require('../util/argparse.js');
const environment = require('../util/environment.js');
const logging = require('../util/logging.js');
const webpackHelpers = require('../util/webpack.js');

async function runDevServer(compiler, args) {
  const server = new Server(
    compiler,
    {
      hot: true,
      port: args['dev-server-port'],
      stats: 'none',
      historyApiFallback: true,
    },
    createLogger({ noInfo: !args.verbose })
  );

  compiler.hooks.watchRun.tap('fido', () => {
    webpackHelpers.logChangedFiles(compiler, { namespace: 'web' });
  });
  compiler.hooks.done.tap('fido', (stats) => {
    webpackHelpers.logBuildStats(stats, {
      verbose: args.verbose,
      namespace: 'web',
    });
    webpackHelpers.logBuildSummary(stats, { namespace: 'web' });
  });

  return new Promise((resolve, reject) => {
    server.listen(args['dev-server-port'], 'localhost', (error) => {
      if (!webpackHelpers.webpackOk(error)) {
        throw error;
      } else {
        logging.listening(
          `[web] Serving on localhost:${args['dev-server-port']}`
        );
      }
    });
  });
}

module.exports = {
  arguments: {
    env: {
      type: String,
      values: ['local', 'production'],
      default: 'local',
    },

    'local-api-server': {
      type: String,
      default: 'http://localhost:3000',
    },

    watch: {
      type: Boolean,
      default: false,
    },

    run: {
      type: Boolean,
      default: false,
    },

    'dev-server-port': {
      type: Number,
      default: 8081,
    },

    strict: {
      type: Boolean,
      default: false,
    },

    verbose: {
      type: Boolean,
      default: false,
    },
  },

  async run(_, args) {
    args = argparse.parse(this.arguments, args);

    const configTemplate = require('../webpack/web.config.js');
    const config = configTemplate(args.env, {});

    const compiler = webpack(config);
    if (args.strict) {
      webpackHelpers.promoteWarningsToErrors(compiler);
    }

    if (args.run) {
      return runDevServer(compiler, args);
    }

    return args.watch
      ? webpackHelpers.watch(compiler, {
          namespace: 'web',
          verbose: args.verbose,
        })
      : webpackHelpers.run(compiler, {
          namespace: 'web',
          verbose: args.verbose,
        });
  },
};
