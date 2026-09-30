// app.js -> configura Express: middlewares globales, rutas y manejo de errores
const express = require('express');
const routes = require('./src/routes');
const logger = require('./src/middlewares/logger');
const notFound = require('./src/middlewares/notFound');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

app.use(express.json()); // parsea el body JSON -> req.body
app.use(logger);         // middleware propio: registra cada solicitud

app.get('/', (req, res) => {
  res.json({ message: 'API por capas funcionando', endpoints: ['/api/users', '/api/orders'] });
});

app.use('/api', routes);

// SIEMPRE al final: primero 404, luego el manejador de errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;
