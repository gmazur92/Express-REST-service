import { ColumnEntity } from '../../../entity/Column.entity';

export interface IBoardProps {
  title: string;
  columns: ColumnEntity[] | [];
}
