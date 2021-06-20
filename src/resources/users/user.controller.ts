import { Request, NextFunction, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { IUserProps } from './dto/requestUser.dto';
import * as userService from './user.service';
import { UserEntity } from '../../entity/User.entity';
import { ResponseUserDto } from './dto/responseUser.dto';

class UserController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users: UserEntity[] = await userService.getAll();
      return res.json(users.map(user => new ResponseUserDto(user)));
    } catch (e) {
      return next(e);
    }
  }

  static async get(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const user: UserEntity|undefined = await userService.get(id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
      }
      return res.json(new ResponseUserDto(user));
    } catch (e) {
      return next(e);
    }
  }

  static async create(req: Request<IUserProps>, res: Response, next: NextFunction) {
    const {body} = req;
    try {
      const newUser: UserEntity = await userService.create(body);
      return res.status(StatusCodes.CREATED).json(new ResponseUserDto(newUser));
    } catch (e) {
      return next(e);
    }
  }

  static async update(req: Request<{id: string}, UserEntity>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const updatedUser: UserEntity|null = await userService.update(
        id,
        req.body,
      );
      if (!updatedUser) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.OK).json(new ResponseUserDto(updatedUser));
    } catch (e) {
      return next(e);
    }
  }

  static async deleteById(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const result: UserEntity|null = await userService.deleteUser(id);
      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.NO_CONTENT).json(ReasonPhrases.NO_CONTENT);
    } catch (e) {
      return next(e);
    }
  }
}

export default UserController;
