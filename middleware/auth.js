import { sign as _sign, verify as _verify } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const secret = randomBytes(15).toString('base64');

export function sign(_id) {
  return _sign({ _id }, secret);
}

export function verify(token) {
  return _verify(token, secret);
}
