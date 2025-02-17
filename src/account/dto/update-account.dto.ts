import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the account',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    example: 1000,
    description: 'The balance of the account',
  })
  @IsNumber()
  balance?: number;
}
