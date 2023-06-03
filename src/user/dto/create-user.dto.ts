import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  mail: string;
  @MinLength(8, { message: 'please provide a stronger password' })
  password: string;
}
