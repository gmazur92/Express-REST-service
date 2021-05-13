const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const get = (id) => tasksRepo.get(id);

const create = (body) => tasksRepo.create(body);

const update = (id, body) => tasksRepo.update(id, body);

const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = {getAll, get, create, update, deleteTask};
