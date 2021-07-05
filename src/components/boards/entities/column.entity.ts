import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnDecorator,
  ManyToOne,
} from 'typeorm';
import { Board } from './board.entity';
import { IColumnInterface } from '../interface/column.interface';

@Entity('column')
export class Column implements IColumnInterface{
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
