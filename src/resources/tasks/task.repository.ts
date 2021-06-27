import { getRepository } from 'typeorm';
import { ITaskProps } from './dto/requestTask.dto';
import { TaskEntity } from '../../entity/Task.entity';

/**
 * Get all tasks from db
 * @returns {Promise<Array<TaskEntity>>} returns promise with all tasks
 */
const getAll = async (): Promise<TaskEntity[]> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.find();
};

/**
 * Get single task from db
 * @param {string} id task id
 * @returns {Promise<TaskEntity>} returns promise with  single task
 */
const get = async (id: string): Promise<TaskEntity|undefined> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.findOne(id);
};

/**
 * Create a new task
 * @param {ITaskProps} body body of task model to be created
 * @returns {Promise<TaskEntity>} returns promise with created task
 */
const create = async (body: ITaskProps): Promise<TaskEntity> => {
  const taskRepository = getRepository(TaskEntity);
  return taskRepository.save(body);
};

/**
 * Update task in db
 * @param {string} id id of a task to be updated
 * @param {TaskEntity} body params to be updated
 * @returns {Promise<TaskEntity>} return promise withs updated task
 */
const update = async (id: string, body: TaskEntity): Promise<TaskEntity|null> => {
  const taskRepository = getRepository(TaskEntity);
  const task: TaskEntity|undefined = await taskRepository.findOne(id);
  if (!task) return null;
  const updatedTask = {...task, ...body};
  return taskRepository.save(updatedTask);
};

/**
 * Delete task from db
 * @param {string} id id of task to be deleted
 * @returns {Promise<TaskEntity|null>} returns promise with  empty object if task deleted
 */
const deleteTask = async (id: string): Promise<TaskEntity|null> => {
  const taskRepository = getRepository(TaskEntity);
  const taskToRemove: TaskEntity|undefined = await taskRepository.findOne(id);
  if (!taskToRemove) return null;
  return taskRepository.remove(taskToRemove);
};

export default {getAll, get, create, update, deleteTask};
