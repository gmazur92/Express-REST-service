const User = require('./user.model');
const usersService = require('./user.service');

module.exports = class UserController {
  static async getAll(req, res) {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  };

  static async get(req, res) {
    const user = await usersService.get(req.params.id);
    if (!user) {
      res.status(404).json({});
    }
    res.json(User.toResponse(user));
  };

  static async create(req, res) {
    const newUser = await usersService.create(req.body);
    res.status(201).json(User.toResponse(newUser));
  };

  static async update(req, res) {
    const updatedUser = await usersService.update(req.params.id, req.body);
    res.status(200).json(User.toResponse(updatedUser));
  };

  static async deleteById(req, res) {
    await usersService.deleteUser(req.params.id);
    res.status(204).json({});
  };
};