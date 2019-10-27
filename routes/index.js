import { Router } from 'express';

import auth from './auth';
import get from './get';
import set from './set';

const router = Router();

router.use('/auth', auth);
router.use('/get', get);
router.use('/set', set);

export default router;
