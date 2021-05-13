const db = require('../../common/db');
const {TASKS} = require('../../common/constants');

const getAll = async() => db.getAll(TASKS);

const get = async(id) => db.getOne(TASKS, id);

const create = async(body) => db.create(TASKS, body);

const update = async(id, body) => db.update(TASKS, id, body);

const deleteTask = async(id) => db.deleteOne(TASKS, id);

module.exports = {getAll, get, create, update, deleteTask};
