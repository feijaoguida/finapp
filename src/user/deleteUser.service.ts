import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
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
