import * as winston from 'winston';
const { format } = winston;
const { combine, timestamp, printf } = format;

// Format to include stack trace if an error is logged
export const errorStackFormat = format((info) => {
  if (info instanceof Error) {
    return Object.assign({}, info, {
      stack: info.stack,
      message: info.message,
    });
  }
  return info;
});

// Custom formatter for log structure
export const customFormat = combine(
  errorStackFormat(), // Include stack trace for errors
  timestamp({
    format: () =>
      new Date().toISOString().replace('T', ', ').replace('Z', ' UTC'), // UTC timestamp format
  }),
  printf(({ level, message, stack, context, timestamp }) => {
    const label = 'API';
    const baseLog = `${timestamp} | ${level.toUpperCase()} | ${label}:${context || 'Application'} | ${message}`;
    // Include stack trace if available
    return stack ? `${baseLog}\nStack Trace:\n${stack}` : baseLog;
  }),
);
