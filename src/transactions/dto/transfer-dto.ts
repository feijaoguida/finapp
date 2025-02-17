import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class transferDto {
  @ApiProperty({
    example: '562050fc-f45c-4b20-82cc-a2953885e3b4',
    description: 'The id of the sender account',
  })
  @IsString()
  senderId: string;

  @ApiProperty({
    example: '562050fc-f45c-4b20-82cc-a2953885e3b4',
    description: 'The id of the receiver account',
  })
  @IsString()
  receiverId: string;

  @ApiProperty({
    example: 1000,
    description: 'The amount to transfer',
  })
  @IsNumber()
  @Min(0)
  amount: number;
}
