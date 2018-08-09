import Device from './model';

const add = ((req, res) => {
  if (req.validation.success) {
    const device = new Device(req.validation.device);
    device
      .save()
      .then(() => {
        res.status(201).json({ message: 'Device registered with success!', device });
      });
  }
});

const deleteDevice = ((req, res) => {
  res.json({ message: 'It hit put!', id: req.params.id });
});

const edit = ((req, res) => {
  res.json({ message: 'It hit delete!', id: req.params.id });
});

export { add, deleteDevice, edit };
