import { IUserProps } from './dto/requestUser.dto';
import * as usersRepo from './user.memory.repository';
import { UserEntity } from '../../entity/User.entity';

/**
 * Get all users from db
 * @returns {Promise<Array<UserEntity>>} returns promise with array of users
 */
const getAll = (): Promise<UserEntity[]> => usersRepo.getAll();

/**
 * Get a single user from db
 * @param {string} id  user id
 * @returns {Promise<UserEntity|undefined>} returns promise with single user
 */
const get = (id: string): Promise<UserEntity|undefined> => usersRepo.get(id);

/**
 * Create a new user in db
 * @param {IUserProps} body object with user data
 * @returns {Promise<UserEntity>}  returns promise with created user
 */
const create = (body: IUserProps): Promise<UserEntity> => usersRepo.create(body);

/**
 * Update a user in db
 * @param {string} id user id
 * @param {UserEntity} body object with data
 * @returns {Promise<UserEntity|null>}  returns promise with updated user
 */
const update = (id: string, body: UserEntity): Promise<UserEntity|null> => usersRepo.update(id, body);

/**
 * Delete user from db
 * @param {string} id user id
 * @returns {Promise<UserEntity|null>}  returns promise with empty object if user deleted
 */
const deleteUser = async (id: string): Promise<UserEntity|null> => usersRepo.deleteUser(id);

export { getAll, get, create, update, deleteUser };
