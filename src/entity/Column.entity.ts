import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BoardEntity } from './Board.entity';

@Entity({name: 'column'})
export class ColumnEntity {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', {length: 25})
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    createForeignKeyConstraints: false,
  })
  board!: BoardEntity;
}
