const tasksRepo = require('./task.memory.repository');

/**
 * Get all tasks from db
 * @returns {Promise<Array<Task>>} returns promise with all tasks
 */
const getAll = () => tasksRepo.getAll();

/**
 * Get single task from db
 * @param {string} id task id
 * @returns {Promise<Task>} returns promise with single task
 */
const get = (id) => tasksRepo.get(id);

/**
 * Create a new task
 * @param {Task} body body of task model to be created
 * @returns {Promise<Task>} returns promise with created task
 */
const create = (body) => tasksRepo.create(body);

/**
 * Update task in db
 * @param {string} id id of a task to be updated
 * @param {Task} body params to be updated
 * @returns {Promise<Task>} returns promise with updated task
 */
const update = (id, body) => tasksRepo.update(id, body);

/**
 * Delete task from db
 * @param {string} id id of task to be deleted
 * @returns {Promise<{}>} returns promise with empty object if task deleted
 */
const deleteTask = (id) => tasksRepo.deleteTask(id);

/**
 * Map through specific user tasks and change userId to null
 * @async
 * @param {string} id user id
 * @returns {Promise<Array<Task>>} returns promise with tasks
 */
const unassignTasks = async(id) => {
  let changedTasks;
  const tasks = await tasksRepo.getAll();
  if (tasks) {
    changedTasks = tasks.map((task) => {
      if (task.userId === id) {
        const taskToNullUser = task;
        taskToNullUser.userId = null;
        return taskToNullUser;
      }
      return task;
    });
  }
  return tasksRepo.updateTableRows(changedTasks);
};

/**
 * Delete tasks which belongs to specific board
 * @async
 * @param {string} id board id
 * @returns {Promise<Array<Task>>}  returns promise with tasks
 */
const deleteAllTasksBelongsToBoard = async(id) => {
  let changedTasks;
  const tasks = await tasksRepo.getAll();
  if (tasks) {
    changedTasks = tasks.filter(task => task.boardId !== id);
  }
  return tasksRepo.updateTableRows(changedTasks);
};

module.exports = {getAll, get, create, update, deleteTask, unassignTasks, deleteAllTasksBelongsToBoard};
