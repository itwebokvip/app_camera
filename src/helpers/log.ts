const wrapper = (action: 'log' | 'warn' | 'error', ...args: any[]) => {
  const logger =
    action === 'log'
      ? console.log
      : action === 'warn'
      ? console.warn
      : console.error;
  try {
    const message = args.shift();
    __DEV__ && logger(message, ...args);
  } catch (error) {
    __DEV__ && logger;
  }
};

export const LogUtils = {
  log: (...args: any[]) => wrapper('log', ...args),
  warn: (...args: any[]) => wrapper('warn', ...args),
  error: (...args: any[]) => wrapper('error', ...args),
};
