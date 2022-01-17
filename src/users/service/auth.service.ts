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

/* 
  Repository for communicating with User table and doing CRUD
*/
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private accountService: AccountsService,
  ) {}

  /* 
    Creating a user with hashed password.
  */
  async signup(
    email: string,
    fullName: string,
    address: string,
    phoneNumber: string,
    password: string,
  ) {
    const users = await this.userService.find(email);

    /* If user exist with the same email, will throw a Bad Request Exception */
    if (users.length) {
      throw new BadRequestException('Email already exists!');
    }

    /* If the use doesn't exist then create hashed password */
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    /* Create a new object of user with hashed password */
    const user = await this.userService.create(
      email,
      fullName,
      address,
      phoneNumber,
      hashedPassword,
    );
    /* It create a unique personal account for user with £1000 
     Because I couldn't implement a payment gateway for this project */
    await this.accountService.createAccount(
      {
        type: 'PERSONAL',
        totalAmount: 1000,
      },
      user,
    );

    return user;
  }
  /* Sign in user to the system */
  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    /* If user exist with the same email, will throw a Bad Request Exception */
    if (!user) {
      throw new NotFoundException('User not found');
    }
    /* Check if the password user provided match with password that we stored in the database,
      If was incorrect it throw a Bad Request Expection, otherwise return the user and logged it in.
    */
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Password/Email incorrect');
    }
    return user;
  }
}
