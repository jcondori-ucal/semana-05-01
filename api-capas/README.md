# API por capas (monolítica) — CRUD en memoria

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
api-capas/
├── src/
│   ├── routes/         # método + URL -> controlador
│   ├── controllers/    # req/res: lee la solicitud y arma la respuesta
│   ├── services/       # lógica y reglas de negocio
│   ├── repositories/   # acceso a datos (hoy: arreglo; luego: MySQL)
│   ├── models/         # forma de cada entidad
│   ├── middlewares/    # logger, validateId, notFound, errorHandler
│   └── utils/          # AppError
├── app.js              # configura Express
├── server.js           # levanta el servidor
├── package.json
└── .env
```
**Organización por tipo técnico:** todos los controladores juntos, todos los servicios juntos, etc.

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
