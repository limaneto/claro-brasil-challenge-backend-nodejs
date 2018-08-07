import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use((err, req, res, next) => next(err));

app.use((req, res, next) => next({}));

app.listen(config.port, () => {
  console.info(`I am alive at ${config.port} (${config.env})`);
});
