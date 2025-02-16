import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateAccountDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsNumber()
  balance: number;

  @IsObject()
  user: User;

  // id String @id @default(cuid())

  // name String @unique()

  // balance Float  @default(0.0)

  // createdAt DateTime @default(now())
}
