const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const get = (id) => tasksRepo.get(id);

const create = (body) => tasksRepo.create(body);

const update = (id, body) => tasksRepo.update(id, body);

const deleteTask = (id) => tasksRepo.deleteTask(id);

const unassignTasks = async(id) => {
  let changedTasks;
  const tasks = await tasksRepo.getAll(id);
  if (tasks) {
    changedTasks = tasks.map((task) => {
      if (task.userId === id) {
        const taskToNullUser = task;
        taskToNullUser.userId = null;
        return taskToNullUser;
      }
      return task;
    });
  }
  return tasksRepo.updateTableRows(changedTasks);
};

const deleteAllTasksBelongsToBoard = async(id) => {
  let changedTasks;
  const tasks = await tasksRepo.getAll();
  if (tasks) {
    changedTasks = tasks.filter(task => task.boardId !== id);
  }
  return tasksRepo.updateTableRows(changedTasks);
};

module.exports = {getAll, get, create, update, deleteTask, unassignTasks, deleteAllTasksBelongsToBoard};
