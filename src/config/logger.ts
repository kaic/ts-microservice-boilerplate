import winston, { Logger } from 'winston'

interface LogMetadata {
  [key: string]: any
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    date: new Date()
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
})

const log = (level: string, message: string, meta: LogMetadata = {}): Logger => logger.log(level, message, meta)

export const info = (message: string, meta?: object): Logger => log('info', message, meta)
export const warn = (message: string, meta?: object): Logger => log('warn', message, meta)
export const error = (message: string, meta?: object): Logger => log('error', message, meta)

export default { info, warn, error }
