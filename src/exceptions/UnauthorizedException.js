import httpStatus from 'http-status-codes';

const { UNAUTHORIZED } = httpStatus;
import ApiException from './ApiException';

/**
 * UnauthorizedException.
 */
export default class UnauthorizedException extends ApiException {
  /**
   *
   * @param {any} message
   * @param {any} statusCode
   * @param {any} errorCode
   */
  constructor(message, statusCode = UNAUTHORIZED, errorCode = UNAUTHORIZED) {
    super(message, statusCode, errorCode);
    this.name = 'unauthorizedException';
  }
}
