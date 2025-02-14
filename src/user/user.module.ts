import { Module } from '@nestjs/common';
import { CreateUserService } from './createUser.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FindUserService } from './findUser.service';

@Module({
  controllers: [UserController],
  providers: [CreateUserService, FindUserService],
  imports: [PrismaModule],
  exports: [CreateUserService, FindUserService],
})
export class UserModule {}
