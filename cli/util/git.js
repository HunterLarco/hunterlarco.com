const child_process = require('child_process');
const wildcardMatch = require('wildcard-match');

async function getCachedFileObjectHash(file) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `git ls-files --stage '${file}'`,
      {},
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          throw `Error getting hash for ${file}`;
        }

        if (stderr) {
          console.error(stderr);
          throw `Error getting hash for ${file}`;
        }

        if (!stdout) {
          resolve(null);
          return;
        }

        const hash = stdout.split(' ')[1];
        resolve(hash);
      }
    );
  });
}

async function readCachedObject(hash) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `git cat-file -p '${hash}'`,
      {},
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          throw `Error reading cached object ${hash}`;
        }

        if (stderr) {
          console.error(stderr);
          throw `Error reading cached object ${hash}`;
        }

        resolve(stdout);
      }
    );
  });
}

// Reads the cached contents of the provided file
async function readCachedFile(file) {
  const hash = await getCachedFileObjectHash(file);
  if (!hash) return null;
  return readCachedObject(hash);
}

async function listCachedFiles() {
  return new Promise((resolve, reject) => {
    child_process.exec(
      'git diff --name-only --cached',
      {},
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          throw 'Error listing cached files';
        }

        if (stderr) {
          console.error(stderr);
          throw 'Error listing cached files';
        }

        if (!stdout) {
          resolve([]);
          return;
        }

        resolve(stdout.trim().split('\n'));
      }
    );
  });
}

async function globCachedFiles(patterns, { ignore }) {
  const files = await listCachedFiles();
  return files.filter((file) => {
    if (ignore) {
      for (const pattern of ignore) {
        if (wildcardMatch(pattern, '/').test(file)) {
          return false;
        }
      }
    }
    for (const pattern of patterns) {
      if (wildcardMatch(pattern, '/').test(file)) {
        return true;
      }
    }
    return false;
  });
}

// Lists the files changed between two branches and/or commits.
//
// If only a single pattern is given, returns the changed files between that
// pattern and the current file system.
async function listChangedFiles(...patterns) {
  let from;
  let to;
  if (patterns.length == 2) {
    from = patterns[0];
    to = patterns[1];
  } else if (patterns.length == 1) {
    from = patterns[0];
    to = null;
  } else {
    throw `Unknown number of args to listChangedFiles: ${patterns.length}`;
  }

  return new Promise((resolve, reject) => {
    child_process.exec(
      to
        ? `git diff --name-only '${from}' '${to}'`
        : `git diff --name-only '${from}'`,
      {},
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          throw 'Error listing changed files';
        }

        if (stderr) {
          console.error(stderr);
          throw 'Error listing changed files';
        }

        if (!stdout) {
          resolve([]);
          return;
        }

        resolve(stdout.trim().split('\n'));
      }
    );
  });
}

// Fetches a given branch from origin.
async function fetch(branch) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      `git fetch origin '${branch}' -q`,
      {},
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          throw `Error fetching origin/${branch}`;
        }

        if (stderr) {
          console.error(stderr);
          throw `Error fetching origin/${branch}`;
        }

        resolve();
      }
    );
  });
}

module.exports = {
  readCachedFile,
  listCachedFiles,
  globCachedFiles,
  listChangedFiles,
  fetch,
};
