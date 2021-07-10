import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject, Put, HttpCode, NotFoundException, UseGuards, HttpException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskServiceInterface } from './interface/task.service.interface';
import { AuthGuard } from '../../auth/auth.guard';
import { ITaskInterface } from './interface/task.interface';

@Controller('/boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(
    @Inject('TaskServiceInterface')
    private readonly taskService: TaskServiceInterface,
  ) {}

  @Post()
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto): Promise<ITaskInterface> {
    const task: ITaskInterface|undefined = await this.taskService.create(boardId, createTaskDto);
    if (!task) {
      throw new HttpException('Task is not created.', 500);
    }
    return task;
  }

  @Get()
  async findAll(): Promise<ITaskInterface[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ITaskInterface> {
    const task: ITaskInterface|undefined = await this.taskService.findOne(id);
    if (!task) {
      throw new NotFoundException('No task found');
    }
    return task;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<ITaskInterface> {
    const task: ITaskInterface|undefined = await this.taskService.update(id, updateTaskDto);
    if (!task) {
      throw new NotFoundException('No task found');
    }
    return task;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('boardId') boardId: string, @Param('id') id: string): Promise<void> {
    return this.taskService.remove(boardId, id);
  }
}
