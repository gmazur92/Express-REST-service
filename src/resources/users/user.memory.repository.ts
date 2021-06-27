import { getRepository } from 'typeorm';
import { IUserProps } from './dto/requestUser.dto';
import { UserEntity } from '../../entity/User.entity';

/**
 * Create a new user in db
 * @param {IUserProps} body object with user data
 * @returns {Promise<UserEntity>}  returns promise with created user
 */
const create = async (body: IUserProps): Promise<UserEntity> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.save(body);
};

/**
 * Get all users from db
 * @returns {Promise<Array<UserEntity>|[]>} returns promise with array of users
 */
const getAll = async (): Promise<UserEntity[]> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.find();
};
/**
 * Get a single user from db
 * @param {string} id  user id
 * @returns {Promise<UserEntity|undefined>} returns promise with single user
 */
const get = async (id: string): Promise<UserEntity|undefined> => {
  const userRepository = getRepository(UserEntity);
  return userRepository.findOne(id);
};

/**
 * Update a user in db
 * @param {string} id user id
 * @param {UserEntity} body object with data
 * @returns {Promise<UserEntity|null>}  returns promise with updated user
 */
const update = async (id: string, body: UserEntity): Promise<UserEntity|null> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(id);
  if (!user) return null;
  const updatedUser = {...user, ...body};
  return userRepository.save(updatedUser);
};

/**
 * Delete user from db
 * @param {string} id user id
 * @returns {Promise<UserEntity|null>}  returns promise with empty object if user deleted
 */
const deleteUser = async (id: string): Promise<UserEntity|null> => {
  const userRepository = getRepository(UserEntity);
  const userToRemove: UserEntity|undefined = await userRepository.findOne(id);
  if (!userToRemove) return null;
  return userRepository.remove(userToRemove);
};

export { getAll, get, create, update, deleteUser };
