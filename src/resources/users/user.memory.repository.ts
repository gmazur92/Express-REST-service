import db from '../../common/db';
import { IUser, IUserProps } from './user.model';
import {USERS} from '../../common/constants'

/**
 * Create a new user in db
 * @param {User} body object with user data
 * @returns {Promise<User>}  returns promise with created user
 */
const create = async(body: IUserProps): Promise<IUser> =>
  db.create(USERS, body);

/**
 * Get all users from db
 * @returns {Promise<Array<User>>} returns promise with array of users
 */
const getAll = async(): Promise<IUser[]> => db.getAll(USERS);

/**
 * Get a single user from db
 * @param {string} id  user id
 * @returns {Promise<User>} returns promise with single user
 */
const get = async(id: string): Promise<IUser> => db.get(USERS, id);

/**
 * Update a user in db
 * @param {string} id user id
 * @param {User} body object with data
 * @returns {Promise<User>}  returns promise with updated user
 */
const update = async(id: string, body: IUser): Promise<IUser> =>
  db.update(USERS, id, body);

/**
 * Delete user from db
 * @param {string} id user id
 * @returns {Promise<{}>}  returns promise with empty object if user deleted
 */
const deleteUser = async(id: string): Promise<boolean> => db.deleteById(USERS, id);

export { getAll, get, create, update, deleteUser };
