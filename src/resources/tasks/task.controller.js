const Task = require('./task.model');
const taskService = require('./task.service');

const getAll = async(req, res) => {
  const tasks = await taskService.getAll();
  res.json(tasks.map(Task.toResponse));
};

const get = async(req, res) => {
  const task = await taskService.get(req.params.id);
  if (!task) {
    res.status(404).json({});
  }
  res.json(task);
};

const create = async(req, res) => {
  const newTask = {...req.body, boardId: req.params.boardId}
  const createdTask = await taskService.create(req.params.id, newTask);
  res.status(201).json(Task.toResponse(createdTask));
};

const update = async(req, res) => {
  const updatedTask = await taskService.update(req.params.id, req.body);
  res.status(200).json(Task.toResponse(updatedTask));
};

const deleteById = async(req, res) => {
  await taskService.deleteTask(req.params.id);
  res.status(204).json({});
};

module.exports = {
  getAll, get, create, update, deleteById
};
