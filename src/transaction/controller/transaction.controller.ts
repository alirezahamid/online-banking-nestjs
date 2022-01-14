import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/model/user.entity';
import { TransactionService } from '../service/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('/transfer')
  transferMoney(@Body() body, @CurrentUser() user: User) {
    // user : {
    //   "id": 2,
    //   "email": "alireza4@hamid.com",
    //   "fullName": "Alireza Hamid",
    //   "address": "24 Effingham, Kingston Upon Thames, KT2 7RU",
    //   "phoneNumber": "07765548000",
    // }
    return this.transactionService.createTransaction(body, user);
  }
}
