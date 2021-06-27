import { getRepository } from 'typeorm';
import { IBoardProps } from './dto/requestBoard.dto';
import { BoardEntity } from '../../entity/Board.entity';

/**
 * Request to db to create a new board
 * @param {BoardEntity} body board to be created
 * @returns {Promise<BoardEntity>} returns promise with  created board
 */
const create = async (body: IBoardProps): Promise<BoardEntity> => {
  const boardRepository = getRepository(BoardEntity);
  return boardRepository.save(body);
};

/**
 * Get all boards from db
 * @returns {Promise<Array<BoardEntity>>} returns promise with array of all boards
 */
const getAll = async (): Promise<BoardEntity[]> => {
  const boardRepository = getRepository(BoardEntity);
  return boardRepository.find({ relations: ['columns'] });
};

/**
 * Get single board from db
 * @param {string} id id of single board
 * @returns {Promise<BoardEntity|undefined>} returns promise with single board
 */
const get = async (id: string): Promise<BoardEntity|undefined> => {
  const boardRepository = getRepository(BoardEntity);
  return boardRepository.findOne({ where: { id }, relations: ['columns'] });
};

/**
 * Update board
 * @param {string} id id of board to be updated
 * @param {BoardEntity} body object with data to update
 * @returns {Promise<BoardEntity|null>} returns promise with updated board
 */
const update = async (id: string, body: BoardEntity): Promise<BoardEntity|null> => {
  const boardRepository = getRepository(BoardEntity);
  let boardToUpdate: BoardEntity|undefined = await boardRepository.findOne(id);
  if (!boardToUpdate) {
    return null;
  }
  boardToUpdate = {...boardToUpdate, ...body};
  return boardRepository.save(boardToUpdate);
};
/**
 * Delete board from db
 * @param {string} id id of board to be deleted
 * @returns {Promise<BoardEntity|null>} returns promise with an empty object if board deleted
 */
const deleteBoard = async (id: string): Promise<BoardEntity|null> => {
  const boardRepository = getRepository(BoardEntity);
  const boardToRemove: BoardEntity|undefined = await boardRepository.findOne(id);
  if (!boardToRemove) {
    return null;
  }
  return boardRepository.remove(boardToRemove);
};

export default {getAll, get, create, update, deleteBoard};
