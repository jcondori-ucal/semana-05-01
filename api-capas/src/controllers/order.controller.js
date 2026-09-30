// Controlador de órdenes
const orderService = require('../services/order.service');

const getAll = (req, res, next) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined; // /api/orders?userId=1
    res.status(200).json(orderService.getAll(userId));
  } catch (err) {
    next(err);
  }
};

const getById = (req, res, next) => {
  try {
    res.status(200).json(orderService.getById(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
};

const create = (req, res, next) => {
  try {
    res.status(201).json(orderService.create(req.body));
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    res.status(200).json(orderService.update(Number(req.params.id), req.body));
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  try {
    orderService.remove(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
