const db = require('../../common/db');
const {TASKS} = require('../../common/constants');
/**
 * Get all tasks from db
 * @returns {Promise<Array<Task>>}
 */
const getAll = async() => db.getAll(TASKS);

/**
 * Get single task from db
 * @param {string} id
 * @returns {Promise<Task>}
 */
const get = async(id) => db.get(TASKS, id);

/**
 * Create a new task
 * @param {Task} body
 * @returns {Promise<Task>}
 */
const create = async(body) => db.create(TASKS, body);

/**
 * Update task in db
 * @param {string} id
 * @param {Task} body
 * @returns {Promise<Task>}
 */
const update = async(id, body) => db.update(TASKS, id, body);

/**
 * Delete task from db
 * @param {string} id
 * @returns {Promise<{}>}
 */
const deleteTask = async(id) => db.deleteById(TASKS, id);

/**
 * Update all tasks in db
 * @param {Array<Task>} tasks
 * @returns {Promise<Array<Task>>}
 */
const updateTableRows = async (tasks) => db.updateTableRows(TASKS, tasks)

module.exports = {getAll, get, create, update, deleteTask, updateTableRows};
