import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindTransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }
}
