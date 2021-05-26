const db = require('../../common/db');
const {TASKS} = require('../../common/constants');
/**
 * Get all tasks from db
 * @returns {Promise<Array<Task>>} returns promise with all tasks
 */
const getAll = async() => db.getAll(TASKS);

/**
 * Get single task from db
 * @param {string} id task id
 * @returns {Promise<Task>} returns promise with  single task
 */
const get = async(id) => db.get(TASKS, id);

/**
 * Create a new task
 * @param {Task} body body of task model to be created
 * @returns {Promise<Task>} returns promise with created task
 */
const create = async(body) => db.create(TASKS, body);

/**
 * Update task in db
 * @param {string} id id of a task to be updated
 * @param {Task} body params to be updated
 * @returns {Promise<Task>} return promise withs updated task
 */
const update = async(id, body) => db.update(TASKS, id, body);

/**
 * Delete task from db
 * @param {string} id id of task to be deleted
 * @returns {Promise<{}>} returns promise with  empty object if task deleted
 */
const deleteTask = async(id) => db.deleteById(TASKS, id);

/**
 * Update all tasks in db
 * @param {Array<Task>} tasks an array of tasks which are to be updated in db
 * @returns {Promise<Array<Task>>} returns promise with updated array of tasks
 */
const updateTableRows = async(tasks) => db.updateTableRows(TASKS, tasks);

module.exports = {getAll, get, create, update, deleteTask, updateTableRows};
