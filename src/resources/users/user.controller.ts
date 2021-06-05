import express from 'express';
import User, { IUser } from './user.model';
import * as usersService from './user.service';

class UserController {
  static async getAll(_req: express.Request, res: express.Response) {
    const users: IUser[] = await usersService.getAll();
    res.json(users.map(User.toResponse));
  }

  static async get(req: express.Request, res: express.Response) {
    const {id} = req.params
    const user: IUser = await usersService.get(id!);
    if (!user) {
      res.status(404).json({});
    }
    res.json(User.toResponse(user));
  }

  static async create(req: express.Request, res: express.Response) {
    const { body } = req;
    const newUser: IUser = await usersService.create(body);
    res.status(201).json(User.toResponse(newUser));
  }

  static async update(req: express.Request, res: express.Response) {
    const {id} = req.params
    const updatedUser: IUser = await usersService.update(
      id!,
      req.body
    );
    res.status(200).json(User.toResponse(updatedUser));
  }

  static async deleteById(req: express.Request, res: express.Response) {
    const {id} = req.params
    await usersService.deleteUser(id!);
    res.status(204).json({});
  }
}

export default UserController;
