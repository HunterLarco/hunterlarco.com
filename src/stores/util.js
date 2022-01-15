import { createLogger } from 'vuex';

function createNamedLogger(name) {
  return {
    ...console,

    group(text) {
      return console.group(`[${name}] ${text}`);
    },

    groupCollapsed(text) {
      return console.groupCollapsed(`[${name}] ${text}`);
    },
  };
}

export function applyDefaults(name, definition) {
  return {
    ...definition,

  // In strict mode, whenever Vuex state is mutated outside of mutation
  // handlers, an error will be thrown. Do not enable strict mode when deploying
  // for production! Strict mode runs a synchronous deep watcher on the state
  // tree for detecting inappropriate mutations, and it can be quite expensive
  // when you make large amount of mutations to the state.
  strict: process.env.NODE_ENV != 'production',

  plugins:
    process.env.NODE_ENV != 'production'
      ? [createLogger({ logger: createNamedLogger(name) })]
      : [],
  };
}
