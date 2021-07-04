import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnDecorator,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';

@Entity('column')
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ColumnDecorator('varchar', { length: 25 })
  title!: string;

  @ColumnDecorator()
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    createForeignKeyConstraints: false,
  })
  board!: Board;
}
