import { IsNumber, IsString, Min } from 'class-validator';

export class transferDto {
  @IsString()
  senderId: string;

  @IsString()
  receiverId: string;

  @IsNumber()
  @Min(0)
  amount: number;
}
