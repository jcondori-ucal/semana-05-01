// Punto central de rutas: agrupa todos los recursos bajo /api
const { Router } = require('express');
const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes');

const router = Router();

router.use('/users', userRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
