import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateAccountDto {
  @ApiProperty({
    example: '562050fc-f45c-4b20-82cc-a2953885e3b4',
    description:
      'The id of the account - uuid (https://www.uuidgenerator.net/version4) ',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the account',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1000,
    description: 'The balance of the account',
  })
  @IsNumber()
  balance: number;

  @ApiProperty({
    example: {
      id: '562050fc-f45c-4b20-82cc-a2953885e3b4',
      name: 'John Doe',
      email: 'johndoe@email.com',
    },
    description: 'The user of the account',
  })
  @IsObject()
  user: User;
}
