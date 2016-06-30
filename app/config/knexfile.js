module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'eventbrite',
      user:     'root'
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
