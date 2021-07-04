import { DeleteResult } from 'typeorm';
import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  Get,
  Param,
  Delete, Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserServiceInterface } from './interface/user.service.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { IUser, IUserResponse } from './interface/user.interface';

@Controller('users')
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  @HttpCode(201)
  public async create(@Body() createUserDto: CreateUserDto): Promise<IUserResponse|null> {
    const createdUser: IUser = await this.userService.create(createUserDto);
    if (!createdUser) {
      return null;
    }
    return new ResponseUserDto(createdUser);
  }

  @Get()
  @HttpCode(200)
  public async findAll(): Promise<IUserResponse[]|[]> {
    const users: IUser[]|[] = await this.userService.findAll();
    return users.map(u => new ResponseUserDto(u));
  }

  @Get(':id')
  @HttpCode(200)
  public async findOne(@Param('id') id: string): Promise<IUserResponse|undefined> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse|undefined> {
    const user: IUser|undefined = await this.userService.update(id, updateUserDto);
    if (!user) {
      return undefined;
    }
    return new ResponseUserDto(user);
  }

  @Delete(':id')
  @HttpCode(200)
  public async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
