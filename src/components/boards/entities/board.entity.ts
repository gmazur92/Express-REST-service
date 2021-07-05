import {
  Entity,
  Column as ColumnDecorator,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import type { User } from '../../users/entities/user.entity';
import type { Column } from './column.entity';
import { IBoardInterface } from '../interface/board.interface';

@Entity('board')
export class Board implements IBoardInterface {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ColumnDecorator('varchar', { length: 25 })
  title!: string;

  @OneToOne('user', 'board')
  user!: User;

  @OneToMany('column', 'board', {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  columns!: Column[];
}
