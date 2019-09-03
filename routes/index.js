import { Router } from 'express';

import auth from './auth';
import status from './status';

const router = Router();

router.use('/auth', auth);
router.use('/status', status);

export default router;
