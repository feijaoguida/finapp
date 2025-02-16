import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CreateAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    const hasAccount = await this.prisma.account.findUnique({
      where: { name: createAccountDto.name },
    });

    if (hasAccount) {
      throw new Error('Account already exists');
    }

    const data: Prisma.AccountCreateInput = {
      name: createAccountDto.name,
      balance: createAccountDto.balance,
      user: {
        connect: {
          id: createAccountDto.user.id,
        },
      },
    };

    const createdAccount = await this.prisma.account.create({ data });

    return createdAccount;
  }
}
