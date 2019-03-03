const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': tasks(['pretty-quick --staged', 'npm test']),
    'pre-push': tasks(['pretty-quick --staged', 'npm test']),
  },
};
