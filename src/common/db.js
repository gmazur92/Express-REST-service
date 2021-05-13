const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const Column = require('../resources/boards/column.model');
const c = require("./constants");

const users = [];
const boards = [];
let tasks = [];


users.push(new User(),new User(),new User())
boards.push(new Board(),new Board(),new Board())
tasks.push(new Task(),new Task(),new Task())


const getAll = (type) => {
  switch (type) {
    case c.USERS:
      return JSON.parse(JSON.stringify(users));
    case c.BOARDS:
      return JSON.parse(JSON.stringify(boards));
    case c.TASKS:
      return JSON.parse(JSON.stringify(tasks));
    default:
      return {};
  }
};

const getOne = (type, id) => {
  switch (type) {
    case c.USERS:
      return users.find(u => id === u.id);
    case c.BOARDS:
      return boards.find(b => id === b.id);
    case c.TASKS:
      return tasks.find(t => id === t.id);
    default:
      return {};
  }
};

const create = (type, body) => {
  switch (type) {
    case c.USERS: {
      const newUser = new User(body)
      users.push(newUser);
      return getOne(c.USERS, newUser.id);
    }
    case c.BOARDS: {
      const {title, columns} = body;
      const newColumns = columns.map(el => new Column(el));
      const newBoard = new Board({title, columns: newColumns});
      boards.push(newBoard);
      return newBoard;
    }
    case c.TASKS: {
      const newTask = new Task(body);
      tasks.push(newTask);
      return newTask;
    }
    default:
      return {};
  }
};

const update = (type, id, body) => {
  switch (type) {
    case c.USERS: {
      let user = getOne(id);
      if (!user) {
        throw new Error('Such user is not found');
      }
      user = {...user, ...body};

      const index = users.findIndex(u => u.id === id);
      users[ index ] = user;
      return user;
    }
    case c.BOARDS:
      return boards.find(b => id === b.id);
    case c.TASKS:
      return tasks.find(t => id === t.id);
    default:
      return {};
  }
};

const deleteOne = (type, id) => {
  switch (type) {
    case c.USERS: {
      const findUser = users.indexOf(u => u.id === id);
      if (!findUser) {
        throw new Error('Such user is not found');
      }
      const userTasks = getAll(c.TASKS).filter(t => t.userId === id)
      if (userTasks) {
        userTasks.forEach((task, index) => {userTasks[ index ].userId = null;});
        tasks = [tasks, ...userTasks]
      }
      users.splice(findUser, 1);
      return {};
    }
    case c.BOARDS:
      return boards.find(b => id === b.id);
    case c.TASKS:
      return tasks.find(t => id === t.id);
    default:
      return {};
  }
};

module.exports = {getAll, getOne, create, update, deleteOne};
