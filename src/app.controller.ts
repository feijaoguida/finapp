import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get('ping')
  ping(): string {
    return this.appService.ping();
  }

  @ApiTags('Me')
  @ApiBearerAuth()
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
