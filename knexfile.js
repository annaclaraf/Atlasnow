require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migration',
      directory: `${__dirname}/src/database/migrations`
    }, 
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
};