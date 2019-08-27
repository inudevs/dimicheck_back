import { Router } from 'express';
import Member from '../../models/Member';

const router = Router();

// get 방식은 지원하지 않음
router.get('/', (_req, res) => {
  res.sendStatus(405);
});

router.post('/', async (req, res) => {
  // class, status1, status2, grade, number 5 가지 데이터를 post 방식으로 받음
  const {
    class: _class, status1, status2, grade, number,
  } = req.body;
  // 없으면 에러
  if (!(status1 && status2 && grade && _class && number)) {
    res.sendStatus(401);
    return;
  }

  // 학년과 반이 일치하는 Member 데이터를 찾음
  const member = await Member.findOne({ grade, class: _class });
  if (!member) {
    res.sendStatus(404);
    return;
  }

  // 배열은 0번 부터 시작하므로 입력받은 번호에 -1
  // 그 데이터에 1타임과 2타임 데이터를 집어넣음
  member.status[number - 1] = [status1, status2];
  Member.updateOne(
    {
      grade,
      class: _class,
    },
    {
      status: member.status,
    },
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    },
  );
});

export default router;
