const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = (id) => usersRepo.get(id);

const create = (body) => usersRepo.create(body);

const update = (id, body) => usersRepo.update(id, body);

const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = {getAll, get, create, update, deleteUser};
