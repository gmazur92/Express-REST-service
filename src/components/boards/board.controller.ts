import {
  Inject,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete, Put, NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardServiceInterface } from './interface/board.service.interface';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject('BoardServiceInterface')
    private readonly boardService: BoardServiceInterface,
  ) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardService.findOne(id);
    if (!board) {
      throw new NotFoundException('No board found');
    }
    return board
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
