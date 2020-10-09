const argparse = require('../util/argparse.js');
const buildWeb = require('./build-web.js');
const logging = require('../util/logging.js');

module.exports = {
  arguments: {
    'web-port': {
      type: Number,
      default: 8080,
    },

    verbose: {
      type: Boolean,
      default: false,
    },
  },

  async run(_, args) {
    args = argparse.parse(this.arguments, args);

    buildWeb.run([], {
      env: 'local',
      verbose: args.verbose,
      'dev-server-port': args['web-port'],
      run: true,
    });

    return new Promise(() => {});
  },
};
