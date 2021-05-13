const db = require('../../common/db');
const {USERS} = require('../../common/constants');

const create = async(body) => db.create(USERS, body);

const getAll = async() => db.getAll(USERS);

const get = async(id) => db.getOne(USERS, id);

const update = async(id, body) => db.update(USERS, id, body);

const deleteUser = async(id) => db.deleteOne(USERS, id);

module.exports = {getAll, get, create, update, deleteUser};
