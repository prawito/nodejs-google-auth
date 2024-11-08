import {Router} from 'express';
import userRoute from '../app/users/users.route.js';
import loginRoute from '../app/login/login.route.js';

const router = Router();

router.use('/users', userRoute);
router.use('/login', loginRoute);

export default router;