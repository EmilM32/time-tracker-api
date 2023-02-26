import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { comparePassword } from '../users/utils';
import { configService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);

    if (!user?.isActive) return null;

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (isPasswordCorrect) return user;

    return null;
  }

  async login(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    const token = this.jwtService.sign(payload, {
      secret: configService.getJwtSecret(),
      expiresIn: '1d',
    });

    return { token };
  }
}
