import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty({
    example: 'email@email.com',
    description: 'The email of the user',
    default: 'email@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Abc@1234',
    description:
      'The password of the user - must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and special character',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  name: string;
}
