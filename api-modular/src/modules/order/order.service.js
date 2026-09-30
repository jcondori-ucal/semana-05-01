// Servicio de órdenes: reglas de negocio (el usuario debe existir, estados válidos, etc.)
const orderRepository = require('./order.repository');
const userService = require('../user/user.service'); // dependencia entre módulos: se usa el servicio, NUNCA el repositorio ajeno
const { ORDER_STATUS } = require('./order.model');
const AppError = require('../../shared/utils/AppError');

const getAll = (userId) =>
  userId ? orderRepository.findByUserId(userId) : orderRepository.findAll();

const getById = (id) => {
  const order = orderRepository.findById(id);
  if (!order) throw new AppError(`Orden ${id} no encontrada`, 404);
  return order;
};

const create = ({ userId, product, quantity, unitPrice } = {}) => {
  if (!Number.isInteger(userId)) throw new AppError('userId debe ser un entero', 400);
  if (!product || typeof product !== 'string') throw new AppError('product es obligatorio', 400);
  if (!Number.isInteger(quantity) || quantity <= 0) throw new AppError('quantity debe ser un entero > 0', 400);
  if (typeof unitPrice !== 'number' || unitPrice <= 0) throw new AppError('unitPrice debe ser un número > 0', 400);

  userService.getById(userId); // regla de negocio: el usuario debe existir (404 si no)

  return orderRepository.create({ userId, product, quantity, unitPrice });
};

const update = (id, { product, quantity, unitPrice, status } = {}) => {
  const current = getById(id);

  if (current.status === 'CANCELADA') {
    throw new AppError('No se puede modificar una orden cancelada', 409);
  }
  if (status !== undefined && !ORDER_STATUS.includes(status)) {
    throw new AppError(`status debe ser uno de: ${ORDER_STATUS.join(', ')}`, 400);
  }
  if (quantity !== undefined && (!Number.isInteger(quantity) || quantity <= 0)) {
    throw new AppError('quantity debe ser un entero > 0', 400);
  }
  if (unitPrice !== undefined && (typeof unitPrice !== 'number' || unitPrice <= 0)) {
    throw new AppError('unitPrice debe ser un número > 0', 400);
  }

  const data = {};
  if (product !== undefined) data.product = product;
  if (quantity !== undefined) data.quantity = quantity;
  if (unitPrice !== undefined) data.unitPrice = unitPrice;
  if (status !== undefined) data.status = status;

  // recalcular total si cambió cantidad o precio
  const q = data.quantity ?? current.quantity;
  const p = data.unitPrice ?? current.unitPrice;
  data.total = +(q * p).toFixed(2);

  return orderRepository.update(id, data);
};

const remove = (id) => {
  getById(id);
  orderRepository.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
