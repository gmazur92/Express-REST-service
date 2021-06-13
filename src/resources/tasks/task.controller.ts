import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Task, { ITask, ITaskProps } from './task.model';
import taskService from './task.service';

class TaskController {
  static async getAll(_req: express.Request, res: express.Response) {
    try {
      const tasks: ITask[] = await taskService.getAll();
      if (!tasks) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(tasks.map(Task.toResponse));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async get(req: express.Request, res: express.Response) {
    const {id} = req.params
    try {
      const task: ITask = await taskService.get(id!);
      if (!task) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
      }
      return res.json(task);
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async create(req: express.Request, res: express.Response) {
    const {boardId} = req.params
    try {
      const newTask: ITaskProps = { ...req.body, boardId: boardId! };
      const createdTask: ITask = await taskService.create(newTask);
      return res.status(StatusCodes.CREATED).json(Task.toResponse(createdTask));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const {id} = req.params
    try {
      const updatedTask: ITask = await taskService.update(
        id!,
        req.body
      );
      return res.status(StatusCodes.OK).json(Task.toResponse(updatedTask));
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  static async deleteById(req: express.Request, res: express.Response) {
    const {id} = req.params
    try {
      await taskService.deleteTask(id!);
      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}

export default TaskController;
