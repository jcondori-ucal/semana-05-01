// Controlador: traduce HTTP <-> servicio. Lee req, llama al servicio, responde con res.
const userService = require('../services/user.service');

const getAll = (req, res, next) => {
  try {
    res.status(200).json(userService.getAll());
  } catch (err) {
    next(err);
  }
};

const getById = (req, res, next) => {
  try {
    res.status(200).json(userService.getById(Number(req.params.id)));
  } catch (err) {
    next(err);
  }
};

const create = (req, res, next) => {
  try {
    const user = userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const update = (req, res, next) => {
  try {
    const user = userService.update(Number(req.params.id), req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  try {
    userService.remove(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
