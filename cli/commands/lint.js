const chalk = require('chalk');
const fs = require('promise-fs');
const path = require('path');
const prettier = require('prettier');

const argparse = require('../util/argparse.js');
const git = require('../util/git.js');
const workspace = require('../util/workspace.js');

async function userProvidedPathsToGlob(paths) {
  return Promise.all(
    paths.map(async (userProvidedPath) => {
      const absolutePath = path.resolve(process.cwd(), userProvidedPath);
      const relativePath = workspace.resolve(absolutePath, { relative: true });
      if (!relativePath) {
        throw `Path '${userProvidedPath}' is not under root!`;
      }

      try {
        const stat = await fs.stat(absolutePath);
        return stat.isDirectory() ? `${relativePath}/**` : relativePath;
      } catch (error) {
        if (error.code == 'ENOENT') {
          throw `Path '${userProvidedPath}' does not exist.`;
        } else {
          throw error;
        }
      }
    })
  );
}

async function listFilesToLint({ patterns, cached }) {
  const ignore = [
    '.DS_Store',
    '.git/**',
    'build/**',
    'vendor/**',
    '**/package-lock.json',
    '**/node_modules/**',
    'secrets.json',
  ];

  return cached
    ? git.globCachedFiles(patterns, { ignore })
    : workspace.glob(patterns, { ignore, relative: true });
}

async function runPrettier(
  { rootRelativePath, absolutePath, extension, contents },
  { fix }
) {
  const options = {
    arrowParens: 'always',
    endOfLine: 'lf',
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'es5',
    parser: {
      js: 'babel',
      json: 'json',
      html: 'html',
      vue: 'vue',
      css: 'css',
      scss: 'scss',
      md: 'markdown',
      yaml: 'yaml',
      mjml: 'html',
    }[extension],
  };

  if (!options.parser) {
    throw `Unknown extension ${extension}`;
  }

  if (fix) {
    const formatted = prettier.format(contents, options);
    if (contents != formatted) {
      await fs.writeFile(absolutePath, formatted);
      return false;
    }
    return true;
  }

  return prettier.check(contents, options);
}

module.exports = {
  arguments: {
    fix: {
      type: Boolean,
      default: false,
    },

    cached: {
      type: Boolean,
      default: false,
    },

    verbose: {
      type: Boolean,
      default: false,
    },
  },

  async run(positionalArgs, args) {
    args = argparse.parse(this.arguments, args);

    if (args.cached && args.fix) {
      // If we were to allow this, files would be formatted based on their
      // cached contents and then overwrite uncached changes... Meaning devs
      // would lose their work in an unrecoverable way!
      throw '--fix and --cached cannot be used together';
    }

    const linters = [
      {
        linter: runPrettier,
        extensions: [
          'js',
          'json',
          'html',
          'vue',
          'css',
          'scss',
          'md',
          'yaml',
          'mjml',
        ],
      },
    ];

    const files = await listFilesToLint({
      patterns: positionalArgs.length
        ? await userProvidedPathsToGlob(positionalArgs)
        : ['**'],
      cached: args.cached,
    });

    let allFilesPassed = true;
    for (const rootRelativePath of files) {
      const root = path.join(__dirname, '../../');
      const absolutePath = path.join(root, rootRelativePath);
      const extension = path
        .extname(rootRelativePath)
        .substring(1)
        .toLowerCase();

      if (
        !linters.some((linter) => linter.extensions.indexOf(extension) >= 0)
      ) {
        if (args.verbose) {
          console.log(`${chalk.gray('SKIP')} ${rootRelativePath}`);
        }
        continue;
      }

      const contents = args.cached
        ? await git.readCachedFile(absolutePath)
        : (await fs.readFile(absolutePath)).toString();

      if (contents == null) {
        if (args.verbose) {
          console.log(`${chalk.gray('SKIP')} ${rootRelativePath}`);
        }
        continue;
      }

      const summary = {
        rootRelativePath,
        absolutePath,
        extension,
        contents,
      };

      let filePassed = true;
      for (const linter of linters) {
        if (linter.extensions.indexOf(extension) >= 0) {
          if (!(await linter.linter(summary, { fix: args.fix }))) {
            filePassed = false;
            allFilesPassed = false;
          }
        }
      }

      if (filePassed) {
        if (args.verbose) {
          console.log(`${chalk.green('PASS')} ${rootRelativePath}`);
        }
      } else {
        if (args.fix) {
          console.log(`${chalk.yellow('FIXED')} ${rootRelativePath}`);
        } else {
          console.log(`${chalk.red('FAIL')} ${rootRelativePath}`);
        }
      }
    }

    if (!allFilesPassed) {
      if (args.fix) {
        return 'Files fixed';
      } else {
        console.log();
        console.log(
          chalk.gray('Run `cli/fido.js lint --fix` to auto-format files')
        );
        console.log();
        throw 'Lint failed';
      }
    }

    return 'Lint passed';
  },
};
