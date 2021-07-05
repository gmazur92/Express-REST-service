import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Board } from '../../boards/entities/board.entity';
import { ITaskInterface } from '../interface/task.interface';

@Entity('task')
export class Task implements ITaskInterface {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {length: 25})
  title!: string;

  @Column('int')
  order!: number;

  @Column('text')
  description!: string;

  @Column('varchar', {nullable: true})
  userId!: string|null;

  @ManyToOne(() => User, (user: User) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({name: 'userId'})
  user!: string|null;

  @Column('varchar', {nullable: true})
  boardId!: string|null;

  @ManyToOne(() => Board, (board: Board) => board.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({name: 'boardId'})
  board!: string|null;

  @Column('varchar', {nullable: true})
  columnId!: string|null;
}
