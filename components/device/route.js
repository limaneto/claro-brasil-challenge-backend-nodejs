import express from 'express';

const router = express.Router();

router.route('/')
  .post((req, res) => res.json({ message: 'It hit post!' }));

router.route('/:id')
  .put((req, res) => res.json({ message: 'It hit put!', id: req.params.id }))
  .delete((req, res) => res.json({ message: 'It hit delete!', id: req.params.id }));

export default router;
