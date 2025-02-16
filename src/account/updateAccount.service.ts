import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UpdateAccountService {
  constructor(private readonly prisma: PrismaService) {}
  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const { name, balance } = updateAccountDto;

    const hasAccount = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!hasAccount) {
      throw new Error('Account not found');
    }

    const data = {
      name,
      balance,
    };

    return this.prisma.account.update({
      where: { id },
      data,
    });
  }
}
