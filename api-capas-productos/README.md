# API Productos v2 · Semana 5

 

## Estructura
```
api-productos/
├── index.js                               ← archivo principal: app, express.json, rutas, 404, listen
├── src/
│   ├── routes/productos.routes.js         ← método + ruta → controlador
│   ├── controllers/productos.controller.js← req/res: lee, llama al servicio, responde
│   ├── services/productos.service.js      ← reglas de negocio (sin req/res)
│   ├── repositories/productos.repository.js ← único lugar con el arreglo en memoria
│   ├── models/producto.model.js           ← clase Producto (forma + valores por defecto)
│   └── utils/traza.js                     ← muestra el recorrido por capas (--traza)
├── extra/productos.routes.semana4.js      ← ANTES: todo mezclado en el Router (referencia)
└── postman/api-productos.postman_collection.json
```

## Ejecutar
```bash
npm install
npm run dev      # nodemon
npm run traza    # imprime por qué capas pasa cada solicitud
```

```
  [routes    ] GET /api/productos/2
  [controller] obtenerPorId
  [service   ] obtener(2)
  [repository] obtenerPorId(2)
```

## Endpoints 
| Método | Ruta               | Éxito | Errores |
|--------|--------------------|-------|---------|
| GET    | /api/productos     | 200   | — |
| GET    | /api/productos/:id | 200   | 404 |
| POST   | /api/productos     | 201   | 400 |
| PUT    | /api/productos/:id | 200   | 400, 404 |
| DELETE | /api/productos/:id | 200   | 404 |

**Reglas nuevas (en el servicio):** `precio > 0` y `stock >= 0` → 400.

## Postman
Carpetas 1 y 2 = colección de la Semana 4 sin cambios (14 tests). Carpeta 3 = reglas nuevas (3 tests).
Reinicia el servidor antes de ejecutar el Runner.
