import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { ColumnEntity } from './Column.entity';

@Entity({name: 'board'})
export class BoardEntity {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {length: 25})
  title: string;

  @OneToOne(() => UserEntity, user => user.board, {primary: true})
  user: UserEntity;

  @Column('jsonb', {nullable: true})
  columns: ColumnEntity[] | [];
}
