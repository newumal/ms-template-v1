import { Router } from 'express';
import authRouter from "./authRouter";
const routes = Router();

/**
 * GET /api/health.
 */
routes.get('/health', (req, res) => {
    try {
        res.send({});
    } catch (e) {
        res.status(503).send();
    }
});


/**
 * GET /csm/core/v1/.
 */
routes.get('/', (req, res) => {
    res.json({
        app: req.app.locals.title,
        apiVersion: req.app.locals.version
    });
});

routes.use('/auth', authRouter);

export default routes;
