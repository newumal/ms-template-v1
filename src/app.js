import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./rotues/routes";
import {APP_HOST, APP_PORT, BASE_URL, IMMEDIATE_LOG_FORMAT, LOG_FORMAT} from "./config/config";
import correlation from "./middlewares/correlation";
import httpContext from "express-http-context";
import cors from 'cors';
import tokenHandler from "./middlewares/authMiddleware";
import requestContext from "./middlewares/requestContext";
import {memoryUsage} from "node:process";
import logger from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

app.set('port', APP_PORT);
app.set('host', APP_HOST);
app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

// standard middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use(httpContext.middleware);
app.use(correlation());


//Middleware
app.use(express.urlencoded({ extended: true }));

app.use(requestContext());
app.use(tokenHandler());


// API Routes
app.use(BASE_URL, routes);


//Database connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));


const server = app.listen(app.get('port'), app.get('host'), () => {
    logger.info(`Server started at http://${app.get('host')}:${app.get('port')}${BASE_URL}`);
    const v8 = require('node:v8');

    console.log(v8.getHeapStatistics());
    const { memoryUsage } = require('node:process');

    console.log(memoryUsage());
});



server.on('timeout', (socket) => {
    logger.info(
        `Timeout reached for connection ${socket._peername.address}:${socket._peername.port}`
    );
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled rejection', err);
    process.exit(1);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', err);
    process.exit(1);
});

export default app;

