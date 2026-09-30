// Muestra en la terminal por qué capa pasa cada solicitud.
// Se activa con:  npm run traza   (equivale a node index.js --traza)
const activa = process.argv.includes('--traza');

function traza(capa, mensaje) {
  if (activa) console.log(`  [${capa.padEnd(10)}] ${mensaje}`);
}

module.exports = { traza };
