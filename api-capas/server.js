// server.js -> SOLO levanta el servidor (arranque / infraestructura)
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API por capas escuchando en http://localhost:${PORT}`);
});
