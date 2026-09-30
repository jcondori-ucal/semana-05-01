// Servicio: lógica de negocio y reglas. No conoce req/res ni cómo se guardan los datos.
const userRepository = require('./user.repository');
const AppError = require('../../shared/utils/AppError');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getAll = () => userRepository.findAll();

const getById = (id) => {
  const user = userRepository.findById(id);
  if (!user) throw new AppError(`Usuario ${id} no encontrado`, 404);
  return user;
};

const validate = ({ name, email, age }, partial = false) => {
  if (!partial || name !== undefined) {
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      throw new AppError('name es obligatorio (mínimo 2 caracteres)', 400);
    }
  }
  if (!partial || email !== undefined) {
    if (!email || !EMAIL_REGEX.test(email)) {
      throw new AppError('email es obligatorio y debe tener formato válido', 400);
    }
  }
  if (age !== undefined && age !== null && (!Number.isInteger(age) || age < 0)) {
    throw new AppError('age debe ser un entero positivo', 400);
  }
};

const create = ({ name, email, age } = {}) => {
  validate({ name, email, age });
  if (userRepository.findByEmail(email)) {
    throw new AppError(`El email ${email} ya está registrado`, 409);
  }
  return userRepository.create({ name: name.trim(), email, age });
};

const update = (id, { name, email, age } = {}) => {
  getById(id); // lanza 404 si no existe
  validate({ name, email, age }, true);

  const other = email && userRepository.findByEmail(email);
  if (other && other.id !== id) {
    throw new AppError(`El email ${email} ya está registrado`, 409);
  }

  // solo actualizamos los campos que llegaron
  const data = {};
  if (name !== undefined) data.name = name.trim();
  if (email !== undefined) data.email = email;
  if (age !== undefined) data.age = age;

  return userRepository.update(id, data);
};

const remove = (id) => {
  getById(id);
  userRepository.remove(id);
};

module.exports = { getAll, getById, create, update, remove };
