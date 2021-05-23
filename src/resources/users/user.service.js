const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service')

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const create = (body) => usersRepo.create(body);

const update = (id, body) => usersRepo.update(id, body);

const deleteUser = async (id) => {
  await usersRepo.deleteUser(id);
  await tasksService.unassignTasks(id)
};

module.exports = {getAll, get, create, update, deleteUser};
