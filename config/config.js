require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || 'development',
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_SERVER_PORT: process.env.DB_SERVER_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
};
