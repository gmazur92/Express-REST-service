import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface TaskServiceInterface {
  create(boardId: string, userDto: CreateTaskDto): Promise<Task>;

  findAll(): Promise<Task[]>;

  findOne(id: string): Promise<Task | undefined>;

  update(id: string, dto: UpdateTaskDto): Promise<Task | undefined>;

  remove(boardId: string, id: string): Promise<void>;
}
