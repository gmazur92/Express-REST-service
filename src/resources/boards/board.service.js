const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

/**
 * Get all boards from db
 * @returns {Promise<Array<Board>>}
 */
const getAll = () => boardsRepo.getAll();

/**
 * Get single board from db
 * @param {string} id
 * @returns {Promise<Board>}
 */
const get = (id) => boardsRepo.get(id);

/**
 * Request to db to create a new board
 * @param {Board} body
 * @returns {Promise<Board>}
 */
const create = (body) => boardsRepo.create(body);

/**
 * Update board
 * @param {string} id
 * @param {Board} body
 * @returns {Promise<Board>}
 */
const update = (id, body) => boardsRepo.update(id, body);

/**
 * Delete board from db
 * @async
 * @param {string} id
 * @returns {Promise<{}>}
 */
const deleteBoard = async(id) => {
  await boardsRepo.deleteBoard(id);
  await tasksService.deleteAllTasksBelongsToBoard(id);
};

module.exports = {getAll, get, create, update, deleteBoard};
