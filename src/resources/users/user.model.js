const {v4: uuidv4} = require('uuid');

class User {
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
    id = uuidv4()
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;