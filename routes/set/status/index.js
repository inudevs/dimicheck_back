import { Router } from 'express';

import stay from './stay';
import weekDay from './weekDay';

const router = Router();

router.use('/stay', stay);
router.use('/weekDay', weekDay);

export default router;
