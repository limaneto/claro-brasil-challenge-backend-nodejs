import Device from './model';
import phrases from '../../utils/phrases';

const add = ((req, res, next) => {
  if (req.validation.success) {
    const device = new Device(req.validation.device);
    device
      .save()
      .then(() => {
        res.status(201).json({ message: 'Device registered with success!', device });
      })
      .catch(err => next(err));
  } else res.status(200).json({ message: req.validation.message });
});

const deleteDevice = (async (req, res, next) => {
  if (req.validation.success) {
    const { device } = req.validation;
    device.active = false;
    device
      .save()
      .then(() => {
        res.status(200).json({ message: `Your ${device.name} was deleted.` });
      })
      .catch(err => next(err));
  } else res.status(200).json({ message: req.validation.message });
});

const edit = ((req, res, next) => {
  if (req.validation.success) {
    Device
      .findById(req.params.id)
      .then((device) => {
        device.name = req.body.device.name;
        device
          .save()
          .then(() => {
            res.json({ message: `${phrases.device.success}`, device });
          })
          .catch(err => next(err));
      });
  } else res.status(400).json({ message: req.validation.message });
});

export { add, deleteDevice, edit };
