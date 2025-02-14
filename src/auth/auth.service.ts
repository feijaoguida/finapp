import { CreateUserService } from '../user/createUser.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { userToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: User): userToken {
    const payload: UserPayload = {
      sub: user.id as number,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.createUserService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Invalid email or password');
  }
}
