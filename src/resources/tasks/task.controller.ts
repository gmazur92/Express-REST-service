import { Request, NextFunction, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ITaskProps } from './dto/requestTask.dto';
import taskService from './task.service';
import { TaskEntity } from '../../entity/Task.entity';
import { BoardEntity } from '../../entity/Board.entity';

class TaskController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const tasks: TaskEntity[] = await taskService.getAll();
      if (!tasks) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(tasks);
    } catch (e) {
      return next(e);
    }
  }

  static async get(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const task: TaskEntity|undefined = await taskService.get(id);
      if (!task) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(task);
    } catch (e) {
      return next(e);
    }
  }

  static async create(req: Request<{boardId: string}>, res: Response, next: NextFunction) {
    const {boardId} = req.params;
    try {
      const newTask: ITaskProps = {...req.body, boardId};
      const createdTask: TaskEntity = await taskService.create(newTask);
      return res.status(StatusCodes.CREATED).json(createdTask);
    } catch (e) {
      return next(e);
    }
  }

  static async update(req: Request<{id: string}, BoardEntity>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const updatedTask: TaskEntity|null = await taskService.update(
        id,
        req.body,
      );
      return res.status(StatusCodes.OK).json(updatedTask);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteById(req: Request<{id: string}>, res: Response, next: NextFunction) {
    const {id} = req.params;
    try {
      const result = await taskService.deleteTask(id);
      if (!result) {
        return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
      }
      return res.status(StatusCodes.NO_CONTENT).json(ReasonPhrases.NO_CONTENT);
    } catch (e) {
      return next(e);
    }
  }
}

export default TaskController;
