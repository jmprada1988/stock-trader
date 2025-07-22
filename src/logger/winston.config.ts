import { ConfigModule, registerAs } from '@nestjs/config'
import { logLevels, level } from './log-levels.config'
import { getTransports } from './transports'
import { customFormat } from './formats'
import { LoggerOptions } from 'winston' // Import the LoggerOptions type

export default registerAs<LoggerOptions>('winston', async (): Promise<LoggerOptions> => {
 await ConfigModule.envVariablesLoaded

  return {
    level: level['dev'],
    levels: logLevels['dev'],
    format: customFormat,
    transports: getTransports(),
    exitOnError: false,
  }
})
