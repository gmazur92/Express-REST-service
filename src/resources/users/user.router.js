const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const newUser = await usersService.create(req.body);
  res.status(201).json(User.toResponse(newUser));
});

router.route('/:id').put(async (req, res) => {
  const updatedUser = await usersService.update(req.params.id, req.body);
  res.status(200).json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.deleteUser(req.params.id);
  res.status(204).json({});
});

module.exports = router;
