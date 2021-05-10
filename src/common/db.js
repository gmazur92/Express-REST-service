const User = require('../resources/users/user.model');

const users = [];

users.push(new User(), new User(), new User());

const getAll = () => JSON.parse(JSON.stringify(users));

const get = (id) => users.find(u => id === u.id);

const create = (body) => {
  const newUser = new User({
    ...body,
  });
  users.push(newUser);
  return get(newUser.id);
};

const update = (id, body) => {
  let user = get(id);
  if (!user) {
    throw new Error('Such user is not found');
  }
  user = {...user, ...body};

  const index = users.findIndex(u => u.id === id);
  users[ index ] = user;
  return user;
};

const deleteUser = (id) => {
  const findUser = users.indexOf(u => u.id === id);
  if (!findUser) {
    throw new Error('Such user is not found');
  }
  users.splice(findUser, 1);
  return {};
};

module.exports = {getAll, get, create, update, deleteUser};
