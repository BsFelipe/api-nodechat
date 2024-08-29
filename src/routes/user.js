import { Router } from 'express';
import user from '../controller/user';

const router = Router();

router.post('/user', user.create)
router.post('/user/login', user.login)

export default router;
