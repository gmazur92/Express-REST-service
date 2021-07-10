import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

export interface BoardServiceInterface {
  create(boardDto: CreateBoardDto): Promise<Board>;

  findAll(): Promise<Board[]>;

  findOne(id: string): Promise<Board | undefined>;

  update(id: string, dto: UpdateBoardDto): Promise<Board | undefined>;

  remove(id: string): Promise<void>;
}
