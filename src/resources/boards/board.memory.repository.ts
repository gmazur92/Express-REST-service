import { IBoard, IBoardProps } from './board.model';
import db from '../../common/db';
import {BOARDS} from '../../common/constants'

/**
 * Request to db to create a new board
 * @param {Board} body board to be created
 * @returns {Promise<Board>} returns promise with  created board
 */
const create = async (body: IBoardProps): Promise<IBoard> =>
  db.create(BOARDS, body);

/**
 * Get all boards from db
 * @returns {Promise<Array<Board>>} returns promise with array of all boards
 */
const getAll = async (): Promise<IBoard[]> => db.getAll(BOARDS);

/**
 * Get single board from db
 * @param {string} id id of single board
 * @returns {Promise<Board>} returns promise with single board
 */
const get = async (id: string): Promise<IBoard> => db.get(BOARDS, id);

/**
 * Update board
 * @param {string} id id of board to be updated
 * @param {Board} body object with data to update
 * @returns {Promise<Board>} returns promise with updated board
 */
const update = async (id: string, body: IBoard): Promise<IBoard> =>
  db.update(BOARDS, id, body);

/**
 * Delete board from db
 * @param {string} id id of board to be deleted
 * @returns {Promise<{}>} returns promise with an empty object if board deleted
 */
const deleteBoard = async (id: string): Promise<boolean> =>
  db.deleteById(BOARDS, id);

export default { getAll, get, create, update, deleteBoard };
