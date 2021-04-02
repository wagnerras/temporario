// Update with your config settings.
const { db } = require('./env')

module.exports = {

  client: 'postgresql',
  connection: db,
  pool: {
    "pool": {
      "min": 2,
      "max": 20,
    },
  },
  migrations: {
    tableName: 'knex_migrations'
  }

  /* client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    database: 'lemoney',
    user: 'postgres',
    password: '123456',
  },
  pool: {
    "pool": {
      "min": 2,
      "max": 20,
    },
  },
  migrations: {
    tableName: 'knex_migrations'
  }
 */
  /* development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
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
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
 */
};
