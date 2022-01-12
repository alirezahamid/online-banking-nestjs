import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UsersController } from './controller/users.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AccountsService } from 'src/accounts/service/accounts.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Account } from 'src/accounts/model/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Account]), AccountsModule],
  providers: [
    UserService,
    AuthService,
    AccountsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
