const db = require('../../common/db');
const {BOARDS} = require('../../common/constants');

const create = async(body) => db.create(BOARDS, body);

const getAll = async() => db.getAll(BOARDS);

const get = async(id) => db.get(BOARDS, id);

const update = async(id, body) => db.update(BOARDS, id, body);

const deleteBoard = async(id) => db.deleteBoardAndTasks(id)

module.exports = {getAll, get, create, update, deleteBoard};

