import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'column'})
export class ColumnEntity {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar', {length: 25})
  title?: string;

  @Column()
  order?: number;
}
