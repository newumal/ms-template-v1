import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = '/csm/v1/core';
export const APP_PORT =
    (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) ||
    process.env.PORT ||
    '3000';
export const APP_HOST = process.env.APP_HOST || '0.0.0.0';

export const IMMEDIATE_LOG_FORMAT = '[Start Request] :method :url';
export const LOG_FORMAT = '[End Request] :method :url :status - :response-time ms';
export const { ENV } = process.env;

