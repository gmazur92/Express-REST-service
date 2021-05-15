const Board = require('./board.model');
const boardsService = require('./board.service');

const getAll = async(req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
};

const get = async(req, res) => {
  const board = await boardsService.get(req.params.id);
  if (!board) {
    res.status(404).json({});
  }
  res.json(Board.toResponse(board));
};

const create = async(req, res) => {
  const newBoard = await boardsService.create(req.body);
  res.status(201).json(Board.toResponse(newBoard));
};

const update = async(req, res) => {
  const updatedBoard = await boardsService.update(req.params.id, req.body);
  res.status(200).json(Board.toResponse(updatedBoard));
};

const deleteById = async(req, res) => {
  try {
    await boardsService.deleteBoard(req.params.id);
    res.status(204).json({});
  } catch (e) {
    res.status(404).json({});
  }
};

module.exports = {
  getAll, get, create, update, deleteById
};
