import * as winston from 'winston'
import { utilities } from 'nest-winston'

const { format, transports } = winston
const { combine, errors, timestamp } = format

const consoleTxp = new transports.Console({
  format: combine(
    errors({ stack: true }),
    timestamp(),
    utilities.format.nestLike('StockTraderLogger', { prettyPrint: false }), // Remove prettyPrint spacing
  ),
})

export { consoleTxp }
