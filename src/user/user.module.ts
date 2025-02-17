import { Module } from '@nestjs/common';
import { CreateUserService } from './createUser.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FindUserService } from './findUser.service';
import { DeleteUserService } from './deleteUser.service';

@Module({
  controllers: [UserController],
  providers: [CreateUserService, FindUserService, DeleteUserService],
  imports: [PrismaModule],
  exports: [CreateUserService, FindUserService, DeleteUserService],
})
export class UserModule {}
