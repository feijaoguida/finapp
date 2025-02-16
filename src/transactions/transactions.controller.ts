import { transferDto } from './dto/transfer-dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { FindTransactionsService } from './findTransactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionsService: TransactionsService,
    private findTransactionsService: FindTransactionsService,
  ) {}

  @Get()
  findAll() {
    return this.findTransactionsService.findAll();
  }

  @Post()
  create(@Body() transfer: transferDto) {
    return this.transactionsService.transfer(transfer);
  }

  @Post('reverse/:id')
  reverse(@Param('id') id: string) {
    return this.transactionsService.reverseTransfer(id);
  }
}
