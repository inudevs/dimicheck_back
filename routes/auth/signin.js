import { Router } from 'express';
import request from 'request-promise-native';
import { pbkdf2Sync, randomBytes } from 'crypto';
import jwtDecode from 'jwt-decode';
import { sign, verify } from '../../middleware/auth';
import User from '../../models/User';

const router = Router();

// get 방식은 지원하지 않음
router.get('/', (_req, res) => {
  res.sendStatus(405);
});

/*
  디미고인의 아이디를 사용하므로 디미고인의 api를 사용하는 것이 맞지만,
  디미고인 서버에 쓸데없이 많은 요청을 하므로 자체 db서버에 아이디가 존재하면 그것으로 로그인을 하고,
  없다면 디미고인 api를 사용해 로그인을 하고 그 데이터를 자체 db서버에 저장.
*/
router.post('/', async (req, res) => {
  // id, password 2가지 데이터를 post 방식으로 받음
  const { id, password } = req.body;
  // 없으면 에러
  if (!(id && password)) {
    res.sendStatus(401);
    return;
  }

  // id가 일치하는 User 데이터를 자체 db서버에서 찾음
  const user = await User.findOne({ id });
  // 있으면
  if (user) {
    // password와 salt 분리
    const splitPassword = user.password.split('|');
    // 입력받은 비밀번호와 분리한 salt를 사용해 암호화
    const encryptPassword = await pbkdf2Sync(password, splitPassword[1], 200000, 64, 'sha512').toString('base64');

    // 일치하지 않으면 에러
    if (splitPassword[0] !== encryptPassword) {
      res.sendStatus(401);
      return;
    }

    const token = sign(user._id);
    if (!token) {
      res.sendStatus(500);
      return;
    }

    const tokenId = verify(token);
    if (!tokenId) {
      res.sendStatus(500);
      return;
    }

    res.send({ token });
    return;
  }

  // 자체 db서버에 없는 경우이므로 디미고인 api 사용
  const dimi = await request({
    uri: 'https://api.dimigo.in/auth',
    method: 'POST',
    body: {
      id,
      password,
    },
    json: true,
  }).catch((reason) => {
    res.sendStatus(reason.statusCode);
  });
  if (!dimi) {
    return;
  }

  // 디미고인 api에서 받아온 token으로 유저 데이터를 가져옴
  const userData = jwtDecode(dimi.token).identity[0];
  // 유저데이터를 받아오지 못하면 에러
  if (!userData) {
    res.sendStatus(500);
    return;
  }

  // 디미고인 api에서 받아온 데이터를 자체 db서버에 저장
  const salt = randomBytes(64).toString('base64');
  const encryptPassword = await pbkdf2Sync(
    password,
    salt,
    200000,
    64,
    'sha512',
  ).toString('base64');

  const newUser = new User();
  newUser.id = id;
  newUser.password = `${encryptPassword}|${salt}`;
  newUser.idx = userData.idx;
  newUser.name = userData.name;
  newUser.grade = userData.grade;
  newUser.class = userData.klass;
  newUser.number = userData.number;
  newUser.serial = userData.serial;
  newUser.photo = userData.photo;
  newUser.email = userData.email;
  newUser.userType = userData.user_type;
  newUser.save(async (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    const checkUser = await User.findOne({ id });
    if (!checkUser) {
      res.sendStatus(500);
    }

    const token = sign(checkUser._id);
    if (!token) {
      res.sendStatus(500);
      return;
    }

    const tokenId = verify(token);
    if (!tokenId) {
      res.sendStatus(500);
      return;
    }

    res.send({ token });
  });
});

export default router;
