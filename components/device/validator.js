import differenceInDays from 'date-fns/difference_in_days';
import Device from './model';
import User from '../user/model';
import config from '../../config/config';

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


export default postValidation;
