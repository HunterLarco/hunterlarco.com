const Confirm = require('prompt-confirm');
const chalk = require('chalk');
const enquirer = require('enquirer');

const git = require('./git.js');
const logging = require('./logging.js');

async function cleanSource({ base }) {
  if (!base) {
    throw new Error(`Cannot confirm clean source against undefined base.`);
  }

  await git.fetch(base);

  const changedFiles = await git.listChangedFiles(`origin/${base}`);
  if (changedFiles.length == 0) {
    return true;
  }

  logging.warning(`Source differs from origin/${base}!`);
  console.log(chalk.gray(changedFiles.join('\n')));
  return new Confirm({
    name: 'Continue with local changes?',
    default: false,
  }).run();
}

// Used to confirm a change to a resource.
//
// Example:
//
// ```
// $ fido.js delete-secret foo
// > Type 'foo' to continue:
// ```
async function resource(name) {
  if (!name) {
    throw new Error(`Missing required argument 'name'`);
  }

  return enquirer
    .prompt({
      type: 'input',
      name: 'response',
      message: `Type '${name}' to continue`,
    })
    .then(({ response }) => response === name)
    .catch(() => false);
}

module.exports = {
  cleanSource,
  resource,
};
