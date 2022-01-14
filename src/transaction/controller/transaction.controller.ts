import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/model/user.entity';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('/transfer')
  transferMoney(@Body() body, @CurrentUser() user: User) {
    return this.transactionService.createTransaction(body, user);
  }
}
