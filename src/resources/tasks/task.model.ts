import { v4 as uuidv4 } from 'uuid';

export interface ITask {
  id: string;
  title: string;
  order: number | null;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export interface ITaskProps {
  title: string;
  order?: number | null;
  description?: string;
  userId: string;
  boardId: string;
  columnId: string;
}
/**
 * Task model
 * This class is used in order to create a new task instance in db
 */

/**
 * Class constructor
 * @param {object} params
 * @param {string} title - title of a new task
 * @param {number | null} order - number of order
 * @param {string | null} description - task description
 * @param {string | null} userId - uuid of user
 * @param {string} boardId - uuid of a board where task is located
 * @param {string} columnId - uuid of a column where task is located
 */
class Task implements ITask {
  id: string = uuidv4();

  title: string;

  order: number | null;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    title = 'Task title',
    order = null,
    description = '',
    userId,
    boardId,
    columnId,
  }: ITaskProps) {
    this.order = order;
    this.title = title;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }

  /**
   * Static method returns Task as a response to request
   * @param {Task} task
   * @returns {Task}
   */
  static toResponse(task: ITask): ITask {
    return task;
  }
}

export default Task;
