import bcryptjs from 'bcryptjs';
import { IUserProps } from './dto/requestUser.dto';
import * as usersRepo from './user.repository';
import { UserEntity } from '../../entity/User.entity';
import { ExistInDbError } from '../../error/ExistInDbError';
import { MissingDetailsError } from '../../error/MissingDetailsError';

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
 * Find a single user from db by login
 * @param {string} dto  user login
 * @returns {Promise<UserEntity|undefined>} returns promise with single user
 */
const findByLogin = (dto: string): Promise<UserEntity|undefined> => usersRepo.findByLogin(dto);

/**
 * Create a new user in db
 * @param {IUserProps} dto object with user data
 * @returns {Promise<UserEntity>}  returns promise with created user
 */
const create = async (dto: IUserProps): Promise<UserEntity> => {
  const {login, password, name} = dto;
  if (!login || !password || !name) {
    throw new MissingDetailsError('Not all fields have been entered.')
  }
  const isExist: UserEntity|undefined = await findByLogin(login);
  if (isExist) throw new ExistInDbError('Such user already exists.')
  const passwordHash = await bcryptjs.hash(password, 10);
  return usersRepo.create({login, name, password: passwordHash});
};

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

export { getAll, get, create, update, deleteUser, findByLogin };
