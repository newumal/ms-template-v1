import { Router } from 'express';
import {registerUser, loginUser} from '../controllers/authController.js';
const authRoute = Router();

/**
 * GET /csm/core/v1/auth/register.
 */
authRoute.post('/register', registerUser);

/**
 * POST /csm/core/v1/auth/login.
 */
authRoute.post('/login', loginUser);


export default authRoute;
