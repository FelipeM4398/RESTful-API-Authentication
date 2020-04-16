module.exports = {
  // configuración de la base de datos en el ambiente de producción
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../../../db/migrations',
    },
    seeds: {
      directory: '../../../db/seeds',
    },
  },
  // configuración de la base de datos en el ambiente de desarrollo
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'auth',
      user: 'postgres',
      password: 'password',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../../../db/migrations',
    },
    seeds: {
      directory: '../../../db/seeds',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test/db/test.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './test/seeds',
    },
  },
};
