import { IUser, IUserProps } from './user.model';
import * as usersRepo from './user.memory.repository';
import tasksService from '../tasks/task.service';

/**
 * Get all users from db
 * @returns {Promise<Array<User>>} returns promise with array of users
 */
const getAll = (): Promise<IUser[]> => usersRepo.getAll();

/**
 * Get a single user from db
 * @param {string} id  user id
 * @returns {Promise<User>} returns promise with single user
 */
const get = (id: string): Promise<IUser> => usersRepo.get(id);

/**
 * Create a new user in db
 * @param {User} body object with user data
 * @returns {Promise<User>}  returns promise with created user
 */
const create = (body: IUserProps): Promise<IUser> => usersRepo.create(body);

/**
 * Update a user in db
 * @param {string} id user id
 * @param {User} body object with data
 * @returns {Promise<User>}  returns promise with updated user
 */
const update = (id: string, body: IUser): Promise<IUser> =>
  usersRepo.update(id, body);

/**
 * Delete user from db
 * @async
 * @param {string} id user id
 * @returns {Promise<{}>}  returns promise with empty object if user deleted
 */
const deleteUser = async (id: string): Promise<void> => {
  await usersRepo.deleteUser(id);
  await tasksService.unassignTasks(id);
};

export { getAll, get, create, update, deleteUser };
