import ExtendableError from 'es6-error';

/**
 * ApiException.
 */
export default class ApiException extends ExtendableError {
  /**
   *
   * @param {any} message
   * @param {any} statusCode
   * @param {any} errorCode
   */
  constructor(message, statusCode, errorCode) {
    super(message);
    this.name = 'ApiException';
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
