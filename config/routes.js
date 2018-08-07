import express from 'express';
import deviceRoute from '../components/device/route';

const router = express.Router();
router.use('/devices', deviceRoute);


export default (app) => {
  app.use('/api', router);
};
