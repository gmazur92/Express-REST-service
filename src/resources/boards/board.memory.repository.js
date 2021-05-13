const db = require('../../common/db');
const {BOARDS} = require('../../common/constants');

const getAll = async() => db.getAll(BOARDS);

const get = async(id) => db.getOne(BOARDS, id);

const create = async(body) => db.create(BOARDS, body);

const update = async(id, body) => db.update(BOARDS, id, body);

const deleteBoard = async(id) => db.deleteOne(BOARDS, id);

module.exports = {getAll, get, create, update, deleteBoard};

