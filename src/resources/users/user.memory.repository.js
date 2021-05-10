const db = require('../../common/db');

const getAll = async () => db.getAll();

const get = async (id) => db.get(id)

const create = async (body) => db.create(body)

const update = async (id, body) => db.update(id, body)

const deleteUser = async (id) => db.deleteUser(id)

module.exports = { getAll, get, create, update, deleteUser };
