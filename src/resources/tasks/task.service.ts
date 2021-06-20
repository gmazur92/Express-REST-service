import tasksRepo from './task.memory.repository';
import { ITaskProps } from './dto/requestTask.dto';
import { TaskEntity } from '../../entity/Task.entity';

/**
 * Get all tasks from db
 * @returns {Promise<Array<TaskEntity>>} returns promise with all tasks
 */
const getAll = (): Promise<TaskEntity[]> => tasksRepo.getAll();

/**
 * Get single task from db
 * @param {string} id task id
 * @returns {Promise<TaskEntity>} returns promise with single task
 */
const get = (id: string): Promise<TaskEntity|undefined> => tasksRepo.get(id);

/**
 * Create a new task
 * @param {ITaskProps} body body of task model to be created
 * @returns {Promise<TaskEntity>} returns promise with created task
 */
const create = (body: ITaskProps): Promise<TaskEntity> => tasksRepo.create(body);

/**
 * Update task in db
 * @param {string} id id of a task to be updated
 * @param {TaskEntity} body params to be updated
 * @returns {Promise<TaskEntity|null>} returns promise with updated task
 */
const update = (id: string, body: TaskEntity): Promise<TaskEntity|null> => tasksRepo.update(id, body);
/**
 * Delete task from db
 * @param {string} id id of task to be deleted
 * @returns {Promise<TaskEntity|null>} returns promise with empty object if task deleted
 */
const deleteTask = (id: string): Promise<TaskEntity|null> => tasksRepo.deleteTask(id);

export default {
  getAll,
  get,
  create,
  update,
  deleteTask,
};
