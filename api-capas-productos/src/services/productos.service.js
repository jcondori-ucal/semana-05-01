// ============================================================
//  CAPA SERVICIO (lógica de negocio)
//  Aplica las REGLAS del negocio y decide qué pedir al repositorio.
//  No conoce req ni res: recibe datos simples y devuelve datos
//  (o lanza un error con su código de estado).
// ============================================================
const productosRepository = require('../repositories/productos.repository');
const { traza } = require('../utils/traza');

function crearError(status, mensaje) {
  const error = new Error(mensaje);
  error.status = status;
  return error;
}

// Reglas de negocio para registrar o actualizar
function validar(datos) {
  const { nombre, precio, stock } = datos;
  if (!nombre || precio === undefined) {
    throw crearError(400, 'nombre y precio son obligatorios');
  }
  if (Number(precio) <= 0) {
    throw crearError(400, 'el precio debe ser mayor a 0');          // regla NUEVA
  }
  if (stock !== undefined && Number(stock) < 0) {
    throw crearError(400, 'el stock no puede ser negativo');        // regla NUEVA
  }
}

function listar(categoria) {
  traza('service', `listar(${categoria ? `'${categoria}'` : ''})`);
  if (categoria) return productosRepository.obtenerPorCategoria(categoria);
  return productosRepository.obtenerTodos();
}

function obtener(id) {
  traza('service', `obtener(${id})`);
  const producto = productosRepository.obtenerPorId(id);
  if (!producto) throw crearError(404, `Producto ${id} no encontrado`);
  return producto;
}

function registrar(datos) {
  traza('service', 'registrar()');
  validar(datos);
  return productosRepository.guardar(datos);
}

function actualizar(id, datos) {
  traza('service', `actualizar(${id})`);
  obtener(id);          // 404 si no existe (antes de validar, igual que la Semana 4)
  validar(datos);
  return productosRepository.reemplazar(id, datos);
}

function eliminar(id) {
  traza('service', `eliminar(${id})`);
  const eliminado = productosRepository.eliminar(id);
  if (!eliminado) throw crearError(404, `Producto ${id} no encontrado`);
  return eliminado;
}

module.exports = { listar, obtener, registrar, actualizar, eliminar };
