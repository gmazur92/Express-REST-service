import express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import User, { IUser } from './user.model';
import * as usersService from './user.service';

class UserController {
  static async getAll(_req: express.Request, res: express.Response) {
    try {
      const users: IUser[] = await usersService.getAll();
      return res.json(users.map(User.toResponse));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async get(req: express.Request, res: express.Response) {
    const {id} = req.params;
    try {
      const user: IUser = await usersService.get(id!);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({message: ReasonPhrases.NOT_FOUND});
      }
      return res.json(User.toResponse(user));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async create(req: express.Request, res: express.Response) {
    const {body} = req;
    try {
      const newUser: IUser = await usersService.create(body);
      return res.status(StatusCodes.CREATED).json(User.toResponse(newUser));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const {id} = req.params;
    try {
      const updatedUser: IUser = await usersService.update(
        id!,
        req.body,
      );
      if (!updatedUser) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.OK).json(User.toResponse(updatedUser));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async deleteById(req: express.Request, res: express.Response) {
    const {id} = req.params;
    try {
      await usersService.deleteUser(id!);
      return res.status(204).json({});
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}

export default UserController;
