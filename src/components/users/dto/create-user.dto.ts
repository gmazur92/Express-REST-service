import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @MinLength(3)
  login!: string;

  @IsNotEmpty()
  @MinLength(5)
  password!: string;
}
