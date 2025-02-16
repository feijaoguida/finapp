import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FindTransactionsService } from './findTransactions.service';

@Module({
  providers: [TransactionsService, PrismaModule, FindTransactionsService],
  imports: [PrismaModule],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
