import express from 'express';
import { add, deleteDevice, edit } from './controller';
import { postValidation, deleteValidation } from './validator';

const router = express.Router();

router.route('/')
  .post(postValidation, add);

router.route('/:id')
  .delete(deleteValidation, deleteDevice)
  .put(edit);

export default router;
