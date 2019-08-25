import { Router } from 'express';
import Member from '../../models/Member';
import Status from '../../config/status';

const router = Router();

router.get('/', (_req, res) => {
  res.sendStatus(405);
});

router.post('/', async (req, res) => {
  const {
    status, grade, _class, number,
  } = req.body;
  if (!(status && grade && _class && number)) {
    res.sendStatus(401);
    return;
  }

  const member = await Member.findOne({ grade, _class });
  if (!member) {
    res.sendStatus(404);
    return;
  }

  if (status === Status.Class) {
    member.current += 1;
  } else {
    member.current -= 1;
  }

  member.status[number - 1] = status;
  res.sendStatus(200);
});

export default router;
