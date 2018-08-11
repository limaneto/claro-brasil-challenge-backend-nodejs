import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import config from './config/config';
import bindRoutes from './config/routes';
import ApiError from './utils/erroConstructor';
import createUsers from './utils/createDefaultUser';

if (config.env !== 'test') {
  require('./config/mongoose');
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.set('port', config.port);

app.listen(app.get('port'), () => {
  console.info(`I am alive at ${app.get('port')} on ${config.env} environment!`);
});

bindRoutes(app);
if (config.env !== 'test') {
  createUsers();
}

app.use((req, res, next) => {
  const err = new ApiError('Not found', '404');
  return next(err);
});

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const unifiedErrorMessage = err.errors[Object.keys(err.errors)[0]].message;
    const error = new ApiError(unifiedErrorMessage, err.status);
    return next(error);
  }

  if (!(err instanceof ApiError)) {
    const apiError = new ApiError(err.message, err.status);
    return next(apiError);
  }
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
  });
});

module.exports = app;
