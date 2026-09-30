// app.js -> configura Express y "enchufa" cada módulo
const express = require('express');
const userRoutes = require('./src/modules/user/user.routes');
const orderRoutes = require('./src/modules/order/order.routes');
const logger = require('./src/shared/middlewares/logger');
const notFound = require('./src/shared/middlewares/notFound');
const errorHandler = require('./src/shared/middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: 'API modular funcionando', modules: ['/api/users', '/api/orders'] });
});

// Cada módulo aporta su propio Router. Agregar un módulo = crear su carpeta + 1 línea aquí.
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
