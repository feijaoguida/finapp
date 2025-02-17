import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { userToken } from './models/UserToken';
import { FindUserService } from 'src/user/findUser.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserService: FindUserService,
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
    const user = await this.findUserService.findByEmail(email);

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
