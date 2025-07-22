export const logLevelsBase = {
  error: 0,
  warn: 1,
  info: 2,
};

export const logLevels = {
  local: {
    ...logLevelsBase,
    http: 3,
    verbose: 4,
    debug: 5,
  },
  dev: {
    ...logLevelsBase,
    http: 3,
    verbose: 4,
  },
  prod: {
    ...logLevelsBase,
  },
};
export const level = {
  local: 'debug',
  dev: 'verbose',
  qa: 'verbose',
  prod: 'error',
};
