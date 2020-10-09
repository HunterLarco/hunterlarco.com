const emojis = {
  success: '✅',
  warning: '⚠️ ',
  failure: '❌',
  listening: '👂',
  retrying: '🔄',
};

function success(message) {
  console.log(`${emojis.success} ${message}`);
}

function warning(message) {
  console.warn(`${emojis.warning} ${message}`);
}

function failure(error) {
  if (error instanceof Error) {
    console.log(error);
    console.error(`${emojis.failure} ${error.message}`);
  } else {
    console.error(`${emojis.failure} ${error}`);
  }
}

function listening(message) {
  console.log(`${emojis.listening} ${message}`);
}

function retrying(message) {
  console.log(`${emojis.retrying} ${message}`);
}

module.exports = {
  success,
  warning,
  failure,
  listening,
  retrying,
};
