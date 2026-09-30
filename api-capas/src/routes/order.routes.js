const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const validateId = require('../middlewares/validateId');

const router = Router();

router.get('/', orderController.getAll);
router.get('/:id', validateId, orderController.getById);
router.post('/', orderController.create);
router.put('/:id', validateId, orderController.update);
router.delete('/:id', validateId, orderController.remove);

module.exports = router;
