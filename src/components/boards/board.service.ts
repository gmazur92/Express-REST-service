import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { IBoardInterface } from './interface/board.interface';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<IBoardInterface> {
    return this.boardRepository.save(createBoardDto);
  }

  async findAll(): Promise<IBoardInterface[]> {
    return this.boardRepository.find({relations: ['columns']});
  }

  async findOne(id: string): Promise<IBoardInterface|undefined> {
    return this.boardRepository.findOne({where: {id}, relations: ['columns']});
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<IBoardInterface|null> {
    const board = await this.findOne(id);
    if (!board) return null;
    return this.boardRepository.save({...board, ...updateBoardDto});
  }

  async remove(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
