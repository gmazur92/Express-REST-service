import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  findAll() {
    return this.boardRepository.find({relations: ['columns']});
  }

  findOne(id: string) {
    return this.boardRepository.findOne({where: {id}, relations: ['columns']});
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(id);
    if (!board) {
      return null;
    }
    const updatedBoard: Partial<Board> = {...board, ...updateBoardDto};
    return this.boardRepository.save(updatedBoard);
  }

  async remove(id: string) {
    const boardToRemove = await this.boardRepository.findOne(id);
    if (!boardToRemove) {
      return null
    }
    return this.boardRepository.remove(boardToRemove);
  }
}
