import { Entity, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnEntity } from './Column.entity';
import type { UserEntity } from './User.entity';

@Entity({name: 'board'})
export class BoardEntity {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {length: 25})
  title?: string;

  @OneToOne('UserEntity', 'board')
  user?: UserEntity;

  @Column('jsonb', {nullable: true})
  columns?: ColumnEntity[] | [];
}
