import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserLogin } from './types.dto';

export const createTokens = async (user: UserLogin) => {
  const userInfo = `${user.email}${user.username}`;

  const createToken = jwt.sign(userInfo, process.env['SECRET'] as jwt.Secret, {
    expiresIn: '1h',
  });

  const createRefreshToken = jwt.sign(
    userInfo,
    process.env['SECRET2'] as jwt.Secret,
    {
      expiresIn: '7d',
    }
  );

  return [createToken, createRefreshToken];
};

export const tryLogin = async () => {
  const user;
};
