import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { AccountsService } from 'src/accounts/service/accounts.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountsService,
  ) {}

  async signup(
    email: string,
    fullName: string,
    address: string,
    phoneNumber: string,
    password: string,
  ) {
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('Email already exists!');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    const user = await this.userService.create(
      email,
      fullName,
      address,
      phoneNumber,
      hashedPassword,
    );
    await this.accountService.createAccount(
      {
        type: 'PERSONAL',
        totalAmount: 0,
      },
      user,
    );

    return user;
  }
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Password/Email incorrect');
    }
    return user;
  }
}
