import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { jwtSecret } from './constants';
import { comparePassword } from '../users/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);

    if (!user) return null;

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (isPasswordCorrect) return user;

    return null;
  }

  async login(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload, { secret: jwtSecret });

    return { token };
  }

  async verify(token: string): Promise<User | null> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = this.usersService.findOne(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user from decoded token.');
    }

    return user;
  }
}
