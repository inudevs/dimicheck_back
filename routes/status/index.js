import { Router } from 'express';

import set from './set';

const router = Router();

router.use('/set', set);

export default router;
