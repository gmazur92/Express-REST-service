const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service')

/**
 * Get all users from db
 * @returns {Promise<Array<User>>}
 */
const getAll = () => usersRepo.getAll();

/**
 * Get a single user from db
 * @param {string} id
 * @returns {Promise<User>}
 */
const get = (id) => usersRepo.get(id);

/**
 * Create a new user in db
 * @param {User} body
 * @returns {Promise<User>}
 */
const create = (body) => usersRepo.create(body);

/**
 * Update a user in db
 * @param {string} id
 * @param {User} body
 * @returns {Promise<User>}
 */
const update = (id, body) => usersRepo.update(id, body);

/**
 * Delete user from db
 * @async
 * @param {string} id
 * @returns {Promise<{}>}
 */
const deleteUser = async (id) => {
  await usersRepo.deleteUser(id);
  await tasksService.unassignTasks(id)
};

module.exports = {getAll, get, create, update, deleteUser};
