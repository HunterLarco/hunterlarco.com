const configs = {
  'development': './build/webpack.dev.js',
  'production': './build/webpack.prod.js',
}

module.exports = (env, argv) => {
  if (!configs[argv.mode]) {
    throw `Missing config for env ${argv.mode}`
  }

  return require(configs[argv.mode])
}
