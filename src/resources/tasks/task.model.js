const {v4: uuidv4} = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  } = {}) {
    this.id = id;
    this.order = order;
    this.title = title;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }

  static toResponse(task) {
    return task;
  }
}

module.exports = Task;
