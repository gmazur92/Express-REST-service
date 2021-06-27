import boardsRepo from './board.memory.repository';
import { IBoardProps } from './dto/requestBoard.dto';
import { BoardEntity } from '../../entity/Board.entity';

/**
 * Get all boards from db
 * @returns {Promise<Array<BoardEntity>>} returns promise with array of all boards
 */
const getAll = (): Promise<BoardEntity[]> => boardsRepo.getAll();

/**
 * Get single board from db
 * @param {string} id id of single board
 * @returns {Promise<BoardEntity>} returns promise with single board
 */
const get = (id: string): Promise<BoardEntity|undefined> => boardsRepo.get(id);

/**
 * Request to db to create a new board
 * @param {IBoardProps} dto board to be created
 * @returns {Promise<BoardEntity>} returns promise of created board
 */
const create = (dto: IBoardProps): Promise<BoardEntity> => boardsRepo.create(dto);

/**
 * Update board
 * @param {string} id id of board to be updated
 * @param {BoardEntity} body object with data to update
 * @returns {Promise<BoardEntity|null>} returns promise with updated board
 */
const update = (id: string, body: BoardEntity): Promise<BoardEntity|null> =>
  boardsRepo.update(id, body);

/**
 * Delete board from db
 * @async
 * @param {string} id id of board to be deleted
 * @returns {Promise<BoardEntity|null>} returns promise with an empty object if board deleted
 */
const deleteBoard = async (id: string): Promise<BoardEntity|null> => boardsRepo.deleteBoard(id);

export default {getAll, get, create, update, deleteBoard};
