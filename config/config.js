require('dotenv').config();

export default {
  port: process.env.PORT || 5656,
  env: process.env.ENV || 'development'
}