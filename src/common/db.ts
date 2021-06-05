import User, { IUser, IUserProps } from '../resources/users/user.model';
import Board, { IBoard, IBoardProps } from '../resources/boards/board.model';
import Task, { ITask, ITaskProps } from '../resources/tasks/task.model';

export type TableType = 'users' | 'boards' | 'tasks';
type TablesType = (IUser | ITask | IBoard)[];
type ModelsType = IBoard & IUser & ITask;
type ModelType = IBoard | IUser | ITask;
type ParamsType = IUserProps | IBoardProps | ITaskProps;
type DbType = { [ key: string ]: ModelsType[] };

/**
 * Create DB mock
 * @type {{boards: Board[], users: User[], tasks: Task[]}}
 */

const DB: DbType = {
  users: [],
  boards: [],
  tasks: [],
};

/**
 * Function returns all records in specified table
 * @param {string} table
 * @returns Promise<Array<Board|User|Task>>
 */
const getAll = async(table: TableType): Promise<ModelsType[]> => DB[ table ]!;

/**
 * Function returns single record from specified table
 * @param {string} table  - name of table - USER/BOARD/TASK
 * @param {string} id - id of specified entity
 * @returns Promise<Board|User|Task>
 */

const get = async(table: TableType, id: string): Promise<ModelsType> => (DB[ table ] as TablesType).find((i: ModelType) => i.id === id) as ModelsType

/**
 * Function creates a new entity in specified table
 * @param {string} table - name of table - USER/BOARD/TASK
 * @param {Board|User|Task} body
 * @returns Promise<Board|User|Task|Object>
 */
const create = async(
  table: TableType,
  body: ParamsType,
): Promise<ModelsType> => {
  let model;
  if (table === 'users') {
    model = new User(<IUserProps>body);
  }
  if (table === 'boards') {
    model = new Board(<IBoardProps>body);
  }
  if (table === 'tasks') {
    model = new Task(<ITaskProps>body);
  }
  (DB[ table ] as TablesType).push(model as ModelsType);
  return get(table, (model as ModelsType).id);
};

/**
 * Updates entity in the specified table
 * @param {string} table -   name of table - USER/BOARD/TASK
 * @param {string} id - userId/boardId/taskId
 * @param {Object} body - params to be updated in specified entity
 * @returns Promise<Board|User|Task|Object>
 */
const update = async(table: TableType, id: string, body: ModelType): Promise<ModelsType> => {
  const idxOfItem = DB[ table ]!.findIndex((i: ModelsType) => i.id === id);
  if (idxOfItem !== -1) {
    (DB[ table ]![ idxOfItem ] as ModelType) = {
      ...DB[ table ]![ idxOfItem ],
      ...body,
    };
  }
  return get(table, id);
};

/**
 *  Deletes entity with provided id from db
 * @param {string} table - name of table - USER/BOARD/TASK
 * @param {string} id -  userId/boardId/taskId
 * @returns Promise<Object> - returns empty object
 */
const deleteById = async(table: TableType, id: string): Promise<boolean> => {
  (DB[ table ] as TablesType) = (DB[ table ] as TablesType).filter(
    (i: ModelType) => i.id !== id,
  );
  return true;
};

/**
 * Update all table rows
 * @param {string} table - name of table - USER/BOARD/TASK
 * @param {Array<Board|User|Task>} rows - array of boards / users / tasks
 * @returns Promise<Array<Board|User|Task>> - return list of all updated rows in a table
 */
const updateTableRows = async(table: TableType, rows: ModelType[]): Promise<ModelsType[]> => {
  if (rows) {
    (DB[ table ] as TablesType) = rows;
  }
  return getAll(table);
};

export default {getAll, get, create, update, deleteById, updateTableRows};
