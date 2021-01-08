import Vuex, { createLogger } from 'vuex';

export default function createStore(name, definition) {
  return new Vuex.Store({
    ...definition,

    // In strict mode, whenever Vuex state is mutated outside of mutation
    // handlers, an error will be thrown. Do not enable strict mode when deploying
    // for production! Strict mode runs a synchronous deep watcher on the state
    // tree for detecting inappropriate mutations, and it can be quite expensive
    // when you make large amount of mutations to the state.
    strict: process.fido.env == 'local',

    plugins:
      process.fido.env == 'local'
        ? [createLogger({ logger: createNamedLogger(name) })]
        : [],
  });
}

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
