import { IsEmail, IsString } from 'class-validator';

/* 
  Data transfer object - (DTO) for validating data through this ENDPOINT:3000/auth/signin
*/
export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
