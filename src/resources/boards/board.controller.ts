import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Board, { IBoard } from './board.model';
import boardsService from './board.service';

class BoardController {
  static async getAll(_req: express.Request, res: express.Response) {
    try {
      const boards: IBoard[] = await boardsService.getAll();
      if (!boards) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(boards.map(Board.toResponse));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }

  }

  static async get(req: express.Request, res: express.Response) {
    const {id} = req.params;
    try {
      const board = await boardsService.get(id!);
      if (!board) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(Board.toResponse(board));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async create(req: express.Request, res: express.Response) {
    try {
      const newBoard: IBoard = await boardsService.create(req.body);
      return res.status(StatusCodes.CREATED).json(Board.toResponse(newBoard));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const {id} = req.params;
    try {
      const updatedBoard: IBoard = await boardsService.update(
        id!,
        req.body,
      );
      if (!updatedBoard) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.OK).json(Board.toResponse(updatedBoard));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async deleteById(req: express.Request, res: express.Response) {
    const {id} = req.params;
    try {
      await boardsService.deleteBoard(id!);
      if (!boardsService) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}

export default BoardController;
