import { IsEmail, IsString } from 'class-validator';

/* 
  Data transfer object - (DTO) for validating data through this ENDPOINT:3000/auth/signup
*/
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
