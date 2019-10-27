import { Router } from 'express';
import request from 'request-promise-native';

const router = Router();

router.get('/', async (req, res) => {
  const stayList = await request.get(`${process.env.dimigolifeApi}service/stay?Authorization${token}`);
});

export default router;
