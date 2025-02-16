import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FindUserService } from './findUser.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly findUserService: FindUserService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hasUser = await this.findUserService.findByEmail(createUserDto.email);

    if (hasUser) {
      throw new Error('User already exists');
    }

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }
}
