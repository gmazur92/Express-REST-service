import winston from 'winston';
import { NODE_ENV } from '../common/config';

const { combine, timestamp } = winston.format;
const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const myFormat = winston.format.printf( (asd: any):any => {
  const { timestamp, level, message, ...meta } = asd;
  const obj = JSON.stringify(meta)
    return `${timestamp} [${level}]: ${message} ${obj}`;
});

const formatter = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  }),
);

class Logger {
  private logger: winston.Logger;

  constructor() {
    const isDevEnvironment = () => {
      const env = NODE_ENV || 'development';
      return env === 'development'
    };
    const prodTransport = [
      new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
      new winston.transports.File({filename: 'logs/all.log', level: 'info'}),
    ];
    const transport = [
      new winston.transports.Console({format: formatter}),
      new winston.transports.File({filename: 'logs/all.log', level: 'info'}),
      new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    ]

    this.logger = winston.createLogger({
      level: isDevEnvironment() ? 'trace' : 'error',
      levels: customLevels.levels,
      format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        timestamp(),
        myFormat
      ),
      transports: isDevEnvironment() ? transport : prodTransport,
    });
    winston.addColors(customLevels.colors);
  }

  trace(msg: string, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: string, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: string, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: string, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: string, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: string, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

export const logger = new Logger();
