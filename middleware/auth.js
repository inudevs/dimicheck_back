import { sign as _sign, verify as _verify } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const secret = randomBytes(15).toString('base64');
const refreshSecret = randomBytes(15).toString('base64');

export function sign(data, isRefresh) {
  return _sign({ data }, isRefresh ? refreshSecret : secret,
    { expiresIn: isRefresh ? 86400 : 900 });
}

export function verify(token) {
  return _verify(token, secret, (err, result) => {
    if (err) {
      return err;
    }
    return result;
  });
}
