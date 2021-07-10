import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @MinLength(3)
  login!: string;
  @IsNotEmpty()
  @MinLength(5)
  password!: string;
}

