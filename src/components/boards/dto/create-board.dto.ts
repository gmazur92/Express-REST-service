import { Column } from '../entities/column.entity';

export class CreateBoardDto {
  title!: string;
  columns!: Column[];
}
