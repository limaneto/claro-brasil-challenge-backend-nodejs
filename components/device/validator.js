import differenceInDays from 'date-fns/difference_in_days';
import Device from './model';
import User from '../user/model';
import { get } from '../../utils/utility';

/** ADD A DEVICE VALIDATIONS * */

/**
 * Inform if the last device was registered within the last 30 days
 * if true, then user cannot register another device
 * @param devices
 */
const wasRegisteredWithinThirtyDays = (devices) => {
  const timeStamps = devices.map(device => (+new Date(device.createdAt).getTime()));
  const mostRecentRegister = Math.max(...timeStamps);
  return differenceInDays(new Date(), new Date(mostRecentRegister)) < 30;
};

const activeDevices = devices => devices.filter(device => device.active);

// TODO dizer a data que o usuário vai poder registar outro device
const postValidation = async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    req.validation = { success: false, message: 'User not found' };
    return next();
  }

  req.body.device.user = user.id;
  await Device.find({ user: user.id }).exec((err, devices) => {
    if (devices.length < 3) {
      req.validation = { success: true, device: req.body.device };
      return next();
    }

    const numberOfActiveDevices = activeDevices(devices).length;

    if (devices.length === 3) {
      if (numberOfActiveDevices === 3) {
        req.validation = { success: false, message: 'You\'ve reached the limit of registered devices but you can delete one and add another.' };
      } else {
        req.validation = { success: true, device: req.body.device };
      }
      return next();
    }

    if (devices.length > 3) {
      if (numberOfActiveDevices === 3 && wasRegisteredWithinThirtyDays(devices)) {
        req.validation = { success: false, message: 'You\'ve reached the limit of registered devices. You already registered a device within 30 last days.' };
        return next();
      }

      if (wasRegisteredWithinThirtyDays(devices)) {
        req.validation = { success: false, message: 'You already registered a device within 30 last days.' };
        return next();
      }

      if (numberOfActiveDevices === 3) {
        req.validation = { success: false, message: 'You\'ve reached the limit of registered devices but you can delete one and add another.' };
      }
    }

    req.validation = { success: true, device: req.body.device };
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
    req.validation = { success: false, message: 'Device cannot be remove since you would not be able to register another.' };
  } else req.validation = { success: true, message: 'Device deleted successfully.', device };
  return next();
};

/** END OF DELETE A DEVICE VALIDATIONS * */


const updateValidation = (req, res, next) => {
  if (get('device.name', req.body)) {
    req.validation = { success: true };
  } else {
    req.validation = { success: false, message: 'You have to send the name of the device.' };
  }
  return next();
};

export { postValidation, deleteValidation, updateValidation };
