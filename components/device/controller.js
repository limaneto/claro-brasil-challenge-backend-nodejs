const add = ((req, res) => res.json({ message: 'It hit post!' }));

const deleteDevice = ((req, res) => res.json({ message: 'It hit put!', id: req.params.id }));

const edit = ((req, res) => res.json({ message: 'It hit delete!', id: req.params.id }));

export { add, deleteDevice, edit };
