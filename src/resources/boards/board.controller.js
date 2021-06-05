const Board = require('./board.model');
const boardsService = require('./board.service');

module.exports = class BoardController {
  static async getAll(req, res) {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  };

  static async get(req, res) {
    const board = await boardsService.get(req.params.id);
    if (!board) {
      res.status(404).json({});
    }
    res.json(Board.toResponse(board));
  };

  static async create(req, res) {
    const newBoard = await boardsService.create(req.body);
    res.status(201).json(Board.toResponse(newBoard));
  };

  static async update(req, res) {
    const updatedBoard = await boardsService.update(req.params.id, req.body);
    res.status(200).json(Board.toResponse(updatedBoard));
  };

  static async deleteById(req, res) {
    try {
      await boardsService.deleteBoard(req.params.id);
      res.status(204).json({});
    } catch (e) {
      res.status(404).json({});
    }
  };
};
