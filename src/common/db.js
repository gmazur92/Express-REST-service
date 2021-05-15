const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const c = require('./constants');

const DB = {
  users: [],
  boards: [],
  tasks: [],
};

const getAll = table => DB[ table ];
const get = (table, id) => DB[ table ].find(i => i.id === id);

const create = (table, body) => {
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

const update = async(table, id, body) => {
  const idxOfItem = DB[ table ].findIndex(i => i.id === id);
  if (idxOfItem !== -1) {
    DB[ table ][ idxOfItem ] = {...DB[ table ][ idxOfItem ], ...body};
  }
  return get(table, id);
};

const deleteById = (table, id) => {
  DB[ table ] = DB[ table ].filter(i => i.id !== id);
  return {};
};

const deleteBoardAndTasks = (id) => {
  DB.boards = DB.boards.filter(b => b.id !== id);
  DB.tasks = DB.tasks.filter(t => t.boardId !== id);
  return {};
};

const deleteUserAndUnassignTasks = (id) => {
  DB.users = DB.boards.filter(b => b.id !== id);
  const userTasks = getAll(c.TASKS);
  if (userTasks) {
    userTasks.forEach((task, index) => {userTasks[ index ].userId = null;});
    DB.tasks = [ ...DB.tasks, ...userTasks ];
  }
  return {};
};

module.exports = {getAll, get, create, update, deleteById, deleteBoardAndTasks, deleteUserAndUnassignTasks};
