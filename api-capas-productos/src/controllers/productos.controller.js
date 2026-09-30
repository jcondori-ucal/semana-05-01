// ============================================================
//  CAPA CONTROLADOR
//  Traduce HTTP ⇄ datos: lee req (params, query, body),
//  llama al servicio y arma la respuesta (código + JSON).
//  No contiene reglas de negocio ni toca el arreglo.
// ============================================================
const productosService = require('../services/productos.service');
const { traza } = require('../utils/traza');

// Convierte un error del servicio en una respuesta HTTP
// (en la Semana 10 esto pasará a un middleware centralizado)
function responderError(res, error) {
  const status = error.status || 500;
  if (status === 500) console.error(error);          // el detalle solo en la terminal
  res.status(status).json({ error: status === 500 ? 'Error interno del servidor' : error.message });
}

function listar(req, res) {
  traza('controller', 'listar');
  const productos = productosService.listar(req.query.categoria);
  res.json(productos);
}

function obtenerPorId(req, res) {
  traza('controller', 'obtenerPorId');
  try {
    const id = Number(req.params.id);                // req.params llega como texto
    const producto = productosService.obtener(id);
    res.json(producto);
  } catch (error) {
    responderError(res, error);
  }
}

function registrar(req, res) {
  traza('controller', 'registrar');
  try {
    const nuevo = productosService.registrar(req.body);
    res.status(201).json(nuevo);                     // 201 Created
  } catch (error) {
    responderError(res, error);
  }
}

function actualizar(req, res) {
  traza('controller', 'actualizar');
  try {
    const actualizado = productosService.actualizar(Number(req.params.id), req.body);
    res.json(actualizado);
  } catch (error) {
    responderError(res, error);
  }
}

function eliminar(req, res) {
  traza('controller', 'eliminar');
  try {
    const eliminado = productosService.eliminar(Number(req.params.id));
    res.json({ mensaje: 'Producto eliminado', producto: eliminado });
  } catch (error) {
    responderError(res, error);
  }
}

module.exports = { listar, obtenerPorId, registrar, actualizar, eliminar };
