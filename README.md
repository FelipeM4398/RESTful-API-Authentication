# RESTful API Authentication

_API RESTful construida con NodeJS meidante el marco Express para la aurenticación y gestión de usuarios utilizando estandares como JSON Web Tokens (JWT) y Role Based Access Control (RBAC)_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

- [Node.js](https://nodejs.org/es/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Instalación 🔧

_Clone o descargue el repositorio y dentro de la carpeta del proyecto ejecute el siguiente comando para instalar las dependencias_

```
npm install
```

_Cree una base de datos con el motor PostgreSQL y configure los datos de conexión a la base de datos en el archivo ./src/config/db/knexfile.js y ejecute las migraciones_

```
npm run migrate
```

_A continuación ejecute el proyecto_

```
npm run dev
```

## Ejecutando las pruebas ⚙️

_Pruebas unitarias_

```
npm run test
```

_Pruebas unitarias y crear reporte de cobertura_

```
npm run test:cover
```

## Versionado 📌

Usamos [Git](https://git-scm.com/) para el versionado.

## Autores ✒️

- **Felipe Muñoz** - _Trabajo Inicial_ - [FelipeM4398](https://github.com/FelipeM4398)
