const {v4: uuidv4} = require('uuid');

class Column {
  constructor({
    id = uuidv4(),
    title = 'COLUMN',
    order = 1
  } = {}) {
    this.title = title;
    this.id = id;
    this.order = order;
  }

  static toResponse(column) {
    return column;
  }
}

module.exports = Column;
