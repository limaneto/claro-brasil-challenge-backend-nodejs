const validator = (req, res, next) => {
  req.validator = { status: 200, message: 'Successful validation' };
  return next();
};

export default validator;
