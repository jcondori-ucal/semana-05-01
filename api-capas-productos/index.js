// ============================================================
//  Archivo principal del servidor
//  Solo arranca la app: middlewares, montaje de rutas, 404 y listen.
//  NO contiene lógica de productos (eso vive en src/).
//  Semana 5 · Fundamentos de Desarrollo Back-End · UCAL
// ============================================================
const express = require('express');
const productosRoutes = require('./src/routes/productos.routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de productos funcionando', version: '2.0.0 (por capas)' });
});

// Capa de rutas: todo /api/productos lo maneja su Router
app.use('/api/productos', productosRoutes);

// Cualquier ruta no definida → 404 (siempre al final)
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no existe` });
});

// En Express 5 el callback recibe el error (ej. puerto ocupado)
app.listen(PORT, (error) => {
  if (error) {
    console.error(`No se pudo iniciar: ${error.code}. ¿Otro servidor usa el puerto ${PORT}?`);
    process.exit(1);
  }
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
