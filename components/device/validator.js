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

const postValidation = async (req, res, next) => {
  const num = Math.floor(Math.random() * 4);
  const device = new Device();
  device.user = config.USERS_ID[num];
  const user = await User.findById(device.user);
  config.USER_ID = user.id;

  await Device.find({ user: config.USER_ID }).populate('user').exec((err, devices) => {
    if (user.devicesAmount < 3) {
      req.validation = { success: true, device: { user: user.id, name: 'iphone 4', os: 'ios' } };
      return next();
    }

    if (user.devicesAmount === 3) {
      if (devices.length === 3) {
        req.validation = { success: false, devices, message: 'You\'ve reached the limit of registered devices but you can delete one and add another.' };
      } else {
        req.validation = { success: true, device: { user: user.id, name: 'iphone 4', os: 'ios' } };
      }
      return next();
    }

    if (user.devicesAmount > 3) {
      if (devices.length === 3 && wasRegisteredWithinThirtyDays(devices)) {
        req.validation = { success: false, devices, message: 'You\'ve reached the limit of registered devices. You already registered a device within 30 last days.' };
        return next();
      }

      if (wasRegisteredWithinThirtyDays(devices)) {
        req.validation = { success: false, devices, message: 'You already registered a device within 30 last days.' };
        return next();
      }

      if (devices.length === 3) {
        req.validation = { success: false, devices, message: 'You\'ve reached the limit of registered devices but you can delete one and add another.' };
      }
    }

    req.validation = { success: true, device: { user: user.id, name: 'samsung 8', os: 'android' } };
    return next();
  });
};

/** END OF ADD A DEVICE VALIDATIONS * */


export default postValidation;
