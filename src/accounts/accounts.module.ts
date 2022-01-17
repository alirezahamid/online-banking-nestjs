import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './controller/accounts.controller';
import { Account } from './model/account.entity';
import { AccountsService } from './service/accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
