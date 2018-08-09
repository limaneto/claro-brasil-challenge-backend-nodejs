import express from 'express';
import { add, deleteDevice, edit } from './controller';
import { postValidation, deleteValidation, updateValidation } from './validator';

const router = express.Router();

router.route('/')
  .post(postValidation, add);

router.route('/:id')
  .delete(deleteValidation, deleteDevice)
  .put(updateValidation, edit);

export default router;
