const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = (id) => boardsRepo.get(id);

const create = (body) => boardsRepo.create(body);

const update = (id, taskId, body) => boardsRepo.update(id, taskId, body);

const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = {getAll, get, create, update, deleteBoard};
