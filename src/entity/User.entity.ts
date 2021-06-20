import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { BoardEntity } from './Board.entity';

@Entity({name: 'user'})
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {length: 50})
  name?: string;

  @Column('varchar', {length: 50})
  login?: string;

  @Column('varchar', {length: 50})
  password?: string;

  @OneToMany('BoardEntity', 'user')
  board?: BoardEntity;
}
