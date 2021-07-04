import { JwtService } from '@nestjs/jwt';
import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {};

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) throw new UnauthorizedException('No authentication token, access denied');
      request.user = await this.jwtService.verifyAsync(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException(`Authorization failed: ${err.message} `);
    }
  };
}
