import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const newTask: Partial<Task> = {...createTaskDto, boardId}
    const a = await this.taskRepository.save(newTask);
    return a;
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: string) {
    return this.taskRepository.findOne(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    if (!task) return null;
    const updatedTask = { ...task, ...updateTaskDto };
    return this.taskRepository.save(updatedTask);
  }

  remove(boardId: string, taskId: string): any {
    return this.taskRepository.delete({ 'boardId': boardId, 'id': taskId });
  }
}
