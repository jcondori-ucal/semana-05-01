// Modelo: define la FORMA de una orden
const ORDER_STATUS = ['PENDIENTE', 'PAGADA', 'ENVIADA', 'CANCELADA'];

const createOrder = ({ id, userId, product, quantity, unitPrice }) => ({
  id,
  userId,
  product,
  quantity,
  unitPrice,
  total: +(quantity * unitPrice).toFixed(2),
  status: 'PENDIENTE',
  createdAt: new Date().toISOString(),
});

module.exports = { createOrder, ORDER_STATUS };
