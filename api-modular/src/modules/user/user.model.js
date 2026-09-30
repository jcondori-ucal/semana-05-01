// Modelo: define la FORMA de un usuario (qué campos tiene y cómo se construye)
const createUser = ({ id, name, email, age }) => ({
  id,
  name,
  email,
  age: age ?? null,
  createdAt: new Date().toISOString(),
});

module.exports = { createUser };
