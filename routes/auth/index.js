import { Router } from 'express';

import signin from './signin';

const router = Router();

router.use('/signin', signin);

export default router;
