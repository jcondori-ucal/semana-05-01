// Rutas del módulo USER: todo lo de 'usuarios' vive en esta carpeta
const { Router } = require('express');
const userController = require('./user.controller');
const validateId = require('../../shared/middlewares/validateId');

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', validateId, userController.getById);
router.post('/', userController.create);
router.put('/:id', validateId, userController.update);
router.delete('/:id', validateId, userController.remove);

module.exports = router;
