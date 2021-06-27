import { Request, Response, NextFunction } from 'express';
import { InvalidError } from '../error/IvalidError';
import { checkToken } from '../utils/auth.utils';

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new InvalidError('No authentication token, access denied');
  }

  try {
    checkToken(token);
  } catch (err) {
    throw new InvalidError('Token verification failed, authorization denied');
  }
  return next()
};

export default authMiddleware;
