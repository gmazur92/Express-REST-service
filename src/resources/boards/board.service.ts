import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';
import { IBoard, IBoardProps } from './board.model';

/**
 * Get all boards from db
 * @returns {Promise<Array<Board>>} returns promise with array of all boards
 */
const getAll = (): Promise<IBoard[]> => boardsRepo.getAll();

/**
 * Get single board from db
 * @param {string} id id of single board
 * @returns {Promise<Board>} returns promise with single board
 */
const get = (id: string): Promise<IBoard> => boardsRepo.get(id);

/**
 * Request to db to create a new board
 * @param {Board} body board to be created
 * @returns {Promise<Board>} returns promise of created board
 */
const create = (body: IBoardProps): Promise<IBoard> => boardsRepo.create(body);

/**
 * Update board
 * @param {string} id id of board to be updated
 * @param {Board} body object with data to update
 * @returns {Promise<Board>} returns promise with updated board
 */
const update = (id: string, body: IBoard): Promise<IBoard> =>
  boardsRepo.update(id, body);

/**
 * Delete board from db
 * @async
 * @param {string} id id of board to be deleted
 * @returns {Promise<{}>} returns promise with an empty object if board deleted
 */
const deleteBoard = async (id: string): Promise<void> => {
  const isBoardDeleted = await boardsRepo.deleteBoard(id);
  if (isBoardDeleted) {
    await tasksService.deleteAllTasksBelongsToBoard(id);
  }
};

export default { getAll, get, create, update, deleteBoard };
