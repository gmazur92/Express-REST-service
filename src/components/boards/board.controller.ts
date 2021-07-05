import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete, Put, NotFoundException, UseGuards, HttpException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardServiceInterface } from './interface/board.service.interface';
import { AuthGuard } from '../../auth/auth.guard';
import { IBoardInterface } from './interface/board.interface';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(
    @Inject('BoardServiceInterface')
    private readonly boardService: BoardServiceInterface,
  ) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<IBoardInterface> {
    const board: IBoardInterface|undefined = await this.boardService.create(createBoardDto);
    if (!board) {
      throw new HttpException('Board is not created.', 500);
    }
    return board;
  }

  @Get()
  async findAll(): Promise<IBoardInterface[]> {
    return this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IBoardInterface> {
    const board = await this.boardService.findOne(id);
    if (!board) {
      throw new NotFoundException('No board found');
    }
    return board;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto): Promise<IBoardInterface> {
    const board: IBoardInterface | undefined = await this.boardService.update(id, updateBoardDto);
    if (!board) {
      throw new NotFoundException('No board found');
    }
    return board;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.boardService.remove(id);
  }
}
