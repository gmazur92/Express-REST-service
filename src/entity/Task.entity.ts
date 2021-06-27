import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { BoardEntity }from './Board.entity';

@Entity({name: 'task'})
export class TaskEntity {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {length: 25})
  title?: string;

  @Column('int')
  order?: number;

  @Column('text')
  description?: string;

  @Column('varchar', { nullable: true })
  userId?: string | null;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id, {
    onDelete: "SET NULL",
    nullable: true
  })

  @JoinColumn({ name: 'userId' })
  user?: string | null;

  @Column('varchar', { nullable: true })
  boardId?: string | null;

  @ManyToOne(() => BoardEntity, (board: BoardEntity) => board.id, {
    onDelete: "CASCADE",
    nullable : true
  })

  @JoinColumn({ name: 'boardId' })
  board?:  string | null;

  @Column('varchar', { nullable: true })
  columnId?:  string | null;
}
