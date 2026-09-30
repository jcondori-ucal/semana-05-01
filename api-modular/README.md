# API modular (por módulos) — CRUD en memoria

Node.js + Express. Recursos: `users` y `orders`. Datos en arreglos en memoria (se reinician al reiniciar el servidor).

## Ejecutar
```bash
npm install
npm run dev     # con nodemon
# o
npm start
```
Servidor en `http://localhost:3000`. Pruebas listas en `requests.http`.

## Estructura
```
api-modular/
├── src/
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repository.js
│   │   │   └── user.model.js
│   │   └── order/
│   │       ├── order.routes.js
│   │       ├── order.controller.js
│   │       ├── order.service.js
│   │       ├── order.repository.js
│   │       └── order.model.js
│   └── shared/         # lo transversal a todos los módulos
│       ├── middlewares/  # logger, validateId, notFound, errorHandler
│       └── utils/        # AppError
├── app.js
├── server.js
├── package.json
└── .env
```
**Organización por funcionalidad (feature):** todo lo de `user` vive en una carpeta, todo lo de `order` en otra.
Las capas siguen existiendo, pero *dentro* de cada módulo.

**Regla entre módulos:** `order.service` usa `user.service` (la "puerta pública" del módulo user),
nunca `user.repository` directamente.

**Agregar un módulo nuevo** = crear `src/modules/<nombre>/` con sus 5 archivos + 1 línea `app.use(...)` en `app.js`.

## Flujo de una solicitud
`Cliente → routes → controller → service → repository → (arreglo) → JSON`

## Endpoints
| Método | Ruta | Código OK |
|---|---|---|
| GET | /api/users | 200 |
| GET | /api/users/:id | 200 |
| POST | /api/users | 201 |
| PUT | /api/users/:id | 200 |
| DELETE | /api/users/:id | 204 |
| GET | /api/orders (`?userId=1` opcional) | 200 |
| GET | /api/orders/:id | 200 |
| POST | /api/orders | 201 |
| PUT | /api/orders/:id | 200 |
| DELETE | /api/orders/:id | 204 |

Errores: 400 (datos inválidos / JSON mal formado), 404 (no existe), 409 (email duplicado u orden cancelada), 500 (inesperado).
