// Repositorio: ÚNICA capa que toca los datos. Hoy es un arreglo en memoria;
// cuando llegue MySQL (semana 6-7) solo cambiará este archivo.
const { createUser } = require('./user.model');

let users = [
  createUser({ id: 1, name: 'Ana Torres', email: 'ana@mail.com', age: 22 }),
  createUser({ id: 2, name: 'Luis Ramos', email: 'luis@mail.com', age: 25 }),
];
let nextId = 3;

const findAll = () => users;

const findById = (id) => users.find((u) => u.id === id);

const findByEmail = (email) => users.find((u) => u.email === email);

const create = (data) => {
  const user = createUser({ id: nextId++, ...data });
  users.push(user);
  return user;
};

const update = (id, data) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...data, id }; // el id nunca cambia
  return users[index];
};

const remove = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

module.exports = { findAll, findById, findByEmail, create, update, remove };
