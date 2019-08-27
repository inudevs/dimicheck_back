import { Router } from 'express';

import get from './get';
import set from './set';

const router = Router();

router.use('/get', get);
router.use('/set', set);

export default router;
