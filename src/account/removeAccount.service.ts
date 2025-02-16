import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RemoveAccountService {
  constructor(private readonly prisma: PrismaService) {}
  async remove(id: string) {
    const hasAccount = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!hasAccount) {
      throw new Error('Account not found');
    }

    await this.prisma.account.delete({
      where: { id },
    });

    return 'Account removed';
  }
}
