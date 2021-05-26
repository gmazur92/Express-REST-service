const {v4: uuidv4} = require('uuid');

/**
 * Column model
 * This class is used in order to create a new column instance in db
 */
class Column {
  /**
   * @param {object} params
   * @param {string} id - column id
   * @param {string} title - column title
   * @param {number} order - order
   */
  constructor({
    id = uuidv4(),
    title = 'COLUMN',
    order = 1,
  } = {}) {
    this.title = title;
    this.id = id;
    this.order = order;
  }

  /**
    * Static method returns column as a response to request
   * @param {Column} column
   * @returns {Column}
   */
  static toResponse(column) {
    return column;
  }
}

module.exports = Column;
