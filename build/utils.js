const path = require('path');

exports.resolve = (dir) => {
  return path.join(__dirname, '..', dir);
};

exports.assetPath = (file) => {
  return path.join('static', file);
};

exports.envSelector = (options) => {
  const envLabel = {
    production: 'prod',
    development: 'dev',
    local: 'local',
  }[process.env.RELEASE_ENV];

  if (!envLabel) {
    throw 'Unexpected environment: ' + process.env.RELEASE_ENV;
  }

  if (!(envLabel in options)) {
    throw 'Missing environment option for label: ' + envLabel;
  }

  return options[envLabel];
};
