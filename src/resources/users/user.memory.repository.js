const db = require('../../common/db');
const {USERS} = require('../../common/constants');
/**
 * Create a new user in db
 * @param {User} body
 * @returns {Promise<User>}
 */
const create = async(body) => db.create(USERS, body);

/**
 * Get all users from db
 * @returns {Promise<Array<User>>}
 */
const getAll = async() => db.getAll(USERS);

/**
 * Get a single user from db
 * @param {string} id
 * @returns {Promise<User>}
 */
const get = async(id) => db.get(USERS, id);

/**
 * Update a user in db
 * @param {string} id
 * @param {User} body
 * @returns {Promise<User>}
 */
const update = async(id, body) => db.update(USERS, id, body);

/**
 * Delete user from db
 * @param {string} id
 * @returns {Promise<{}>}
 */
const deleteUser = async(id) => db.deleteById(USERS, id);

module.exports = {getAll, get, create, update, deleteUser};
