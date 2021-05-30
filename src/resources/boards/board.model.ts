import { v4 as uuidv4 } from 'uuid';
import Column, { IColumn, IColumnProps } from './column.model';

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IBoardProps {
  title: string;
  columns: IColumnProps[] | [];
}

/**
 * Board model
 * This class is used in order to create a new board instance in db
 */
class Board implements IBoard {
  id: string = uuidv4();

  title: string;

  columns: IColumn[];

  /**
   * Class constructor
   * @param {object} params
   * @param {string} title - title of board
   * @param {Array<Column>} columns -array of columns
   */
  constructor({ title = 'board', columns = [] }: Partial<IBoardProps>) {
    this.title = title;
    this.columns = columns.map((col: IColumnProps) => new Column(col));
  }

  /**
   * Static method returns id, title, array of columns as a response to request
   * @param {Board} board
   * @returns {Board}
   */
  static toResponse(board: IBoard): IBoard {
    return board;
  }
}

export default Board;
