// ============================================================
//  CAPA RUTAS
//  Solo conecta: método HTTP + ruta  →  función del controlador.
//  Se lee como el "menú" de la API.
// ============================================================
const { Router } = require('express');
const productosController = require('../controllers/productos.controller');
const { traza } = require('../utils/traza');

const router = Router();

// Traza: muestra qué solicitud llegó a este Router
router.use((req, res, next) => {
  traza('routes', `${req.method} ${req.originalUrl}`);
  next();
});

router.get('/', productosController.listar);
router.get('/:id', productosController.obtenerPorId);
router.post('/', productosController.registrar);
router.put('/:id', productosController.actualizar);
router.delete('/:id', productosController.eliminar);

module.exports = router;
