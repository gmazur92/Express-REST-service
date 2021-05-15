const db = require('../../common/db');
const {TASKS} = require('../../common/constants');

const getAll = async() => db.getAll(TASKS);

const get = async(id) => db.get(TASKS, id);

const create = async(id, body) => db.create(TASKS, body, id);

const update = async(id, body) => db.update(TASKS, id, body);

const deleteTask = async(id) => db.deleteById(TASKS, id);

module.exports = {getAll, get, create, update, deleteTask};
