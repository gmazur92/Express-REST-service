import { Request, NextFunction, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IBoardProps } from './dto/requestBoard.dto';
import boardsService from './board.service';
import { BoardEntity } from '../../entity/Board.entity';

class BoardController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const boards: BoardEntity[] = await boardsService.getAll();
      if (!boards) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(boards);
    } catch (e) {
      return next(e);
    }
  }

  static async get(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const board: BoardEntity|undefined = await boardsService.get(id);
      if (!board) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(board);
    } catch (e) {
      return next(e);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const boardDto: IBoardProps = req.body;
    try {
      const newBoard: BoardEntity = await boardsService.create(boardDto);
      return res.status(StatusCodes.CREATED).json(newBoard);
    } catch (e) {
      return next(e);
    }
  }

  static async update(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const updatedBoard: BoardEntity|null = await boardsService.update(
        id,
        req.body,
      );
      if (!updatedBoard) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.OK).json(BoardEntity);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteById(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const result: BoardEntity|null = await boardsService.deleteBoard(id);
      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (e) {
      return next(e);
    }
  }
}

export default BoardController;
