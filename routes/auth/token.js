import { Router } from 'express';
import { verify, sign } from '../../middleware/auth';

const router = Router();

router.post('/', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  const user = verify(refreshToken);
  if (!user.data) {
    res.sendStatus(403);
    return;
  }

  const token = sign(user, false);
  if (!token) {
    res.sendStatus(500);
    return;
  }

  res.send(token);
});

export default router;
