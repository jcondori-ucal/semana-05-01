// ============================================================
//  CAPA MODELO (entidad)
//  Define la FORMA de un producto y sus valores por defecto.
//  No sabe de HTTP ni de dónde se guardan los datos.
// ============================================================
class Producto {
  constructor({ id, nombre, precio, categoria, stock }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = Number(precio);
    this.categoria = categoria || 'general';
    this.stock = Number(stock) || 0;
  }
}

module.exports = Producto;
