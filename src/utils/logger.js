import winston from 'winston';
import httpContext from 'express-http-context';
import { CONTEXT_KEY } from '../constants/CommonConstants';
import { ENV } from '../config/config';

/**
 * Create a new winston logger.
 */
const level = ENV === 'devs' ? 'debug' : 'info';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => {
          const userDetails = httpContext.get(CONTEXT_KEY);
          const correlationId = httpContext.get('correlation-id') || 'NO_CORRELATION';
          const requestId = httpContext.get('requestId') || 'NO_CORRELATION';
          const tenantCode = userDetails ? userDetails.tenant.tenantIdentifier : 'NO_TENANT';

          return `${info.level}|${correlationId}|${tenantCode}|${requestId}|${info.timestamp}:${
            info.message
          } ${info.durationMs || ''}`;
        })
      ),
      level
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.prettyPrint()),
      level: 'error'
    })
  ]
});

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  }
};

export const logString = (params) => {
  return Object.keys(params)
    .map((key) => `${key}: ${params[key]}`)
    .join(', ');
};

export default logger;
