const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

/**
 * Get all boards from db
 * @returns {Promise<Array<Board>>} returns promise with array of all boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Get single board from db
 * @param {string} id id of single board
 * @returns {Promise<Board>} returns promise with single board
 */
const get = (id) => boardsRepo.get(id);

/**
 * Request to db to create a new board
 * @param {Board} body board to be created
 * @returns {Promise<Board>} returns promise of created board
 */
const create = (body) => boardsRepo.create(body);

/**
 * Update board
 * @param {string} id id of board to be updated
 * @param {Board} body object with data to update
 * @returns {Promise<Board>} returns promise with updated board
 */
const update = (id, body) => boardsRepo.update(id, body);

/**
 * Delete board from db
 * @async
 * @param {string} id id of board to be deleted
 * @returns {Promise<{}>} returns promise with an empty object if board deleted
 */
const deleteBoard = async(id) => {
  await boardsRepo.deleteBoard(id);
  await tasksService.deleteAllTasksBelongsToBoard(id);
};

module.exports = {getAll, get, create, update, deleteBoard};
