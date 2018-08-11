const express = require('express');
const controller = require('./controller');
const validator = require('./validator');

const router = express.Router();

router.route('/')
  .post(validator.postValidation, controller.add);

router.route('/:id')
  .delete(validator.deleteValidation, controller.deleteDevice)
  .put(validator.updateValidation, controller.edit);

module.exports = router;
