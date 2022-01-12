import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/model/user.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { Account } from '../model/account.entity';

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(Account) private repo: Repository<Account>) {}

  async createAccount(payload: CreateAccountDto, user: User) {
    const accountObj = {
      accountNumber: parseInt(Date.now().toString().slice(5)),
      sortCode: parseInt(Date.now().toString().slice(7)),
      type: payload.type,
      totalAmount: payload.totalAmount,
    };
    const account = await this.repo.create(accountObj);
    account.user = user;
    return this.repo.save(account);
  }
}
