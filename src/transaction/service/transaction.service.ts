import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/service/accounts.service';
import { UserService } from 'src/users/service/user.service';
import { Repository } from 'typeorm';
import { Transaction } from '../model/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
    private accountService: AccountsService,
  ) {}

  async findSenderAcc(user) {
    const result = await this.accountService.findAccByUserId(user.id);
    return result;
  }
  async findReceiverAcc(accNum, sortCode) {
    const result = await this.accountService.findAccByAccNum(accNum, sortCode);
    return result;
  }
  async createTransaction(payload, user) {
    const sender = await this.findSenderAcc(user);

    if (payload.amount > sender.totalAmount) {
      return 'Your money is not enough to make this transaction!';
    }

    const receiver = await this.findReceiverAcc(
      payload.accNum,
      payload.sortCode,
    );

    const transaction = {
      fAccId: sender.id,
      fAccNum: sender.accountNumber,
      fSortCode: sender.sortCode,

      tAccId: receiver.id,
      tAccNum: receiver.accountNumber,
      tSortCode: receiver.sortCode,

      amount: payload.amount,
    };

    const Sender = await this.repo.create({ ...transaction, type: 'SEND' });
    const Receiver = await this.repo.create({
      ...transaction,
      type: 'RECEIVE',
    });

    const resSender = await this.repo.save(Sender);
    const resReceiver = await this.repo.save(Receiver);

    await this.accountService.updateTotalAmount(
      receiver.id,
      'ADD',
      payload.amount,
    );
    await this.accountService.updateTotalAmount(
      sender.id,
      'REDUCE',
      payload.amount,
    );

    return {
      resSender,
      resReceiver,
    };
  }
}
