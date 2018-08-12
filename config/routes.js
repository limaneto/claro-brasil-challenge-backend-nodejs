const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const deviceRoute = require('../components/device/route');

const router = express.Router();
router.use('/devices', deviceRoute);


module.exports = (app) => {
  app.use('/api', router);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
