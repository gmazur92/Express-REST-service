import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
// import { UserService } from '../components/users/user.service';
import { AuthDto } from './dto/auth.dto';
import { UserServiceInterface } from '../components/users/interface/user.service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserServiceInterface')
    private readonly userService: UserServiceInterface,
    // private userService: UserService,
    private jwtService: JwtService) {};

  async signIn(dto: AuthDto): Promise<{token: string}> {
    const user = await this.userService.findOneByLogin(dto.login);
    if (!user) {
      throw new NotFoundException({message: 'No account with this login has been registered.'});
    }
    const isMatch = await compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException({message: 'Invalid login or password'});
    }
    const token = this.jwtService.sign({login: user.login, password: user.password});
    return {token};
  }
}
