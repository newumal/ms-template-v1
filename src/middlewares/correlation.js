import { v4 as uuidv4 } from 'uuid';
import httpContext from 'express-http-context';

/**
 *
 * @param {any} options
 * @returns {Function}
 */
export default function correlation(options) {
  const headerName = (options && options.header) || 'correlation-id';

  return (req, res, next) => {
    let id = req.get(headerName);
    const requestContextId = uuidv4();

    httpContext.set('requestId', requestContextId);

    if (!id) {
      id = uuidv4();
    }
    res.set(headerName, id);
    httpContext.set(headerName, id);
    next();
  };
}
