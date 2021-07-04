import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject, Put, HttpCode, NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskServiceInterface } from './interface/task.service.interface';
import { Task } from './entities/task.entity';

@Controller('/boards/:boardId/tasks')
export class TaskController {
  constructor(
    @Inject('TaskServiceInterface')
    private readonly taskService: TaskServiceInterface,
  ) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(boardId, createTaskDto);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task|undefined> {
    const task: Task | undefined = await this.taskService.findOne(id);
    if (!task) {
      throw new NotFoundException('No task found');
    }
    return task;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('boardId') boardId: string, @Param('id') id: string): Promise<any> {
    const a = await this.taskService.remove(boardId, id);
    console.log(a);
  return {};
  }
}
