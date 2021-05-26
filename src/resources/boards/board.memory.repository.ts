const db = require('../../common/db');
const {BOARDS} = require('../../common/constants');

/**
 * Request to db to create a new board
 * @param {Board} body board to be created
 * @returns {Promise<Board>} returns promise with  created board
 */
const create = async(body) => db.create(BOARDS, body);

/**
 * Get all boards from db
 * @returns {Promise<Array<Board>>} returns promise with array of all boards
 */
const getAll = async() => db.getAll(BOARDS);

/**
 * Get single board from db
 * @param {string} id id of single board
 * @returns {Promise<Board>} returns promise with single board
 */
const get = async(id) => db.get(BOARDS, id);

/**
 * Update board
 * @param {string} id id of board to be updated
 * @param {Board} body object with data to update
 * @returns {Promise<Board>} returns promise with updated board
 */
const update = async(id, body) => db.update(BOARDS, id, body);

/**
 * Delete board from db
 * @param {string} id id of board to be deleted
 * @returns {Promise<{}>} returns promise with an empty object if board deleted
 */
const deleteBoard = async(id) => db.deleteById(BOARDS, id);

module.exports = {getAll, get, create, update, deleteBoard};
