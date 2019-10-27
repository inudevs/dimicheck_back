import { Router } from 'express';
import { verify } from '../../../middleware/auth';
import Member from '../../../models/Member';

const router = Router();

// get 방식은 지원하지 않음
router.get('/', (_req, res) => {
  res.sendStatus(405);
});

router.post('/', async (req, res) => {
  const { token, status } = req.body;
  if (!token) {
    res.sendStatus(401);
    return;
  }

  const user = verify(token);
  if (!user.data) {
    res.sendStatus(403);
    return;
  }

  const {
    grade, klass, number,
  } = user.data;
  if (!(grade && klass && number && status && status.length === 2)) {
    res.sendStatus(403);
    return;
  }

  // 학년과 반이 일치하는 Member 데이터를 찾음
  const member = await Member.findOne({ grade, klass });
  if (!member) {
    res.sendStatus(404);
    return;
  }

  // 배열은 0번 부터 시작하므로 입력받은 번호에 -1
  // 그 데이터에 1타임과 2타임 데이터를 집어넣음
  const setValue = {};
  setValue[`status.${number - 1}`] = status;
  Member.updateOne(
    {
      grade,
      klass,
    },
    {
      $set: setValue,
    },
    (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    },
  );
});

export default router;
