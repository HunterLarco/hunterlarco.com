const configs = {
  development: './build/webpack.dev.js',
  production: './build/webpack.prod.js',
};

module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode;
  console.log(`Using env: ${process.env.NODE_ENV}`);

  if (!configs[process.env.NODE_ENV]) {
    throw `Missing config for env ${argv.mode}`;
  }

  return require(configs[argv.mode]);
};
