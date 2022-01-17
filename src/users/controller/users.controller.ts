import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SigninDto } from '../dtos/signin.dto';
import { UserDto } from '../dtos/user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private authService: AuthService) {}

  /* 
    Signup route handler
    >> POST >> ENDPOINT:3000/auth/signup
    >> receive: email, fullname, address, phoneNumber, password

    and finallay login user to the system.
  */
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      body.email,
      body.fullName,
      body.address,
      body.phoneNumber,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  /* 
    SignIn route handler
    >> POST >> ENDPOINT:3000/auth/signin
    >> receive: email, password

    and finallay login user to the system.
  */
  @Post('/signin')
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  /* 
    SignOut route handler
    >> POST >> ENDPOINT:3000/auth/signout
    >> receive: nothing

    just make post request and done
  */
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
