const User = require('./user.model');
const usersService = require('./user.service');

const getAll = async(req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
};

const get = async(req, res) => {
  const user = await usersService.get(req.params.id);
  if (!user) {
    res.status(404).json({});
  }
  res.json(User.toResponse(user));
};

const create = async(req, res) => {
  const newUser = await usersService.create(req.body);
  res.status(201).json(User.toResponse(newUser));
};

const update = async(req, res) => {
  const updatedUser = await usersService.update(req.params.id, req.body);
  res.status(200).json(User.toResponse(updatedUser));
};

const deleteById = async(req, res) => {
  await usersService.deleteUser(req.params.id);
  res.status(204).json({});
};

module.exports = {
  getAll, get, create, update, deleteById,
};
