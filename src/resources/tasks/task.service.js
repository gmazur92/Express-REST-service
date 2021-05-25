const tasksRepo = require('./task.memory.repository');
/**
 * Get all tasks from db
 * @returns {Promise<Array<Task>>}
 */
const getAll = () => tasksRepo.getAll();

/**
 * Get single task from db
 * @param {string} id
 * @returns {Promise<Task>}
 */
const get = (id) => tasksRepo.get(id);

/**
 * Create a new task
 * @param {Task} body
 * @returns {Promise<Task>}
 */
const create = (body) => tasksRepo.create(body);

/**
 * Update task in db
 * @param {string} id
 * @param {Task} body
 * @returns {Promise<Task>}
 */
const update = (id, body) => tasksRepo.update(id, body);

/**
 * Delete task from db
 * @param {string} id
 * @returns {Promise<{}>}
 */
const deleteTask = (id) => tasksRepo.deleteTask(id);

/**
 * Map through specific user tasks and change userId to null
 * @async
 * @param {string} id
 * @returns {Promise<Array<Task>>}
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
 * @param {string} id
 * @returns {Promise<Array<Task>>}
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
