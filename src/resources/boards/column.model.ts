import { v4 as uuidv4 } from 'uuid';

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export type IColumnProps = Omit<IColumn, 'id'>;

/**
 * Column model
 * This class is used in order to create a new column instance in db
 */
class Column implements IColumn {
  id: string = uuidv4();

  title: string;

  order: number;

  /**
   * @param {object} params
   * @param {string} title - column title
   * @param {number} order - order
   */
  constructor({title = 'COLUMN', order = 1}: Partial<IColumnProps>) {
    this.title = title;
    this.order = order;
  }

  /**
   * Static method returns column as a response to request
   * @param {Column} column
   * @returns {Column}
   */
  static toResponse(column: IColumn): IColumn {
    return column;
  }
}

export default Column;
