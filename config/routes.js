const express = require('express');
const deviceRoute = require('../components/device/route');

const router = express.Router();
router.use('/devices', deviceRoute);


module.exports = (app) => {
  app.use('/api', router);
};
