const Duration = require('format-duration-time').default;

const logging = require('./logging.js');

function getBuildSummary(stats, { namespace }) {
  const elapsedMilliseconds = stats.endTime - stats.startTime;
  const elapsedString = Duration(elapsedMilliseconds).format('m[m] s[s]');
  const namespaceString = namespace ? `[${namespace}] ` : '';
  if (stats.hasErrors()) {
    return `${namespaceString}Build failed [${elapsedString}]`;
  } else {
    return `${namespaceString}Built successfully [${elapsedString}]`;
  }
}

function logBuildSummary(stats, { namespace }) {
  const summary = getBuildSummary(stats, { namespace });
  if (buildOk(stats)) {
    logging.success(summary);
  } else {
    logging.failure(summary);
  }
}

// Logs errors, warnings, and a result summary given compilation statistics.
function logBuildStats(stats, { verbose }) {
  if (stats.hasErrors() || stats.hasWarnings() || verbose) {
    console.log(stats.toString({ colors: true }));
  }
}

// Logs any files that have changed since the last execution during watches.
//
// Example:
//
// ```js
// const compiler = webpack(config);
//
// compiler.hooks.watchRun.tap('fido', () => {
//   logChangedFiles(compiler);
// });
//
// compiler.watch(...);
// ```
function logChangedFiles(compiler, { namespace }) {
  const namespaceString = namespace ? `[${namespace}] ` : '';
  for (const fileName of Object.keys(compiler.watchFileSystem.watcher.mtimes)) {
    console.log(`⏰ ${namespaceString}${fileName}`);
  }
}

function webpackOk(error) {
  return !error;
}

function buildOk(stats) {
  return !stats.hasErrors();
}

// Promotes all warnings to errors after the compiler is run.
function promoteWarningsToErrors(compiler) {
  const promoteWarnings = (target) => {
    if (target.warnings.length) {
      target.errors = target.errors.concat(target.warnings);
      target.warnings = [];
    }
  };

  compiler.hooks.afterEmit.tap('fido', (compilation) => {
    promoteWarnings(compilation);
    compilation.children.forEach(promoteWarnings);
  });
}

// Executes the provided webpack compiler while logging errors + stats.
//
// Asynchronously returns a command line exit status (0 for pass, 1 for fail).
async function run(compiler, { verbose, namespace }) {
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (!webpackOk(error)) {
        throw error;
      }

      logBuildStats(stats, { verbose, namespace });

      const summary = getBuildSummary(stats, { namespace });
      if (buildOk(stats)) {
        resolve(summary);
      } else {
        reject(summary);
      }
    });
  });
}

// Variant of `run` which watches for subsequent changes and re-compiles.
//
// Asynchronously returns a command line exit status (0 for pass, 1 for fail).
async function watch(compiler, { verbose, namespace }) {
  return new Promise((resolve, reject) => {
    compiler.hooks.watchRun.tap('fido', () => {
      logChangedFiles(compiler, { namespace });
    });
    compiler.hooks.done.tap('fido', (stats) => {
      logBuildStats(stats, { verbose, namespace });
      logBuildSummary(stats, { namespace });
    });

    compiler.watch({ ignored: [/node_modules/] }, (error, stats) => {
      if (!webpackOk(error)) {
        throw error;
      }
    });
  });
}

module.exports = {
  logBuildStats,
  logChangedFiles,
  getBuildSummary,
  logBuildSummary,
  webpackOk,
  buildOk,
  promoteWarningsToErrors,
  run,
  watch,
};
