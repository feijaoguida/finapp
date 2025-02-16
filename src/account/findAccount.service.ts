import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindAccountService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const accounts = await this.prisma.account.findMany();
    return accounts;
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: id,
      },
    });
    return account;
  }

  async findByName(name: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        name: name,
      },
    });
    return account;
  }
}
