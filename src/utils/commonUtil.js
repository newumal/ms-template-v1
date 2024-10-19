import app from "../app";

const rateLimit = (limit, timeWindow) => {
    const requests = {};

    return (req, res, next) => {
        const ip = req.ip;
        const currentTime = Date.now();

        if (!requests[ip]) {
            requests[ip] = [];
        }

        // Filter requests that are outside the time window
        requests[ip] = requests[ip].filter(timestamp => currentTime - timestamp < timeWindow);

        if (requests[ip].length >= limit) {
            return res.status(429).send('Too many requests, please try again later.');
        }

        // Log the current request timestamp
        requests[ip].push(currentTime);
        console.log('requests', requests);
        next();
    };
};

// app.use(rateLimit(2, 3600*60)); // 100 requests per hour

// app.use(
//     morgan(IMMEDIATE_LOG_FORMAT, {
//       immediate: true,
//       stream: logStream,
//       skip: (req) => req.originalUrl === '/csm/v1/core/health'
//     })
// );
// app.use(
//     morgan(LOG_FORMAT, {
//       stream: logStream,
//       skip: (req) => req.originalUrl === '/csm/v1/core/health'
//     })
// );

// connection time out and request time out
// if keepalivetimeout is larger it will be used
// server.keepAliveTimeout = 185000; // TEST FOR 502 ISSUE
// server.headersTimeout = 80000; // TEST FOR 502 ISSUE
