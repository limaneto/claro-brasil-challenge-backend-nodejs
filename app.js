import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config/config';
import bindRoutes from './config/routes';

require('./config/mongoose');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.set('port', config.port);

app.listen(app.get('port'), () => {
  console.info(`I am alive at ${app.get('port')} on ${config.env} environment!`);
});

bindRoutes(app);

app.use((req, res, next) => {
  res.status(404).json({ erro: { message: 'Not found' } });
});

app.use((err, req, res, next) => {
  res.status(500).json({ erro: { message: 'Something went wrong.' } });
});

