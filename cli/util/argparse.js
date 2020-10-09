const chalk = require('chalk');

function parseArgument(args, name, schema) {
  const type = schema.type;
  if (!type) {
    console.error(chalk.red(`Missing type information for --${name}`));
    process.exit(1);
  }

  if (!(name in args) || args[name] === undefined) {
    if (schema.default === undefined) {
      console.error(chalk.red(`--${name} is required`));
      process.exit(1);
    }
    return schema.default;
  }

  switch (type) {
    case String:
      return args[name];
    case Number:
      return parseFloat(args[name]);
    case Boolean:
      const TRUTHY = ['yes', 'true', 'on'];
      const FALSEY = ['no', 'false', 'off'];
      if (args[name] == true || TRUTHY.indexOf(args[name]) != -1) {
        return true;
      } else if (args[name] == false || FALSEY.indexOf(args[name]) != -1) {
        return false;
      } else {
        console.error(
          chalk.red(
            `Unknown value for --${name} expected: [${TRUTHY.join(
              ', '
            )}, ${FALSEY.join(', ')}]`
          )
        );
        process.exit(1);
      }
  }

  console.error(chalk.red(`Unknown type ${type} for --${name}`));
  process.exit(1);
}

function checkForUnknownArgs(schemaMap, args) {
  for (const name of Object.keys(args)) {
    if (!(name in schemaMap)) {
      console.error(chalk.red(`Unknown arg --${name}`));
      process.exit(1);
    }
  }
}

function parseArguments(schemaMap, args) {
  const parsed = {};

  checkForUnknownArgs(schemaMap, args);

  for (const [name, schema] of Object.entries(schemaMap)) {
    const value = parseArgument(args, name, schema);

    if (schema.values && schema.values.indexOf(value) == -1) {
      console.error(
        chalk.red(
          `Invalid value for --${name} expected: [${schema.values.join(', ')}]`
        )
      );
      process.exit(1);
    }

    parsed[name] = value;
  }

  return parsed;
}

function printHelp(schemaMap) {
  const entries = Object.entries(schemaMap);

  for (let i = 0; i < entries.length; ++i) {
    const [name, schema] = entries[i];

    console.log(`--${name}`);
    console.log(`    type: ${schema.type.name}`);
    if (schema.values) {
      console.log(`    allowedValues: ${JSON.stringify(schema.values)}`);
    }
    if (schema.default !== undefined) {
      console.log(`    default: ${JSON.stringify(schema.default)}`);
    }

    if (i < entries.length - 1) {
      console.log();
    }
  }
}

module.exports = {
  parse: parseArguments,
  printHelp,
};
