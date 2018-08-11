const mongoose = require('mongoose');
const config = require('./config');

const db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_SERVER_PORT}/${config.DB_NAME}`, { connectTimeoutMS: 30000, keepAlive: 300000, promiseLibrary: global.Promise, useNewUrlParser: true });

db.on('error', () => { console.log('Erro on MongoDB connection'); });
db.once('open', () => { console.log('Database connected'); });

module.exports = mongoose;
