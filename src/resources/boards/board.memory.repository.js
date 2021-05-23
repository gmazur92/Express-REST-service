const db = require('../../common/db');
const {BOARDS} = require('../../common/constants');

/**
 * Request to db to create a new board
 * @param {Board} body
 * @returns {Promise<Board>}
 */
const create = async(body) => db.create(BOARDS, body);

/**
 * Get all boards from db
 * @returns {Promise<Array<Board>>}
 */
const getAll = async() => db.getAll(BOARDS);

/**
 * Get single board from db
 * @param {string} id
 * @returns {Promise<Board>}
 */
const get = async(id) => db.get(BOARDS, id);

/**
 * Update board
 * @param {string} id
 * @param {Board} body
 * @returns {Promise<Board>}
 */
const update = async(id, body) => db.update(BOARDS, id, body);

/**
 * Delete board from db
 * @param {string} id
 * @returns {Promise<{}>}
 */
const deleteBoard = async(id) => db.deleteById(BOARDS, id);

module.exports = {getAll, get, create, update, deleteBoard};
