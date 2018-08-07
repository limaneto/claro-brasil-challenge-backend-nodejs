import express from 'express';
import { add, deleteDevice, edit } from './controller';

const router = express.Router();

router.route('/')
  .post(add);

router.route('/:id')
  .delete(deleteDevice)
  .put(edit);

export default router;
