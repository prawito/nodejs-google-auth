import {Router} from 'express';
import userRoute from '../app/users/users.route.js';

const router = Router();

router.use('/users', userRoute);

export default router;