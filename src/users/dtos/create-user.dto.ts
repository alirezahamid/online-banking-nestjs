import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  fullName: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  password: string;
}
