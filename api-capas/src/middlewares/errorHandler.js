// Manejador centralizado de errores (4 parámetros = Express lo reconoce como error handler)
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // JSON mal formado en el body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El body no es un JSON válido' });
  }

  const status = err.statusCode || 500;
  if (status === 500) console.error(err); // solo logueamos lo inesperado

  res.status(status).json({
    error: status === 500 ? 'Error interno del servidor' : err.message,
  });
};

module.exports = errorHandler;
