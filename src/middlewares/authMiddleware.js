import {decode, verify} from "jsonwebtoken";
import {BASE_URL} from "../config/config";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import httpContext from "express/lib/application";
import {AUTHORIZATION_CONTEXT_KEY, CONTEXT_KEY} from "../constants/CommonConstants";


const unsecuredEndpoints = {
    [`${BASE_URL}/health`]: { method: 'GET' },
    [`${BASE_URL}/auth/login`]: { method: 'POST' },
    [`${BASE_URL}/auth/register`]: { method: 'POST' },
};

/**
 *
 * @param {any} originalUrl
 * @param {any} method
 * @returns {boolean}
 */
function isUnsecuredEndpoint(originalUrl, method) {
    return (
        Object.prototype.hasOwnProperty.call(unsecuredEndpoints, originalUrl) &&
        method === unsecuredEndpoints[originalUrl].method
    );
}

/**
 *
 * @returns {(function(*, *, *): Promise<*|undefined>)|*}
 */
const tokenHandler =()  =>{
    return (req, res, next) => {
        if (isUnsecuredEndpoint(req.originalUrl, req.method)) {
            return next();
        }
        const authorizationToken = req.headers.authorization;

        if (!authorizationToken) {
            return next(new UnauthorizedException('Authorization token missing from the header'));
        }
        try {
            const decoded = decode(authorizationToken);
            const { user, tenant } = decoded;

            httpContext.set(CONTEXT_KEY, { user, tenant });
            httpContext.set(AUTHORIZATION_CONTEXT_KEY, authorizationToken);

            return next();
        } catch (error) {
            if (
                error.name &&
                ['JsonWebTokenError', 'NotBeforeError', 'TokenExpiredError'].includes(error.name)
            ) {
                return next(new UnauthorizedException(error.message));
            }

            // TODO : check function
            return next();
        }
    };
}

export default tokenHandler;
