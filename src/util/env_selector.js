export const PROD = Symbol('prod');
export const DEV = Symbol('dev');
export const LOCAL = Symbol('local');

export const CURRENT_ENV = {
  production: PROD,
  development: DEV,
  local: LOCAL,
}[process.env.RELEASE_ENV];

if (CURRENT_ENV == null) {
  throw `Unknown build environment ${process.env.RELEASE_ENV}.`;
}

export function envSelector(mapping) {
  if (!(CURRENT_ENV in mapping)) {
    console.error(`Cannot select ${CURRENT_ENV.toString()} from mapping:`, mapping);
    throw 'Invalid env selector.';
  }
  return mapping[CURRENT_ENV];
}
