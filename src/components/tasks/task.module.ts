import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => AuthModule)],
  controllers: [TaskController],
  providers: [
    {
      provide: 'TaskServiceInterface',
      useClass: TaskService,
    },
  ],
})
export class TaskModule {}
