import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './controller/transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './model/transaction.entity';
import { AccountsService } from 'src/accounts/service/accounts.service';
import { UserService } from 'src/users/service/user.service';
import { Account } from 'src/accounts/model/account.entity';
import { User } from 'src/users/model/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account, User])],
  providers: [TransactionService, AccountsService, UserService],
  controllers: [TransactionController],
})
export class TransactionModule {}
