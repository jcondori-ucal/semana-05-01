// ============================================================
//  CAPA REPOSITORIO (acceso a datos)
//  Única capa que toca el arreglo en memoria.
//  En la Semana 6 este archivo cambiará a MySQL y
//  las demás capas NO tendrán que cambiar.
// ============================================================
const Producto = require('../models/producto.model');
const { traza } = require('../utils/traza');

// "Base de datos" temporal (se reinicia con el servidor)
const productos = [
  new Producto({ id: 1, nombre: 'Laptop Lenovo', precio: 2500, categoria: 'computo', stock: 10 }),
  new Producto({ id: 2, nombre: 'Mouse Logitech', precio: 80, categoria: 'accesorios', stock: 50 }),
  new Producto({ id: 3, nombre: 'Monitor LG 24"', precio: 650, categoria: 'computo', stock: 15 })
];

let ultimoId = productos.length;

function obtenerTodos() {
  traza('repository', 'obtenerTodos()');
  return productos;
}

function obtenerPorCategoria(categoria) {
  traza('repository', `obtenerPorCategoria('${categoria}')`);
  return productos.filter((p) => p.categoria === categoria);
}

function obtenerPorId(id) {
  traza('repository', `obtenerPorId(${id})`);
  return productos.find((p) => p.id === id) || null;
}

function guardar(datos) {
  traza('repository', 'guardar()');
  ultimoId = ultimoId + 1;
  const nuevo = new Producto({ ...datos, id: ultimoId });
  productos.push(nuevo);
  return nuevo;
}

function reemplazar(id, datos) {
  traza('repository', `reemplazar(${id})`);
  const indice = productos.findIndex((p) => p.id === id);
  if (indice === -1) return null;
  productos[indice] = new Producto({ ...datos, id }); // el id NO cambia
  return productos[indice];
}

function eliminar(id) {
  traza('repository', `eliminar(${id})`);
  const indice = productos.findIndex((p) => p.id === id);
  if (indice === -1) return null;
  const [eliminado] = productos.splice(indice, 1);
  return eliminado;
}

module.exports = { obtenerTodos, obtenerPorCategoria, obtenerPorId, guardar, reemplazar, eliminar };
