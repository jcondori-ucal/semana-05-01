// Repositorio de órdenes (en memoria)
const { createOrder } = require('./order.model');

let orders = [
  createOrder({ id: 1, userId: 1, product: 'Laptop', quantity: 1, unitPrice: 2500 }),
  createOrder({ id: 2, userId: 2, product: 'Mouse', quantity: 2, unitPrice: 45.5 }),
];
let nextId = 3;

const findAll = () => orders;

const findByUserId = (userId) => orders.filter((o) => o.userId === userId);

const findById = (id) => orders.find((o) => o.id === id);

const create = (data) => {
  const order = createOrder({ id: nextId++, ...data });
  orders.push(order);
  return order;
};

const update = (id, data) => {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;
  orders[index] = { ...orders[index], ...data, id };
  return orders[index];
};

const remove = (id) => {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return false;
  orders.splice(index, 1);
  return true;
};

module.exports = { findAll, findByUserId, findById, create, update, remove };
