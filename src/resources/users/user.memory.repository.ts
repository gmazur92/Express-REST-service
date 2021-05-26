const db = require('../../common/db');
const {USERS} = require('../../common/constants');
/**
 * Create a new user in db
 * @param {User} body object with user data
 * @returns {Promise<User>}  returns promise with created user
 */
const create = async(body) => db.create(USERS, body);

/**
 * Get all users from db
 * @returns {Promise<Array<User>>} returns promise with array of users
 */
const getAll = async() => db.getAll(USERS);

/**
 * Get a single user from db
 * @param {string} id  user id
 * @returns {Promise<User>} returns promise with single user
 */
const get = async(id) => db.get(USERS, id);

/**
 * Update a user in db
 * @param {string} id user id
 * @param {User} body object with data
 * @returns {Promise<User>}  returns promise with updated user
 */
const update = async(id, body) => db.update(USERS, id, body);

/**
 * Delete user from db
 * @param {string} id user id
 * @returns {Promise<{}>}  returns promise with empty object if user deleted
 */
const deleteUser = async(id) => db.deleteById(USERS, id);

module.exports = {getAll, get, create, update, deleteUser};
