import tasksRepo from './task.memory.repository';
import { ITask, ITaskProps } from './task.model';

/**
 * Get all tasks from db
 * @returns {Promise<Array<Task>>} returns promise with all tasks
 */
const getAll = (): Promise<ITask[]> => tasksRepo.getAll();

/**
 * Get single task from db
 * @param {string} id task id
 * @returns {Promise<Task>} returns promise with single task
 */
const get = (id: string): Promise<ITask> => tasksRepo.get(id);

/**
 * Create a new task
 * @param {Task} body body of task model to be created
 * @returns {Promise<Task>} returns promise with created task
 */
const create = (body: ITaskProps): Promise<ITask> => tasksRepo.create(body);

/**
 * Update task in db
 * @param {string} id id of a task to be updated
 * @param {Task} body params to be updated
 * @returns {Promise<Task>} returns promise with updated task
 */
const update = (id: string, body: ITask): Promise<ITask> =>
  tasksRepo.update(id, body);

/**
 * Delete task from db
 * @param {string} id id of task to be deleted
 * @returns {Promise<{}>} returns promise with empty object if task deleted
 */
const deleteTask = (id: string): Promise<boolean> => tasksRepo.deleteTask(id);

/**
 * Map through specific user tasks and change userId to null
 * @async
 * @param {string} id user id
 * @returns {Promise<Array<Task>>} returns promise with tasks
 */
const unassignTasks = async (id: string): Promise<ITask[]> => {
  let changedTasks: ITask[] = [];
  const tasks: ITask[] = await tasksRepo.getAll();
  if (tasks) {
    changedTasks = tasks.map((task: ITask) => {
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
const deleteAllTasksBelongsToBoard = async (id: string): Promise<ITask[]> => {
  let changedTasks: ITask[] = [];
  const tasks = await tasksRepo.getAll();
  if (tasks) {
    changedTasks = tasks.filter((task: ITask) => task.boardId !== id);
  }
  return tasksRepo.updateTableRows(changedTasks);
};

export default {
  getAll,
  get,
  create,
  update,
  deleteTask,
  unassignTasks,
  deleteAllTasksBelongsToBoard,
};
