import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ITaskInterface } from './interface/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<ITaskInterface> {
    const newTask: Partial<Task> = {...createTaskDto, boardId}
    return this.taskRepository.save(newTask);
  }

  async findAll(): Promise<ITaskInterface[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<ITaskInterface | undefined> {
    return this.taskRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<ITaskInterface | null> {
    const task = await this.findOne(id);
    if (!task) return null;
    return this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(boardId: string, taskId: string): Promise<void> {
    await this.taskRepository.delete({ 'boardId': boardId, 'id': taskId });
  }
}
