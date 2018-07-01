const { PG_DATABASE, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT } = process.env;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'bitcoin',
      user: 'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: PG_DATABASE,
      user: PG_USER,
      password: PG_PASSWORD,
      host: PG_HOST,
      port: PG_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
