import { compare, hashSync } from 'bcryptjs';
import { verify, sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';

const checkToken = (token: string) => verify(token, JWT_SECRET_KEY as string);

const comparePassword = (enteredPwd: string, hashedPwd: string) => compare(enteredPwd, hashedPwd);

const generateToken = (user: {id: string, login: string}): string => sign({userId: user.id, login: user.login},
  JWT_SECRET_KEY as string, {
    expiresIn: '24h',
  });

export { checkToken, comparePassword, hashSync, generateToken };
