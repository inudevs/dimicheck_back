import { Router } from 'express';
import Member from '../../models/Member';

const router = Router();

router.get('/', async (_req, res) => {
  const member = await Member.find();
  if (!member) {
    res.sendStatus(404);
    return;
  }

  res.send(member);
});

// post 방식은 지원하지 않음
router.post('/', (_req, res) => {
  res.sendStatus(405);
});

export default router;
