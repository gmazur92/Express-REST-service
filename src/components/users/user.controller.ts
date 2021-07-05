import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  Get,
  Param,
  Delete, Put, UseGuards, NotFoundException, HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserServiceInterface } from './interface/user.service.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { IUser, IUserResponse } from './interface/user.interface';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto): Promise<IUserResponse|null> {
    const createdUser: IUser = await this.userService.create(createUserDto);
    if (!createdUser) {
      throw new HttpException('User is not created.', 500);
    }
    return new ResponseUserDto(createdUser);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<IUserResponse[]|[]> {
    const users: IUser[]|[] = await this.userService.findAll();
    return users.map(u => new ResponseUserDto(u));
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<IUserResponse|undefined> {
    const user: IUser|undefined = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException({message: 'User is not found.'});
    }
    return new ResponseUserDto(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserResponse|undefined> {
    const user: IUser|undefined = await this.userService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException({message: 'User is not found.'});
    }
    return new ResponseUserDto(user);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
