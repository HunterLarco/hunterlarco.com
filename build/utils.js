const path = require('path');

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir);
};

exports.assetPath = function(file) {
  return path.join('static', file);
};

exports.envSelector = function(options) {
  const envLabel = {
    production: 'prod',
    development: 'dev',
  }[process.env.NODE_ENV];

  if (!envLabel) {
    throw 'Unexpected environment: ' + process.env.NODE_ENV;
  }

  if (!(envLabel in options)) {
    throw 'Missing environment option for label: ' + envLabel;
  }

  return options[envLabel];
};
