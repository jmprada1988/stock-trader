import { customFormat } from '../formats';

import * as winston from 'winston';

// Correct usage
export const getTransports = () => {
  return [
    new winston.transports.Console({
      format: customFormat, // Apply the custom formatter
    }),
  ];
};
