import { Body, Controller, Post, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SigninDto } from '../dtos/signin.dto';
import { UserDto } from '../dtos/user.dto';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

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

  @Post('/signin')
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }
}
