// Rutas: SOLO mapean método + URL -> controlador (y middlewares de ruta)
const { Router } = require('express');
const userController = require('../controllers/user.controller');
const validateId = require('../middlewares/validateId');

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', validateId, userController.getById);
router.post('/', userController.create);
router.put('/:id', validateId, userController.update);
router.delete('/:id', validateId, userController.remove);

module.exports = router;
