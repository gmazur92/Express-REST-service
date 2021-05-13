const router = require('express').Router();
const Task = require('./task.model');
const taskRouter = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskRouter.getAll();
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const tasks = await taskRouter.get(req.params.id);
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const newTask = await taskRouter.create(req.body);
  res.status(201).json(Task.toResponse(newTask));
});

router.route('/:id').put(async (req, res) => {
  const updatedTask = await taskRouter.update(req.params.id, req.body);
  res.status(200).json(Task.toResponse(updatedTask));
});

router.route('/:id').delete(async (req, res) => {
  await taskRouter.deleteTask(req.params.id);
  res.status(204).json({});
});

module.exports = router;
