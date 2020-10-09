const chalk = require('chalk');
const child_process = require('child_process');

// Starts the Firestore emulator as a child process.
//
// Returns the child process.
async function start({ port, verbose }) {
  if (verbose) {
    console.log(chalk.gray('Starting Firestore...'));
  }

  if (!port) {
    port = 9000;
  }

  // This logic is pretty ugly. Because the emulator writes all logs to stdout
  // and stderr, we can't distinguish errors from output. So we use the
  // following procedure:
  //
  // 1. Start the process
  // 2. Create a 5s timeout which will consider Firebase dead (aka reject)
  // 3. Wait for the text 'Dev App Server is now running'
  // 4. Clear the timeout
  // 5. Resolve the promise
  //
  // Meanwhile we capture all stdout and stderr from the child process which
  // will be written if the child process dies during startup or times-out. We
  // assume in this case that any output contained error logs.

  const firestore = child_process.spawn(
    'gcloud',
    [
      'beta',
      'emulators',
      'firestore',
      'start',
      '--host-port',
      `localhost:${port}`,
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  let ready = false;
  let startupLogs = '';

  const captureLogs = (stream, buffer) => {
    if (ready) {
      if (verbose) {
        stream.write(buffer.toString());
      }
    } else {
      startupLogs += buffer.toString();
    }
  };

  const flushLogs = (stream) => {
    stream.write(startupLogs);
  };

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      flushLogs(process.stderr);
      reject('Firestore did not start successfully within 30s');
    }, 30000);

    firestore.stdout.on('data', (data) => {
      captureLogs(process.stdout, data);
    });

    firestore.stderr.on('data', (data) => {
      captureLogs(process.stderr, data);

      if (data.toString().indexOf('Dev App Server is now running') >= 0) {
        clearTimeout(timeout);
        ready = true;
        if (verbose) flushLogs(process.stdout);
        resolve(firestore);
      }
    });

    firestore.on('close', () => {
      if (!ready) {
        clearTimeout(timeout);
        flushLogs(process.stderr);
        reject('Firestore failed to start');
      }
    });
  });
}

module.exports = {
  start,
};
