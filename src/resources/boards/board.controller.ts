import express from 'express';
import Board, { IBoard } from './board.model';
import boardsService from './board.service';

class BoardController {
  static async getAll(_req: express.Request, res: express.Response) {
    const boards: IBoard[] = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  }

  static async get(req: express.Request, res: express.Response) {
    const {id} = req.params
    const board = await boardsService.get(id!);
    if (!board) {
      res.status(404).json({});
    }
    res.json(Board.toResponse(board));
  }

  static async create(req: express.Request, res: express.Response) {
    const newBoard: IBoard = await boardsService.create(req.body);
    res.status(201).json(Board.toResponse(newBoard));
  }

  static async update(req: express.Request, res: express.Response) {
    const {id} = req.params
    const updatedBoard: IBoard = await boardsService.update(
      id!,
      req.body
    );
    res.status(200).json(Board.toResponse(updatedBoard));
  }

  static async deleteById(req: express.Request, res: express.Response) {
    const {id} = req.params
    try {
      await boardsService.deleteBoard(id!);
      res.status(204).json({});
    } catch (e) {
      res.status(404).json({});
    }
  }
}

export default BoardController;
