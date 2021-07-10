import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './entities/board.entity';
import { Column } from './entities/column.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Column]), forwardRef(() => AuthModule)],
  controllers: [BoardController],
  providers: [
    {
      provide: 'BoardServiceInterface',
      useClass: BoardService,
    },
  ],
})
export class BoardModule {}
