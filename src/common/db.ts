const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const c = require('./constants');

/**
 * Create DB mock
 * @type {{boards: Board[], users: User[], tasks: Task[]}}
 */
const DB = {
  users: [ new User(), new User() ],
  boards: [ new Board(), new Board() ],
  tasks: [ new Task(), new Task() ],
};

/**
 * Function returns all records in specified table
 * @param {string} table
 * @returns Promise<Array<Board|User|Task>>
 */
const getAll = async table => DB[ table ];

/**
 * Function returns single record from specified table
 * @param {string} table  - name of table - USER/BOARD/TASK
 * @param {string} id - id of specified entity
 * @returns Promise<Board|User|Task>
 */
const get = async(table, id) => DB[ table ].find(i => i.id === id);

/**
 * Function creates a new entity in specified table
 * @param {string} table - name of table - USER/BOARD/TASK
 * @param {Board|User|Task} body
 * @returns Promise<Board|User|Task|Object>
 */
const create = async(table, body) => {
  let model;
  switch (table) {
    case c.USERS:
      model = new User(body);
      break;
    case c.BOARDS:
      model = new Board(body);
      break;
    case c.TASKS:
      model = new Task(body);
      break;
    default:
      return {};
  }
  DB[ table ].push(model);
  return get(table, model.id);
};

/**
 * Updates entity in the specified table
 * @param {string} table -   name of table - USER/BOARD/TASK
 * @param {string} id - userId/boardId/taskId
 * @param {Object} body - params to be updated in specified entity
 * @returns Promise<Board|User|Task|Object>
 */
const update = async(table, id, body) => {
  const idxOfItem = DB[ table ].findIndex(i => i.id === id);
  if (idxOfItem !== -1) {
    DB[ table ][ idxOfItem ] = {...DB[ table ][ idxOfItem ], ...body};
  }
  return get(table, id);
};

/**
 *  Deletes entity with provided id from db
 * @param {string} table - name of table - USER/BOARD/TASK
 * @param {string} id -  userId/boardId/taskId
 * @returns Promise<Object> - returns empty object
 */
const deleteById = async(table, id) => {
  DB[ table ] = DB[ table ].filter(i => i.id !== id);
  return {};
};

/**
 * Update all table rows
 * @param {string} table - name of table - USER/BOARD/TASK
 * @param {Array<Board|User|Task>} rows - array of boards / users / tasks
 * @returns Promise<Array<Board|User|Task>> - return list of all updated rows in a table
 */
const updateTableRows = async(table, rows) => {
  if (rows) {
    DB[ table ] = rows;
  }
  return getAll(table);
};

module.exports = {getAll, get, create, update, deleteById, updateTableRows};
