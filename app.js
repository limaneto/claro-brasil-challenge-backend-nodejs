import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.set('port', config.port);

app.use((err, req, res, next) => next(err));

app.use((req, res, next) => next({}));

app.listen(app.get('port'), () => {
  console.info(`I am alive at ${app.get('port')} on ${config.env} environment!`);
});
