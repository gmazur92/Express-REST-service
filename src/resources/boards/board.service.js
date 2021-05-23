const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = (id) => boardsRepo.get(id);

const create = (body) => boardsRepo.create(body);

const update = (id, body) => boardsRepo.update(id, body);

const deleteBoard = async(id) => {
  await boardsRepo.deleteBoard(id);
  await tasksService.deleteAllTasksBelongsToBoard(id);
};

module.exports = {getAll, get, create, update, deleteBoard};
