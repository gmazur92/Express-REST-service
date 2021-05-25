const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service')

/**
 * Get all users from db
 * @returns {Promise<Array<User>>} returns promise with array of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Get a single user from db
 * @param {string} id  user id
 * @returns {Promise<User>} returns promise with single user
 */
const get = (id) => usersRepo.get(id);

/**
 * Create a new user in db
 * @param {User} body object with user data
 * @returns {Promise<User>}  returns promise with created user
 */
const create = (body) => usersRepo.create(body);

/**
 * Update a user in db
 * @param {string} id user id
 * @param {User} body object with data
 * @returns {Promise<User>}  returns promise with updated user
 */
const update = (id, body) => usersRepo.update(id, body);

/**
 * Delete user from db
 * @async
 * @param {string} id user id
 * @returns {Promise<{}>}  returns promise with empty object if user deleted
 */
const deleteUser = async (id) => {
  await usersRepo.deleteUser(id);
  await tasksService.unassignTasks(id)
};

module.exports = {getAll, get, create, update, deleteUser};
