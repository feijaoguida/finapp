import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAccountService } from './createAccount.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { FindAccountService } from './findAccount.service';
import { RemoveAccountService } from './removeAccount.service';
import { UpdateAccountService } from './updateAccount.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly createAccountService: CreateAccountService,
    private readonly findAccountService: FindAccountService,
    private readonly removeAccountService: RemoveAccountService,
    private readonly updateAccountService: UpdateAccountService,
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.createAccountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.findAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findAccountService.findOne(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.findAccountService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.updateAccountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeAccountService.remove(id);
  }
}
