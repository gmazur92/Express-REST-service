const Task = require('./task.model');
const taskService = require('./task.service');

module.exports = class TaskController {
  static async getAll(req, res) {
    const tasks = await taskService.getAll();
    res.json(tasks.map(Task.toResponse));
  };

  static async get(req, res) {
    const task = await taskService.get(req.params.id);
    if (!task) {
      res.status(404).json({});
    }
    res.json(task);
  };

  static async create(req, res) {
    const newTask = {...req.body, boardId: req.params.boardId};
    const createdTask = await taskService.create(newTask);
    res.status(201).json(Task.toResponse(createdTask));
  };

  static async update(req, res) {
    const updatedTask = await taskService.update(req.params.id, req.body);
    res.status(200).json(Task.toResponse(updatedTask));
  };

  static async deleteById(req, res) {
    await taskService.deleteTask(req.params.id);
    res.status(204).json({});
  };
};
