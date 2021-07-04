import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.password = userDto.password;
    user.login = userDto.login;
    user.name = userDto.name;
    return await this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: string): Promise<User|undefined> {
    return await this.userRepository.findOne(id);
  }

  public async findOneByLogin(login: string): Promise<User|undefined> {
    return await this.userRepository.findOne({where: login});
  }

  public async update(id: string, dto: UpdateUserDto) {
    const user: User|undefined = await this.findOne(id);
    if (!user) {
      return null;
    }
    const updatedUser: Partial<User> = {...user, ...dto};
    return await this.userRepository.save(updatedUser);
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
