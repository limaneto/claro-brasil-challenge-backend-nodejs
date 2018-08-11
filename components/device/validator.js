const differenceInDays = require('date-fns/difference_in_days');
const addDays = require('date-fns/add_days');
const Device = require('./model');
const User = require('../user/model');
const utility = require('../../utils/utility');
const phrases = require('../../utils/phrases');
const ApiError = require('../../utils/erroConstructor');

let erro;

/** ADD A DEVICE VALIDATIONS * */

const dateFromLastRegister = (devices) => {
  const timeStamps = devices.map(device => (+new Date(device.createdAt).getTime()));
  const mostRecentRegister = Math.max(...timeStamps);
  return new Date(mostRecentRegister);
};

/**
 * Inform if the last device was registered within the last 30 days
 * if true, then user cannot register another device
 * @param devices
 */
const wasRegisteredWithinThirtyDays = (devices) => {
  const lastRegister = dateFromLastRegister(devices);
  return differenceInDays(new Date(), lastRegister) < 30;
};

const nextAllowedDate = (devices) => {
  const lastRegister = dateFromLastRegister(devices);
  return addDays(lastRegister, 30);
};

const activeDevices = devices => devices.filter(device => device.active);

// TODO dizer a data que o usuário vai poder registar outro device
const postValidation = async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return next();
  }

  req.body.device.user = user.id;
  await Device.find({ user: user.id }).exec((err, allUserDevices) => {
    const userActiveDevices = activeDevices(allUserDevices);
    const withinLastThirtyDays = wasRegisteredWithinThirtyDays(userActiveDevices);

    if (allUserDevices.length > 3) {
      if (withinLastThirtyDays) {
        const nextDate = nextAllowedDate(userActiveDevices);
        if (userActiveDevices.length < 3) {
          erro = new ApiError(`${phrases.device.register.time} ${phrases.device.register.nextDate} ${nextDate}`, 400);
        } else erro = new ApiError(`${phrases.device.register.limit} ${phrases.device.register.time} ${phrases.device.register.nallow} ${phrases.device.register.nextDate} ${nextDate}`, 400);
        return next(erro);
      }
    }

    if (userActiveDevices.length === 3) {
      err = new ApiError(`${phrases.device.register.limit} ${phrases.device.register.allow}`, 400);
      return next(err);
    }
    return next();
  });
};

/** END OF ADD A DEVICE VALIDATIONS * */


/** DELETE A DEVICE VALIDATIONS * */

// TODO dizer a data que o usuário vai poder registar outro device
const deleteValidation = async (req, res, next) => {
  const device = await Device.findById(req.params.id);
  const devices = await Device.find({ user: device.user });
  const devicesActive = activeDevices(devices);
  if (devices.length > 3 && devicesActive.length === 1 && wasRegisteredWithinThirtyDays(devicesActive)) {
    erro = new ApiError(`${phrases.device.delete.nallow}`, 400);
    return next(erro);
  }
  req.body.device = device;
  return next();
};

/** END OF DELETE A DEVICE VALIDATIONS * */


const updateValidation = (req, res, next) => {
  if (utility.get('device.name', req.body)) {
    req.validation = { success: true };
  } else {
    req.validation = { success: false, message: 'You have to send the name of the device.' };
  }
  return next();
};

module.exports = { postValidation, deleteValidation, updateValidation };
