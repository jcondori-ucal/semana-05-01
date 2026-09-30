// ============================================================
//  ANTES DE LA REFACTORIZACIÓN (versión de la Semana 4)
//  Cada ruta mezcla 4 responsabilidades: HTTP, validación,
//  reglas de negocio y acceso a datos. Úsalo para comparar.
//  (Archivo de referencia: no se ejecuta en este proyecto)
// ============================================================
const { Router } = require('express');
const { productos, generarId } = require('../data/productos.data');

const router = Router();

router.get('/', (req, res) => {
  const { categoria } = req.query;
  if (categoria) {
    const filtrados = productos.filter((p) => p.categoria === categoria);
    return res.json(filtrados);
  }
  res.json(productos);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: `Producto ${id} no encontrado` });
  }
  res.json(producto);
});

router.post('/', (req, res) => {
  const { nombre, precio, categoria, stock } = req.body;       // HTTP
  if (!nombre || precio === undefined) {                       // validación
    return res.status(400).json({ error: 'nombre y precio son obligatorios' });
  }
  const nuevo = {                                              // reglas / forma del dato
    id: generarId(),
    nombre,
    precio: Number(precio),
    categoria: categoria || 'general',
    stock: Number(stock) || 0
  };
  productos.push(nuevo);                                       // acceso a datos
  res.status(201).json(nuevo);                                 // HTTP
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = productos.findIndex((p) => p.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: `Producto ${id} no encontrado` });
  }
  const { nombre, precio, categoria, stock } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'nombre y precio son obligatorios' });
  }
  productos[indice] = {
    id, nombre, precio: Number(precio),
    categoria: categoria || 'general', stock: Number(stock) || 0
  };
  res.json(productos[indice]);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = productos.findIndex((p) => p.id === id);
  if (indice === -1) {
    return res.status(404).json({ error: `Producto ${id} no encontrado` });
  }
  const [eliminado] = productos.splice(indice, 1);
  res.json({ mensaje: 'Producto eliminado', producto: eliminado });
});

module.exports = router;
