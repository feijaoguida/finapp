import { Module } from '@nestjs/common';
import { RemoveAccountService } from './removeAccount.service';
import { AccountController } from './account.controller';
import { CreateAccountService } from './createAccount.service';
import { FindAccountService } from './findAccount.service';
import { UpdateAccountService } from './updateAccount.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AccountController],
  imports: [PrismaModule],
  providers: [
    CreateAccountService,
    FindAccountService,
    UpdateAccountService,
    RemoveAccountService,
  ],
  exports: [
    CreateAccountService,
    FindAccountService,
    UpdateAccountService,
    RemoveAccountService,
  ],
})
export class AccountModule {}
