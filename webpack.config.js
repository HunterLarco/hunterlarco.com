const configs = {
  development: './build/webpack.dev.js',
  production: './build/webpack.prod.js',
};

module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode;
  console.log(`Using node env: ${process.env.NODE_ENV}`);

  process.env.RELEASE_ENV = argv.release_env;
  console.log(`Using release env: ${process.env.RELEASE_ENV}`);

  if (!configs[process.env.NODE_ENV]) {
    throw `Missing config for env ${argv.mode}`;
  }

  if (!process.env.RELEASE_ENV) {
    throw '--release_env must be defined';
  }

  return require(configs[argv.mode]);
};
