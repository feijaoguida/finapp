import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindUserService } from './findUser.service';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findUserService: FindUserService,
  ) {}

  async delete(id: number) {
    const hasUser = await this.findUserService.findById(id);

    if (!hasUser) {
      throw new Error('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
  }
}
