import Device from './model';
import phrases from '../../utils/phrases';

const add = ((req, res, next) => {
  const device = new Device(req.body.device);
  device
    .save()
    .then(() => {
      res.status(201).json({ message: 'Device registered with success!', device });
    })
    .catch((err) => {
      next(err);
    });
});

const deleteDevice = (async (req, res, next) => {
  const { device } = req.body.device;
  device.active = false;
  device
    .save()
    .then(() => {
      res.status(200).json({ message: `Your ${req.body.device.name} was deleted.` });
    })
    .catch(err => next(err));
});

const edit = ((req, res, next) => {
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
});

export { add, deleteDevice, edit };
