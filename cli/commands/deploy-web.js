const firebase = require('firebase-tools');

const argparse = require('../util/argparse.js');
const buildWeb = require('./build-web.js');
const confirm = require('../util/confirm.js');
const logging = require('../util/logging.js');
const workspace = require('../util/workspace.js');

module.exports = {
  arguments: {
    'firebase-token': {
      type: String,
      default: undefined,
    },

    dry: {
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

    if (!(await confirm.cleanSource({ base: 'master' }))) {
      throw 'Deploy cancelled';
    }

    logging.success(
      await buildWeb.run([], {
        env: 'production',
        strict: true,
        verbose: args.verbose,
      })
    );

    if (!(await confirm.resource('production/web'))) {
      throw 'Deploy cancelled';
    }

    if (args.dry) {
      throw 'As per --dry, skipping actual deploy';
    }

    try {
      await firebase.deploy({
        project: 'hunterlarco-com',
        force: true,
        cwd: workspace.resolve('build/production/web'),
        token: args['firebase-token'],
      });
    } catch (error) {
      console.error(error);
      throw 'Deploy failed';
    }

    return 'Deploy finished';
  },
};
