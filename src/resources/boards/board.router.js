const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const boards = await boardsService.get(req.params.id);
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.create(req.body);
  res.status(201).json(Board.toResponse(newBoard));
});

router.route('/:id').put(async (req, res) => {
  const updatedBoard = await boardsService.update(req.params.id, req.body);
  res.status(200).json(Board.toResponse(updatedBoard));
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.deleteBoard(req.params.id);
  res.status(204).json({});
});

module.exports = router;
