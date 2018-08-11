import mongoose from 'mongoose';
import config from './config';

const db = mongoose.connection;

mongoose.Promise = global.Promise;
§§mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_SERVER_PORT}/${config.DB_NAME}`, { server: { reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 } });

db.on('error', () => { console.log('Erro on MongoDB connection'); });
db.once('open', () => { console.log('Database connected'); });

export default mongoose;
