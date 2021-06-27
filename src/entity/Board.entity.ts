import { Entity, Column, OneToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import type { ColumnEntity } from './Column.entity';
import type { UserEntity } from './User.entity';

@Entity({name: 'board'})
export class BoardEntity {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {length: 25})
  title!: string;

  @OneToOne('UserEntity', 'board')
  user!: UserEntity;

  @OneToMany('ColumnEntity', 'board', {cascade: true, onDelete:"CASCADE", onUpdate:"CASCADE"})

  @JoinColumn()
  columns!: ColumnEntity[]
}
