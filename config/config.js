require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5656,
  env: process.env.NODE_ENV || 'development',
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_SERVER_PORT: process.env.DB_SERVER_PORT,
  USERS_ID: []
}