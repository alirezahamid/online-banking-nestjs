import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/model/user.entity';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('/transfer')
  transferMoney(@Body() body: CreateTransactionDto, @CurrentUser() user: User) {
    return this.transactionService.createTransaction(body, user);
  }

  @Get('transactions')
  findTransactions(@CurrentUser() user: User) {
    return this.transactionService.findTransactions(user);
  }
}
