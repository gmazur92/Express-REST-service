import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.password = userDto.password;
    user.login = userDto.login;
    user.name = userDto.name;
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User|undefined> {
    return await this.userRepository.findOne(id);
  }

  async findOneByLogin(login: string): Promise<User|undefined> {
    return await this.userRepository.findOne({login});
  }

  async update(id: string, dto: UpdateUserDto): Promise<User|null> {
    const user: User|undefined = await this.findOne(id);
    if (!user) return null;
    return this.userRepository.save({...user, ...dto});
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({'id': id});
  }
}
