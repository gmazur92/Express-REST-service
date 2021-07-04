import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './components/users/user.module';
import { config } from './common/config';
import { DatabaseConfig } from './database.config';
import { TaskModule } from './components/tasks/task.module';
import { BoardModule } from './components/boards/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    UserModule,
    BoardModule,
    TaskModule,
  ],
})
export class AppModule {}
