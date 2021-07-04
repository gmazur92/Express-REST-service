import { DeleteResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserServiceInterface {
  create(userDto: CreateUserDto): Promise<User>;

  findAll(): Promise<User[]>;

  findOne(id: string): Promise<User | undefined>;

  update(id: string, dto: UpdateUserDto): Promise<User | undefined>;

  remove(id: string): Promise<DeleteResult>;
}
