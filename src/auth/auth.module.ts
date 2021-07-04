import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../components/users/user.module';

// import { JWT_SECRET_KEY } from "../common/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'JWT_SECRET_KEY',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  exports: [
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}
