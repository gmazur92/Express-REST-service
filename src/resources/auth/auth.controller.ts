import { Request, NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as authService from './auth.service';

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user: {token: string} = await authService.signIn(req.body);
      return res.status(StatusCodes.OK).json(user);
    } catch (e) {
      return next(e);
    }
  }
}

export default AuthController;
