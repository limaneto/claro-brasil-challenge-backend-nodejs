import express from 'express';
import { add, deleteDevice, edit } from './controller';
import validator from './validator';

const router = express.Router();

router.route('/')
  .post(validator, add);

router.route('/:id')
  .delete(validator, deleteDevice)
  .put(validator, edit);

export default router;
