import { transferDto } from './dto/transfer-dto';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaClient, Transaction, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

export interface UpdateAccountTypes {
  context: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >;
  where: { id: string };
  data: {
    balance: { decrement: number } | { increment: number };
  };
}

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async transfer(transfer: transferDto): Promise<Transaction> {
    const { senderId, receiverId, amount } = transfer;

    if (senderId === receiverId) {
      throw new BadRequestException('You cannot transfer to yourself.');
    }

    return this.prisma.$transaction(async (tx) => {
      const sender = await tx.account.findUnique({ where: { id: senderId } });
      const receiver = await tx.account.findUnique({
        where: { id: receiverId },
      });

      if (!sender || !receiver) {
        throw new NotFoundException('Account not found.');
      }

      if (sender.balance < amount) {
        throw new BadRequestException('Insufficient balance.');
      }

      await this.updateAccount(
        tx,
        { id: senderId },
        { balance: { decrement: amount } },
      );
      await this.updateAccount(
        tx,
        { id: receiverId },
        { balance: { increment: amount } },
      );

      // Cria a transação
      const transaction = await tx.transaction.create({
        data: {
          amount,
          senderId,
          receiverId,
          status: 'COMPLETED',
        },
      });

      return transaction;
    });
  }

  async reverseTransfer(transactionId: string): Promise<Transaction> {
    console.log('transactionId', transactionId);
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found.');
      }

      if (transaction.status !== 'COMPLETED') {
        throw new BadRequestException(
          'Only completed transactions can be reversed.',
        );
      }

      await this.updateAccount(
        tx,
        { id: transaction.senderId },
        { balance: { increment: transaction.amount } },
      );
      await this.updateAccount(
        tx,
        { id: transaction.receiverId },
        { balance: { decrement: transaction.amount } },
      );

      // Atualiza a transação para "REVERSED"
      const reversedTransaction = await tx.transaction.update({
        where: { id: transactionId },
        data: { status: 'REVERSED' },
      });

      return reversedTransaction;
    });
  }

  async updateAccount(
    context: UpdateAccountTypes['context'],
    where: UpdateAccountTypes['where'],
    data: UpdateAccountTypes['data'],
  ) {
    await context.account.update({
      where,
      data,
    });
  }
}
