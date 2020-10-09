function select(env, options) {
  if (!(env in options)) {
    throw `Missing environment option for label: ${env}`;
  }
  return options[env];
}

module.exports = {
  select,
};
