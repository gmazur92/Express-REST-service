import express from 'express';
import Task, { ITask, ITaskProps } from './task.model';
import taskService from './task.service';

class TaskController {
  static async getAll(_req: express.Request, res: express.Response) {
    const tasks: ITask[] = await taskService.getAll();
    res.json(tasks.map(Task.toResponse));
  }

  static async get(req: express.Request, res: express.Response) {
    const {id} = req.params
    const task: ITask = await taskService.get(id!);
    if (!task) {
      res.status(404).json({});
    }
    res.json(task);
  }

  static async create(req: express.Request, res: express.Response) {
    const {boardId} = req.params
    const newTask: ITaskProps = { ...req.body, boardId: boardId! };
    const createdTask: ITask = await taskService.create(newTask);
    res.status(201).json(Task.toResponse(createdTask));
  }

  static async update(req: express.Request, res: express.Response) {
    const {id} = req.params
    const updatedTask: ITask = await taskService.update(
      id!,
      req.body
    );
    res.status(200).json(Task.toResponse(updatedTask));
  }

  static async deleteById(req: express.Request, res: express.Response) {
    const {id} = req.params
    await taskService.deleteTask(id!);
    res.status(204).json({});
  }
}

export default TaskController;
