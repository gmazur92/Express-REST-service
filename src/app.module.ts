import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './common/config';
import { DatabaseConfig } from './database.config';
import { UserModule } from './components/users/user.module';
import { TaskModule } from './components/tasks/task.module';
import { BoardModule } from './components/boards/board.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
    UserModule,
    BoardModule,
    TaskModule,
  ],
})
export class AppModule {}
