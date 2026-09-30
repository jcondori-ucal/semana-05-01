# Semana 05 — Arquitectura de APIs con Node.js + Express

Material de la semana 5: tres APIs REST pequeñas que muestran cómo organizar el código de un backend en **capas** (`routes → controller → service → repository → model`) y cómo pasar de una organización **por tipo técnico** a una **por módulos**.

Todas guardan los datos **en memoria** (arreglos), así que se reinician al reiniciar el servidor.

## Proyectos

| Carpeta | Qué muestra | Recursos | Detalle |
|---|---|---|---|
| [`api-capas-productos/`](api-capas-productos/) | Refactor de la API de productos de la semana 4 a capas. Incluye el "antes" (todo en el router) y un modo `--traza` que imprime el recorrido por capas. | `productos` | [README](api-capas-productos/README.md) |
| [`api-capas/`](api-capas/) | Arquitectura por capas **monolítica**: carpetas por tipo (`controllers/`, `services/`, …), middlewares y manejo centralizado de errores. | `users`, `orders` | [README](api-capas/README.md) |
| [`api-modular/`](api-modular/) | La misma API, organizada **por módulos/features** (`modules/user`, `modules/order`) con lo transversal en `shared/`. | `users`, `orders` | [README](api-modular/README.md) |
| [`mysql-docker-compose/`](mysql-docker-compose/) | Contenedor MySQL 8 para el siguiente paso: reemplazar los repositorios en memoria por una base de datos. | — | ver abajo |

**Orden sugerido:** `api-capas-productos` → `api-capas` → `api-modular`. Compara `api-capas` y `api-modular`: los endpoints y la lógica son iguales; solo cambia dónde vive cada archivo.

## Requisitos

- Node.js 18 o superior (`api-capas-productos` usa Express 5)
- npm
- Docker (solo para MySQL)

## Cómo ejecutar un proyecto

Cada carpeta es un proyecto independiente con su propio `package.json`:

```bash
cd api-capas          # o api-modular / api-capas-productos
npm install
npm run dev           # con nodemon (recarga al guardar)
# o
npm start
```

- Todas escuchan en `http://localhost:3000`, así que **ejecuta una a la vez**.
- `api-capas` y `api-modular` leen `PORT` desde `.env` (opcional): `cp .env.example .env`.
- `api-capas-productos` tiene además `npm run traza` para ver por qué capas pasa cada solicitud.

## Probar los endpoints

- `api-capas/` y `api-modular/`: archivo `requests.http` (extensión *REST Client* de VS Code).
- `api-capas-productos/`: colección de Postman en `postman/api-productos.postman_collection.json`.

## MySQL con Docker

```bash
cd mysql-docker-compose
docker compose up -d
```

| Parámetro | Valor |
|---|---|
| Host / puerto | `localhost:3306` |
| Base de datos | `mini_api_db` |
| Usuario / contraseña | `api_user` / `api_pass` |
| Root | `root` / `root` |

Los datos persisten en el volumen `mysql_data`. Para detenerlo: `docker compose down` (agrega `-v` para borrar los datos). Estas credenciales son solo para desarrollo local.

> Las APIs todavía **no** se conectan a MySQL; gracias a la capa `repository`, solo esa capa tendrá que cambiar.
