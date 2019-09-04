import { sign as _sign, verify as _verify } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const secret = randomBytes(15).toString('base64');

export function sign(data) {
  return _sign({ data }, secret);
}

export function verify(token) {
  return _verify(token, secret, (err, result) => {
    if (err) {
      return err;
    }
    return result;
  });
}
